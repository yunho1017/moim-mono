import * as React from "react";
import { Switch, Route } from "react-router";
import { FormattedMessage } from "react-intl";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import { useProps } from "./hooks";
// components
import FreezeView from "common/components/freezeView";
import ListAndDetailLayout from "common/layouts/listAndDetail";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import SettingAppBar, {
  HeaderStyle,
  WrapperStyle,
} from "app/modules/settingMoim/components/settingAppBar";
import ServiceNotificationContainer from "./containers/notification/service";
import MarketingNotificationContainer from "./containers/notification/marketing";
import ProfileContainer from "./containers/profile";
import Menus from "./containers/menus";
import MoimLeaveContainer from "./containers/moimLeave";
import PrivacyContainer from "./containers/privacy";
import AutoRedirect from "./containers/autoRedirect";
import {
  SettingMenuWrapperStyle,
  Container,
  LEFT_WIDTH,
  ContentsWrapper,
  Main,
} from "./styled";

const MAIN_PANEL_URLS = [
  MoimURL.PersonalSettingProfile.pattern,
  MoimURL.PersonalSettingNotificationMoim.pattern,
  MoimURL.PersonalSettingNotificationService.pattern,
  MoimURL.PersonalSettingNotificationMarketing.pattern,
  MoimURL.PersonalSettingMoimLeave.pattern,
  MoimURL.PersonalSettingPrivacy.pattern,
];

export default function PersonalSetting(props: any) {
  const { menus } = useProps(props);

  const listElement = React.useMemo(
    () =>
      Boolean(menus.length) ? (
        <Menus wrapperStyle={SettingMenuWrapperStyle} menus={menus} />
      ) : (
        undefined
      ),
    [menus],
  );
  const detailElement = React.useMemo(
    () => (
      <FreezeView isFreeze={false}>
        <Main>
          <Switch>
            <Route
              exact={true}
              path={MoimURL.PersonalSettingMoim.pattern}
              component={AutoRedirect}
            />
            <Route
              path={MoimURL.PersonalSettingProfile.pattern}
              component={ProfileContainer}
            />
            <Route
              path={MoimURL.PersonalSettingNotificationService.pattern}
              component={ServiceNotificationContainer}
            />
            <Route
              path={MoimURL.PersonalSettingNotificationMarketing.pattern}
              component={MarketingNotificationContainer}
            />
            <Route
              path={MoimURL.PersonalSettingMoimLeave.pattern}
              component={MoimLeaveContainer}
            />
            <Route
              path={MoimURL.PersonalSettingPrivacy.pattern}
              component={PrivacyContainer}
            />
          </Switch>
        </Main>
      </FreezeView>
    ),
    [],
  );
  return (
    <CustomAppBarModalLayout
      appBar={
        <SettingAppBar
          basePathPattern={MoimURL.PersonalSettingMoim.pattern}
          title={<FormattedMessage id="moim_settings/menu_personal_settings" />}
        />
      }
      withoutBorderMargin={true}
      wrapperStyle={WrapperStyle}
      headerStyle={HeaderStyle}
    >
      <Container>
        <ContentsWrapper>
          <ListAndDetailLayout
            mainPanelUrls={MAIN_PANEL_URLS}
            disableListWrapperRightBorder={true}
            listWrapperWidth={LEFT_WIDTH}
            listElement={listElement}
            detailElement={detailElement}
            disableDetailWrapperBorder={true}
          />
        </ContentsWrapper>
      </Container>
    </CustomAppBarModalLayout>
  );
}
