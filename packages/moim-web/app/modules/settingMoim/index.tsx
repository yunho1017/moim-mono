import * as React from "react";
import { Switch, Route, useLocation, matchPath } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";
// helpers
import { MoimURL } from "common/helpers/url";
import settingMenuGenerator from "./components/settingMenu/data";
// hooks
import { useStoreState } from "app/store";
import useSuperPermission from "common/hooks/useSuperPermission";
import BannerContext, { useBannerContext } from "./context";
// components
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import ListAndDetailLayout from "common/layouts/listAndDetail";
import FreezeView from "common/components/freezeView";
import SettingAppBar, {
  HeaderStyle,
  WrapperStyle,
} from "app/modules/settingMoim/components/settingAppBar";
import SettingMenu from "./components/settingMenu";
import SettingMoimBanner from "./container/settingMoimBanner";
import SettingMenuContainer from "./container/settingMenu";
import OverviewContainer from "./container/overview";
import PositionContainer from "./container/position";
import PositionEditContainer from "./container/positionEdit";
import PositionShowContainer from "./container/positionShow";
import CreateSubMoimContainer from "./container/createSubMoim";
import {
  SettingMenuWrapper,
  LEFT_WIDTH,
  RightWrapper,
  Container,
  ContentsWrapper,
} from "./styled";

import { VAKE_GROUP_ID, TEST_GROUP_ID } from "./constants";
import { currentGroupSelector } from "app/selectors/app";
import MoimAnalyticsContainer from "./container/analytics";

const MAIN_PANEL_URLS = [
  MoimURL.SettingMoimOverview.pattern,
  MoimURL.SettingMoimCategoryAndChannel.pattern,
  MoimURL.SettingMoimPositionEdit.pattern,
  MoimURL.SettingMoimPositionShow.pattern,
  MoimURL.SettingCreateSubMoim.pattern,
  MoimURL.SettingMoimPosition.pattern,
  MoimURL.SettingMoimAnalytics.pattern,
];

export default function Setting() {
  const intl = useIntl();
  const location = useLocation();

  const {
    currentMoimName,
    currentMoimBanner,
    canCreateSubMoim,
  } = useStoreState(storeState => ({
    currentMoimName: currentGroupSelector(storeState)?.name,
    currentMoimBanner: currentGroupSelector(storeState)?.banner,
    canCreateSubMoim:
      storeState.app.currentGroupId === VAKE_GROUP_ID ||
      storeState.app.currentGroupId === TEST_GROUP_ID,
  }));

  const { hasPermission: hasSuperPermission } = useSuperPermission();
  const menus = React.useMemo(
    () => settingMenuGenerator(intl, hasSuperPermission, canCreateSubMoim),
    [intl, hasSuperPermission, canCreateSubMoim],
  );

  const bannerContextValue = useBannerContext(
    currentMoimName,
    currentMoimBanner,
  );
  const isOpenBanner = React.useMemo(
    () =>
      Boolean(
        matchPath(location.pathname, {
          path: MoimURL.SettingMoimOverview.pattern,
        }),
      ),
    [location.pathname],
  );

  const listElement = React.useMemo(
    () => (
      <SettingMenuWrapper isOpenBanner={isOpenBanner}>
        <SettingMenu menus={menus} />
      </SettingMenuWrapper>
    ),
    [isOpenBanner, menus],
  );
  const detailElement = React.useMemo(
    () => (
      <FreezeView isFreeze={false}>
        <RightWrapper>
          <Switch>
            <Route
              exact={true}
              path={MoimURL.SettingMoim.pattern}
              component={SettingMenuContainer}
            />
            {hasSuperPermission && (
              <>
                <Route
                  path={MoimURL.SettingMoimOverview.pattern}
                  component={OverviewContainer}
                />

                <Route
                  path={MoimURL.SettingMoimPositionEdit.pattern}
                  component={PositionEditContainer}
                />

                <Route
                  path={MoimURL.SettingMoimPositionShow.pattern}
                  component={PositionShowContainer}
                />

                <Route
                  path={MoimURL.SettingCreateSubMoim.pattern}
                  component={CreateSubMoimContainer}
                />

                <Route
                  path={MoimURL.SettingMoimPosition.pattern}
                  component={PositionContainer}
                  exact={true}
                />
                <Route
                  path={MoimURL.SettingMoimAnalytics.pattern}
                  component={MoimAnalyticsContainer}
                  exact={true}
                />
              </>
            )}
          </Switch>
        </RightWrapper>
      </FreezeView>
    ),
    [hasSuperPermission],
  );

  return (
    <BannerContext.Provider value={bannerContextValue}>
      <CustomAppBarModalLayout
        appBar={
          <SettingAppBar
            basePathPattern={MoimURL.SettingMoim.pattern}
            title={<FormattedMessage id="moim_settings/menu_moim_settings" />}
          />
        }
        withoutBorderMargin={true}
        wrapperStyle={WrapperStyle}
        headerStyle={HeaderStyle}
      >
        <Container>
          <SettingMoimBanner isOpenBanner={isOpenBanner} />
          <ContentsWrapper>
            <ListAndDetailLayout
              mainPanelUrls={MAIN_PANEL_URLS}
              disableListWrapperRightBorder={true}
              listWrapperWidth={LEFT_WIDTH}
              listElement={listElement}
              detailElement={detailElement}
            />
          </ContentsWrapper>
        </Container>
      </CustomAppBarModalLayout>
    </BannerContext.Provider>
  );
}
