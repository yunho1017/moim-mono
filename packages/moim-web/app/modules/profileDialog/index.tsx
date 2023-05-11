import * as React from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";
import { bindActionCreators } from "redux";
// actions
import { getProfileBlocks as getProfileBlocksAction } from "app/actions/user";
import { ActionCreators as ProfileActionCreators } from "app/actions/profile";
import { getCertificatesByUserId as getCertificationsAction } from "app/actions/cryptobadge";
// selector
import { userSelector } from "app/selectors/user";
import { userCertificationSelector } from "app/selectors/cryptobadge";
// helpers
import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import IsMobileViewport, {
  IRefHandler,
} from "common/components/isMobileViewport";
// components
import ProfileDialogComponent from "./components/inner";
import ResponsiveMenu from "common/components/responsiveMenu";
import { PopoverStyle, BottomSheetHandleStyle } from "./styled";

function mapStateToProps(state: IAppState) {
  const user = userSelector(state, state.profileDialog.targetUserId);
  return {
    ...state.profileDialog,
    user,
    isCryptoBadgeLoading: Boolean(
      user && state.profilePage.isCryptoBadgeLoading[user.id],
    ),
    certifications: userCertificationSelector(
      state,
      user?.certifications || { data: [] },
    ),
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      getCertifications: getCertificationsAction,
      getProfileBlocks: getProfileBlocksAction,
      close: ProfileActionCreators.closeProfileDialog,
    },
    dispatch,
  );
}

interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

interface IState {
  minHeight: number;
}

const DEFAULT_MIN_HEIGHT = 200;

class ProfileDialog extends React.PureComponent<IProps, IState> {
  public state: IState = {
    minHeight: DEFAULT_MIN_HEIGHT,
  };
  private readonly refContent = React.createRef<HTMLDivElement>();
  private readonly refIsMobileViewport = React.createRef<IRefHandler>();

  public componentDidUpdate(prevProps: IProps) {
    const {
      isOpen,
      user,
      targetUserId,
      getCertifications,
      getProfileBlocks,
    } = this.props;
    if (
      user &&
      isOpen &&
      prevProps.isOpen !== isOpen &&
      prevProps.targetUserId !== targetUserId
    ) {
      getProfileBlocks(targetUserId, "preview");
      if (user.canId) {
        getCertifications(targetUserId, {
          canId: user.canId,
        });
      }
    }
  }

  public render() {
    const {
      isOpen,
      anchorElement,
      user,
      isCryptoBadgeLoading,
      certifications,
      targetUserId,
    } = this.props;
    const { minHeight } = this.state;
    if (!user || user.is_deactivated) {
      return null;
    }
    return (
      <ResponsiveMenu
        open={isOpen}
        anchorElement={anchorElement?.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        minHeight={minHeight}
        transitionComponent={Fade}
        paperOverrideStyle={PopoverStyle}
        bottomSheetHandleStyle={BottomSheetHandleStyle}
        marginThreshold={24}
        onCloseRequest={this.handleClose}
      >
        <ProfileDialogComponent
          ref={this.refContent}
          userId={targetUserId}
          userData={user}
          cryptoBadges={certifications}
          isCryptoBadgeLoading={isCryptoBadgeLoading}
          onCloseRequest={this.handleClose}
          onChangeBodyResize={this.handleChangeBodyResize}
        />

        <IsMobileViewport ref={this.refIsMobileViewport} />
      </ResponsiveMenu>
    );
  }

  private readonly getContentHeight = (elem: Element | null) =>
    elem ? elem.clientHeight : undefined;

  private readonly handleClose = () => {
    this.props.close();
  };

  private readonly handleChangeBodyResize = () => {
    this.setState({
      minHeight:
        this.getContentHeight(this.refContent.current) ?? DEFAULT_MIN_HEIGHT,
    });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
