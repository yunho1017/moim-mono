import * as React from "react";
import { rgba } from "polished";
import {
  createBrowserHistory,
  createMemoryHistory,
  History,
  MemoryHistory,
} from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as ReactDOM from "react-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import WebFont from "webfontloader";
import { createTheme } from "@material-ui/core/styles";
// components
import {
  NativeSecondaryViewHistory,
  PluginSecondaryViewHistory,
} from "../modules/SecondaryHistory";
import GlobalStyle from "common/globalStyle";
// actions
import * as EnvChecker from "common/helpers/envChecker";
import IntlWrapper from "../intl/intlWrapper";
import RootComponent from "../routes/root";
import makeTheme from "../theme";
import { IAppStore } from "../store";
import { bootData, bootStore } from "../boot";
import { DefaultLoader } from "common/components/loading";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { checkServerMaintenance } from "../actions/feedback";
// providers
import MoimThemeProvider from "../theme/MoimThemeProvider";
import AlertProvider from "common/components/alertTemplates/provider";
import TopBannerContextProvider from "common/components/topBanner/context";
import ModalShowContextProvider from "common/layouts/context";
import { IsMobileProvider } from "./providers/isMobileProvider";
import NextActionProvider from "common/helpers/nextActionProvider";
// helpers
import SessionHandler from "common/helpers/sessionHandler";
import { browserLocale } from "../intl";
// constants
import { currentGroupSelector } from "../selectors/app";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

import ScrollRestoreProvider from "common/helpers/scrollRestoreProvider";
import {
  generateDefaultElementThemeColorSet,
  generateDefaultPalette,
} from "../theme/constants/palette";
import { MoimURL } from "common/helpers/url";
import CommerceCheckoutComplete from "../modules/commerce/complete";
import { ThemeMode } from "app/enums";

function isCheckoutComplete() {
  return MoimURL.CommerceCheckoutComplete.isSame(location.pathname);
}

export default class ClientRenderer {
  private readonly history: History = createBrowserHistory();
  private readonly nativeSecondaryHistory: MemoryHistory = createMemoryHistory();
  private readonly pluginSecondaryHistory: MemoryHistory = createMemoryHistory();
  private appStore!: IAppStore;
  private groupId: string | null = null; // NOTE: ziggleziggle : 기능 개발후 groupId 제거 필요

  public constructor() {
    this.asyncLoadFontCss();
  }

  public async render() {
    try {
      this.renderLoading();

      this.appStore = await bootStore(this.history);
      this.groupId = this.appStore.getState().app.currentGroupId;

      bootData(this.appStore);
      this.appStore.dispatch(checkServerMaintenance());

      this.initializeAnalytics();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[!] FAILED CLIENT RENDER INITIALIZE", err);
      if (!(err as any).response || (err as any).response.status !== 403) {
        // eslint-disable-next-line no-console
        console.error("Failed signing in: ", err);
      }
    } finally {
      if (isCheckoutComplete()) {
        ReactDOM.render(<CommerceCheckoutComplete />, this.getAppElement());
      } else {
        const muiTheme = createTheme();
        const appJSX = (
          <React.Fragment>
            <GlobalStyle groupId={this.groupId} />
            <Provider store={this.appStore}>
              <ConnectedRouter history={this.history}>
                <IsMobileProvider>
                  <IntlWrapper>
                    <ScrollRestoreProvider>
                      <NativeSecondaryViewHistory
                        history={this.nativeSecondaryHistory}
                      >
                        <PluginSecondaryViewHistory
                          history={this.pluginSecondaryHistory}
                        >
                          <MoimThemeProvider>
                            <MuiThemeProvider theme={muiTheme}>
                              <AlertProvider>
                                <ModalShowContextProvider>
                                  <TopBannerContextProvider>
                                    <NextActionProvider>
                                      <RootComponent />
                                    </NextActionProvider>
                                  </TopBannerContextProvider>
                                </ModalShowContextProvider>
                              </AlertProvider>
                            </MuiThemeProvider>
                          </MoimThemeProvider>
                        </PluginSecondaryViewHistory>
                      </NativeSecondaryViewHistory>
                    </ScrollRestoreProvider>
                  </IntlWrapper>
                </IsMobileProvider>
              </ConnectedRouter>
            </Provider>
          </React.Fragment>
        );
        // if (EnvChecker.isServerSideRender()) {
        //   await loadableReady(() => {
        //     ReactDOM.hydrate(appJSX, this.getAppElement(), this.renderAfter);
        //   });
        // } else {
        ReactDOM.render(appJSX, this.getAppElement(), this.renderAfter);
        // }
      }
    }
  }

  private readonly renderLoading = () => {
    ReactDOM.render(
      <StyledThemeProvider
        key="initial-loading-theme-provider"
        theme={makeTheme({
          locale: browserLocale(),

          palette: generateDefaultPalette(),
          darkPalette: generateDefaultPalette(ThemeMode.DARK),
          themeMode:
            window.__bootData?.data?.group?.config?.theme ?? ThemeMode.LIGHT,
          elementThemePalette: generateDefaultElementThemeColorSet(),
        })}
      >
        <GlobalStyle groupId={this.groupId} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
          }}
        >
          {/* GREY650 */}
          <DefaultLoader size="s" color={rgba(174, 184, 189, 0.5)} />
        </div>
      </StyledThemeProvider>,
      this.getAppElement(),
    );
  };

  private readonly getAppElement = () => document.getElementById("vingle-app");

  private readonly renderAfter = () => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.remove();
    }

    const initialMessage = SessionHandler.get("INITIAL_TOAST_MESSAGE");

    if (initialMessage) {
      this.appStore.dispatch(
        SnackbarActionCreators.openSnackbar({
          text: initialMessage,
        }),
      );
    }

    SessionHandler.remove("INITIAL_TOAST_MESSAGE");
  };

  private readonly asyncLoadFontCss = () => {
    const WebConfig = {
      custom: {
        families: ["Noto Sans KR"],
        timeout: 3000,
        urls: ["https://s0.vingle.net/assets/NotoSansKr/vingleNoto.css"],
      },
    };
    WebFont.load(WebConfig);
  };

  private readonly initializeAnalytics = () => {
    const currentGroup = currentGroupSelector(this.appStore.getState());

    if (currentGroup && currentGroup.analytics) {
      const analyticsIds = currentGroup.analytics;
      const currentUserId = this.appStore.getState().app.currentUserId;
      const analytics = AnalyticsClass.getInstance();
      analytics.init(
        analyticsIds,
        { id: currentGroup.id, name: currentGroup.name },
        currentUserId ?? undefined,
      );
    }
  };
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      try {
        const assetPath =
          EnvChecker.isProd() || EnvChecker.isStage()
            ? `./app/${process.env.DEPLOY_VERSION}`
            : "";
        navigator.serviceWorker.register(`${assetPath}/serviceWorker.js`);
      } catch (err) {
        console.error("!!!! failed to register SW", err);
      }
    });
  }
}

(() => {
  if (EnvChecker.isBrowser() && !EnvChecker.isTest()) {
    // Rendering part
    const renderer = new ClientRenderer();
    renderer.render();
    registerServiceWorker();
  }
})();
