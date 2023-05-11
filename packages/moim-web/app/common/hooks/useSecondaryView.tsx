import * as React from "react";
import { LocationDescriptorObject } from "history";
import {
  ActionCreators,
  ActionCreators as SecondaryViewActionCreators,
} from "app/actions/secondaryView";
import { doBlockAction } from "app/actions/referenceBlock";
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { TopBannerContext } from "common/components/topBanner/context";
import {
  removeStoreRedirectBlocks,
  setStoreRedirectBlocks,
  getStoreRedirectBlocks,
} from "app/actions/referenceBlock/cookieHelper";
import { extractUserInputAndMergeToBlocks } from "app/actions/referenceBlock/index";
import {
  setSecondaryPanelLastSeen,
  getSecondaryPanelLastSeen,
  removeSecondaryPanelLastSeen,
} from "app/common/helpers/secondaryPanelCookieHandler";
import {
  NativeMemoryHistoryContext,
  PluginMemoryHistoryContext,
} from "app/modules/SecondaryHistory";
import useRedirect from "./useRedirect";

function useBootSecondaryView() {
  const { redirect: nativeRedirect, location } = useNativeSecondaryView();
  const { pathname, type } = getSecondaryPanelLastSeen();
  const { restorePlugin } = useActions({
    restorePlugin: SecondaryViewActionCreators.restorePluginStore,
  });

  const { secondaryViewPage } = getStoreRedirectBlocks();

  React.useLayoutEffect(() => {
    setTimeout(() => {
      if (pathname && pathname !== "/" && location?.pathname === "/") {
        if (type === "plugin") {
          restorePlugin(secondaryViewPage);
          removeStoreRedirectBlocks();
        } else {
          nativeRedirect(pathname);
        }
        removeSecondaryPanelLastSeen();
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const SecondaryViewBoot = () => {
  useBootSecondaryView();
  return null;
};

export function useStoreSecondaryView() {
  const nativeSecondaryView = useNativeSecondaryView();
  const pluginSecondaryView = usePluginSecondaryView();
  const { nativeOpenStatus, pluginOpenStatus } = useSecondaryViewOpenState();
  const { secondaryViewPage } = useStoreState(state => ({
    secondaryViewPage: state.secondaryViewPage,
  }));

  const storeBlockitPanelContent = React.useCallback(() => {
    setStoreRedirectBlocks({
      secondaryViewPage: {
        ...secondaryViewPage,
        pluginHistory: {
          ...secondaryViewPage.pluginHistory,
          [secondaryViewPage.pluginCurrentLocationHash]: {
            ...secondaryViewPage.pluginHistory[
              secondaryViewPage.pluginCurrentLocationHash
            ],
            blocks: extractUserInputAndMergeToBlocks(
              secondaryViewPage.pluginContentRef,
              secondaryViewPage.pluginHistory[
                secondaryViewPage.pluginCurrentLocationHash
              ].blocks,
            ),
          },
        },
      },
    });
  }, [secondaryViewPage]);

  return React.useCallback(() => {
    const nativePathname = nativeSecondaryView.location?.pathname ?? "/";
    const pluginPathname = pluginSecondaryView.location?.pathname ?? "/";
    if (nativeOpenStatus && nativePathname !== "/") {
      setSecondaryPanelLastSeen(nativePathname, "native");
    }
    if (pluginOpenStatus && pluginPathname !== "/") {
      storeBlockitPanelContent();
      setSecondaryPanelLastSeen(pluginPathname, "plugin");
    }
  }, [
    nativeOpenStatus,
    nativeSecondaryView.location,
    pluginOpenStatus,
    pluginSecondaryView.location,
    storeBlockitPanelContent,
  ]);
}

export function useSecondaryViewOpenState() {
  const {
    nativeOpenStatus,
    pluginOpenStatus,
    nativeOpenFromProfile,
  } = useStoreState(state => ({
    nativeOpenStatus: state.secondaryViewPage.nativeOpenStatus,
    pluginOpenStatus: state.secondaryViewPage.pluginOpenStatus,
    nativeOpenFromProfile: state.secondaryViewPage.nativeOpenFromProfile,
  }));

  return {
    nativeOpenStatus,
    pluginOpenStatus,
    nativeOpenFromProfile,
  };
}

export function useCloseNativeSecondaryView() {
  const isMobile = useIsMobile();
  const [, setTopBannerContext] = React.useContext(TopBannerContext);
  const history = React.useContext(NativeMemoryHistoryContext);
  const { close } = useActions({
    close: ActionCreators.closeNativeSecondaryView,
  });

  return React.useCallback(() => {
    if (isMobile) {
      setTopBannerContext(state => ({
        ...state,
        forceHidden: false,
      }));
    }
    if (history) {
      history.entries.length = 0;
    }
    history?.push({
      pathname: "/",
    });
    if (history) {
      history.length = 1;
      history.index = 0;
    }
    close();
  }, [history, close, isMobile, setTopBannerContext]);
}
export function useNativeSecondaryView() {
  const pluginOpenStatus = useStoreState(
    state => state.secondaryViewPage.pluginOpenStatus,
  );
  const isMobile = useIsMobile();
  const [, setTopBannerContext] = React.useContext(TopBannerContext);
  const { close: closePluginPanel } = usePluginSecondaryView();
  const { open } = useActions({
    open: ActionCreators.openNativeSecondaryView,
  });
  const history = React.useContext(NativeMemoryHistoryContext);
  const location = history?.location;
  // Note: 추후에 object를 넘겨야될 때 moim url 함수 추가
  const redirect = React.useCallback(
    <S extends {}>(
      locationDescriptor: LocationDescriptorObject<S> | string,
    ) => {
      if (typeof locationDescriptor === "string") {
        history?.push(locationDescriptor);
      } else {
        history?.push(locationDescriptor);
      }
      open();
      if (pluginOpenStatus) {
        closePluginPanel();
      }
      if (isMobile) {
        setTopBannerContext(state => ({
          ...state,
          forceHidden: true,
        }));
      }
    },
    [
      closePluginPanel,
      history,
      isMobile,
      open,
      pluginOpenStatus,
      setTopBannerContext,
    ],
  );

  const goBack = React.useCallback(() => {
    history?.goBack();
  }, [history]);

  const closeHandler = useCloseNativeSecondaryView();

  return {
    history,
    location,
    redirect,
    close: closeHandler,
    goBack,
  };
}

export function usePluginSecondaryView() {
  const { onCloseBehavior, botId } = useStoreState(state => ({
    onCloseBehavior:
      state.secondaryViewPage.pluginHistory[
        state.secondaryViewPage.pluginCurrentLocationHash
      ]?.onClose,
    botId: state.secondaryViewPage.botId,
  }));
  const isMobile = useIsMobile();
  const [, setTopBannerContext] = React.useContext(TopBannerContext);
  const { close, back, doBlock } = useActions({
    close: ActionCreators.closePluginSecondaryView,
    back: ActionCreators.backPluginSecondaryView,
    doBlock: doBlockAction,
  });
  const history = React.useContext(PluginMemoryHistoryContext);
  const location = history?.location;
  const redirect = React.useCallback(
    <S extends {}>(locationDescriptor: LocationDescriptorObject<S>) => {
      history?.push(locationDescriptor);

      if (isMobile) {
        setTopBannerContext(state => ({
          ...state,
          forceHidden: true,
        }));
      }
    },
    [history, isMobile, setTopBannerContext],
  );

  const actionClose = React.useCallback(() => {
    if (onCloseBehavior && botId) {
      doBlock({
        botId,
        data: {
          ...onCloseBehavior,
        },
      });
    }
  }, [botId, doBlock, onCloseBehavior]);

  const goBack = React.useCallback(() => {
    history?.goBack();
    back();
  }, [history, back]);

  const closeHandler = React.useCallback(() => {
    history?.push({
      pathname: "/",
    });
    actionClose();
    close();

    if (isMobile) {
      setTopBannerContext(state => ({
        ...state,
        forceHidden: false,
      }));
    }
  }, [history, actionClose, close, isMobile, setTopBannerContext]);

  return {
    history,
    location,
    redirect,
    close: closeHandler,
    goBack,
  };
}

export function useRedirectToMoimURL() {
  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const close = useCloseNativeSecondaryView();

  return React.useCallback(
    (url: string) => {
      if (isMobile) {
        close();
      }
      redirect(url);
    },
    [close, redirect],
  );
}
