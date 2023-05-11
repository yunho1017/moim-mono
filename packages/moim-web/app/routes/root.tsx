/* eslint-disable no-underscore-dangle */
import * as React from "react";
import * as Sentry from "@sentry/browser";
import { bindActionCreators } from "redux";
import { replace } from "connected-react-router";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { injectIntl, WrappedComponentProps } from "react-intl";
import MSwitch from "@material-ui/core/Switch";
import retry from "async-retry";
import { History } from "history";

// interfaces
import { IAppState } from "../rootReducer";
import { AppDispatch } from "app/store";
// components
import ImageBrochure from "common/components/imageBrochure";
import Setting from "app/modules/settingMoim";
import PersonalSetting from "app/modules/personalSetting";
import CoverPage from "app/modules/cover";
import IsMobileViewport, {
  IRefHandler as IIsMobileRefHandler,
} from "common/components/isMobileViewport";
import NavigationModal from "common/components/navigationModal";
import VotedUserListDialog from "app/modules/forum/containers/votedUserListDialog";
import JoinGroupDialog from "common/components/joinGroupDialog";
import RootHelmet from "./rootHelmet";
import NewDirectMessageDialog from "app/modules/newDirectMessageDialog";
import NotificationsDialog from "app/modules/notifications/dialog";
import PositionApplyDialog from "common/components/positionApplyDialog/dialog";
import DraftListModal from "common/components/draftList";
import SNSShareDialog from "common/components/snsShareDialog/dialog";
import ChannelNotificationSettingDialog from "common/components/channelNotificationSettingDialog/dialog";
import CreateMeetingDialog from "common/components/createMeetingDialog";
import MyReferralDialog from "common/components/myReferralDialog/dialog";
import MyReferralPerformanceDialog from "common/components/myReferralPerformanceDialog/dialog";
import UserProfileMask from "common/components/userProfileImage/mask";
import MoimGlobalBanner from "common/components/topBanner/presets/moimGlobalBanner";
import ProfileDialog from "app/modules/profileDialog";
import ExecutionCreateDialog from "app/modules/campaign/containers/executionCreate";
import ExecutionShowDialog from "app/modules/campaign/containers/executionShow";
import ExecutionVoteDialog from "app/modules/campaign/containers/executionVote";
import ExecutionVoteListDialog from "app/modules/campaign/containers/voteList";
import RemitResultDialog from "app/modules/campaign/containers/remitResult";
import {
  GlobalPostReportDialog,
  GlobalUserReportDialog,
} from "common/components/reportDialog";
import PositionFormDialog from "app/modules/settingMoim/container/positionForm/dialog";
import ProfileEditorDialog from "app/modules/profileEditor/container";
import CheckoutRedirectDialog from "app/modules/commerce/components/checkoutRedirectDialog";
import MintRedirectLoadingDialog from "app/modules/nft/components/mintRedirectLoadingDialog";
import BlockitModal from "common/components/blockitModal";
import PageLoadingIndicator from "common/components/pageLoadingIndicator";
import DQuestCompleteDialog from "app/modules/dquest/containers/completeDialog";
import GlobalDialogControlCenter from "./globalDialogs";
import ProductOptionInventoryDialog from "common/components/productItemCell/components/optionInventoryDialog";
import DQuestMissionaryNextActionAlert from "common/components/dquestMissionary/components/nextActionAlert";
// helpers
import { SecondaryViewBoot } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import renderRoutes from "./helpers";
import { IRouteConfig, commonRoutes, hubRoutes, moimRoutes } from "./client";
import { isDev, isStage, isHubDomain } from "common/helpers/envChecker";
import {
  isModalSelector,
  getPreviousLocationSelector,
  currentUserSelector,
} from "app/selectors/app";
import { browserLocale } from "app/intl";
import { checkAndLogException } from "common/helpers/errorLogger";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import { refreshAccessToken } from "common/helpers/authentication/handlers/moim/helpers";
import { setOAuthTokenForGroup } from "common/helpers/cryptoBadgeHandlerWithInMemory";
// actions
import {
  ActionCreators as AppActionCreators,
  initializeHistory,
} from "app/actions/app";
import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { reconnectGRPC } from "app/actions/gRPC";
import { getPermission } from "app/actions/permission";
import { UserStatusTypes } from "app/enums";
import {
  getMoimTokenToCookie,
  storeMoimTokenToCookie,
} from "common/helpers/authentication";

interface IProps
  extends RouteComponentProps,
    WrappedComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

interface IState {
  routes: IRouteConfig[];
  joinGroupDialogOpenOnce: boolean;
}

function mapStateToProps(state: IAppState) {
  return {
    locale: state.app.locale,
    currentLocationKey: state.app.history.currentLocationKey,
    isModal: isModalSelector(state),
    prevLocation: getPreviousLocationSelector(state),
    currentUser: currentUserSelector(state),
    joinGroupDialogOpen: state.joinGroupDialog.open,
    hubGroupId: selectHubMoimId(state),
    currentGroupId: state.app.currentGroupId,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      replace,
      changeLocale: AppActionCreators.changeLocale,
      dispatchInitializeHistory: initializeHistory,
      dispatchReconnectGRPC: reconnectGRPC,
      dispatchGetPermission: getPermission,
      dispatchOpenJoinGroupDialog: GroupActionCreators.openJoinGroupDialog,
    },
    dispatch,
  );
}

class RootComponent extends React.Component<IProps, IState> {
  public state: IState = {
    routes: isHubDomain()
      ? [...hubRoutes, ...commonRoutes]
      : [...moimRoutes, ...commonRoutes],
    joinGroupDialogOpenOnce: false,
  };
  private readonly isMobileRef = React.createRef<IIsMobileRefHandler>();

  public async componentDidMount() {
    const { history, dispatchInitializeHistory } = this.props;
    dispatchInitializeHistory(history as History<any>);

    this.openJoinGroupDialog();
  }

  public shouldComponentUpdate(nextProps: IProps) {
    return (
      nextProps.currentLocationKey !== this.props.currentLocationKey ||
      nextProps.locale !== this.props.locale ||
      this.props.currentUser?.id !== nextProps.currentUser?.id ||
      this.props.currentUser?.status !== nextProps.currentUser?.status
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    const {
      currentUser,
      dispatchReconnectGRPC,
      dispatchGetPermission,
    } = this.props;
    if (currentUser?.id !== prevProps.currentUser?.id) {
      dispatchReconnectGRPC();
      dispatchGetPermission({});
    }

    if (
      prevProps.currentUser?.status === UserStatusTypes.PENDING &&
      currentUser?.status === UserStatusTypes.ACTIVE
    ) {
      this.refreshToken();
    }

    this.openJoinGroupDialog();
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.showReportDialog({
      eventId: checkAndLogException(error, errorInfo),
      lang: this.props.intl.locale,
    });
  }

  public render() {
    const { location, isModal, prevLocation } = this.props;
    const { routes } = this.state;
    const isMobile = this.getIsMobile();

    return (
      <>
        <RootHelmet />
        {renderRoutes(routes, {
          location: !isMobile && isModal ? prevLocation : location,
        })}

        {!isMobile && isModal ? (
          <NavigationModal>
            <Switch location={location}>
              <Route path={MoimURL.SettingMoim.pattern} component={Setting} />
              <Route
                path={MoimURL.PersonalSettingMoim.pattern}
                component={PersonalSetting}
              />
              <Route path={MoimURL.CoverPage.pattern} component={CoverPage} />
            </Switch>
          </NavigationModal>
        ) : null}
        <ImageBrochure />
        <VotedUserListDialog />
        <JoinGroupDialog />
        <NewDirectMessageDialog />
        <NotificationsDialog />
        <PositionApplyDialog />
        <DraftListModal />
        <SNSShareDialog />
        <ChannelNotificationSettingDialog />
        <CreateMeetingDialog />
        <MyReferralDialog />
        <MyReferralPerformanceDialog />
        <UserProfileMask />
        <MoimGlobalBanner />
        <ExecutionCreateDialog />
        <ExecutionShowDialog />
        <ExecutionVoteDialog />
        <ExecutionVoteListDialog />
        <RemitResultDialog />
        <GlobalPostReportDialog />
        <GlobalUserReportDialog />
        <IsMobileViewport ref={this.isMobileRef} />
        <SecondaryViewBoot />
        <ProfileDialog />
        <PositionFormDialog />
        <ProfileEditorDialog />
        <BlockitModal />
        <PageLoadingIndicator />
        <CheckoutRedirectDialog />
        <MintRedirectLoadingDialog />
        <DQuestCompleteDialog />
        <GlobalDialogControlCenter />
        <ProductOptionInventoryDialog />
        <DQuestMissionaryNextActionAlert />
        {this.renderIntlSwitch()}
      </>
    );
  }

  private readonly renderIntlSwitch = () => {
    const { locale } = this.props;
    if (isDev() || isStage()) {
      const currentLocale = browserLocale(locale || "");
      return (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          KO
          <MSwitch
            checked={currentLocale === "en"}
            onClick={this.changeLocale}
            color="primary"
          />
          EN
        </div>
      );
    }
    return null;
  };

  private readonly changeLocale = () => {
    const { locale, changeLocale } = this.props;
    const currentLocale = locale || browserLocale();
    changeLocale(currentLocale === "en" ? "ko" : "en");
  };

  private readonly getIsMobile = () =>
    this.isMobileRef.current?.isMobile || false;

  private readonly openJoinGroupDialog = () => {
    const {
      joinGroupDialogOpen,
      currentUser,
      dispatchOpenJoinGroupDialog,
    } = this.props;
    const { joinGroupDialogOpenOnce } = this.state;

    if (
      !joinGroupDialogOpenOnce &&
      currentUser?.status === UserStatusTypes.PENDING &&
      !joinGroupDialogOpen
    ) {
      dispatchOpenJoinGroupDialog("current", "phone");
      this.setState({ joinGroupDialogOpenOnce: true });
    }
  };

  private readonly refreshToken = async () => {
    const { hubGroupId, currentGroupId } = this.props;
    if (!hubGroupId || !currentGroupId) {
      return;
    }
    const response = await retry(
      async () => {
        const cookieCanPass = getMoimTokenToCookie(hubGroupId);

        if (cookieCanPass) {
          const result = await refreshAccessToken({
            groupId: hubGroupId,
            refreshToken: cookieCanPass.refresh_token,
          });

          return result;
        }

        return undefined;
      },
      {
        retries: 3,
        minTimeout: 2000,
        maxTimeout: 2000,
        factor: 1,
        randomize: true,
      },
    );

    if (!response) {
      return;
    }

    storeMoimTokenToCookie(hubGroupId, response);
    setOAuthTokenForGroup({
      token: response.access_token,
      group: hubGroupId,
    });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(RootComponent)));
