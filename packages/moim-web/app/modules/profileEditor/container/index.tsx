import * as React from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  WrappedComponentProps,
  injectIntl,
  FormattedMessage,
} from "react-intl";
// helper
import { AppDispatch } from "app/store";
import { IAppState } from "app/rootReducer";
import { ProfileEditorChangeEvent } from "../components/baseLayout/useHooks";
// action
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import {
  closeProfileEditor as closeProfileEditorAction,
  updateMyProfile,
} from "app/actions/me";
// reselector
import { currentUserSelector } from "app/selectors/app";
// constants
// components
import { AppBarModalLayout } from "common/components/modalLayout";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import ProfileEditorComponent from "../components/baseLayout";
import {
  SaveButton,
  CloseButton,
  Container,
  appBarStyle,
} from "./styledComponents";

function mapStateToProps(state: IAppState) {
  return {
    ...state.profileEditorPage,
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      closeProfileEditor: closeProfileEditorAction,
      submitProfileEdit: updateMyProfile,
      openSnackbar: SnackbarActionCreators.openSnackbar,
    },
    dispatch,
  );
}

interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    WrappedComponentProps {}

interface IState {
  canSave: boolean;
  updatedProfileData: Moim.User.IUpdatableInfo;
}

class ProfileEditorContainer extends React.PureComponent<IProps, IState> {
  public readonly state: IState = {
    canSave: false,
    updatedProfileData: {},
  };
  private cancelTokenSource = axios.CancelToken.source();

  public componentDidUpdate(prevProps: IProps) {
    const { open } = this.props;
    if (prevProps.open !== open && open) {
      this.cancelTokenSource = axios.CancelToken.source();
      this.clearState();
    }
  }

  public componentWillUnmount() {
    this.cancelTokenSource.cancel();
  }

  public render() {
    const {
      open,
      intl,
      currentUser,
      isUpdateLoading,
      isAvatarUploading,
    } = this.props;
    const { canSave } = this.state;
    if (!currentUser) return null;

    return (
      <BasicResponsiveDialog open={open} onClose={this.handleCloseDialog}>
        <AppBarModalLayout
          title={intl.formatMessage({ id: "edit_profile_show/page_title" })}
          leftElement={<CloseButton onClick={this.handleCloseDialog} />}
          actionButton={
            <SaveButton
              waiting={isUpdateLoading}
              disabled={isUpdateLoading || !canSave}
              onClick={this.handleSubmit}
            >
              <FormattedMessage id="save_button" />
            </SaveButton>
          }
          headerWrapperStyle={appBarStyle}
        >
          <Container>
            <ProfileEditorComponent
              isAvatarUpdating={isAvatarUploading}
              userData={currentUser}
              onChange={this.handleChangeProfileData}
            />
          </Container>
        </AppBarModalLayout>
      </BasicResponsiveDialog>
    );
  }

  private readonly handleCloseDialog = () => {
    const { intl, closeProfileEditor } = this.props;
    if (Object.keys(this.state.updatedProfileData).length > 0) {
      if (
        !window.confirm(
          intl.formatMessage({ id: "back_button_content_description" }),
        )
      ) {
        return;
      }
    }
    closeProfileEditor();
  };

  private readonly handleSubmit = async () => {
    const {
      submitProfileEdit,
      openSnackbar,
      intl,
      closeProfileEditor,
    } = this.props;
    const { updatedProfileData } = this.state;

    try {
      await submitProfileEdit(updatedProfileData, this.cancelTokenSource.token);
      closeProfileEditor();
      openSnackbar({
        text: intl.formatMessage({
          id: "save_success_toast_message",
        }),
      });
    } catch (err) {
      openSnackbar({
        text: intl.formatMessage({
          id: "save_failure_toast_message",
        }),
      });
    }
    this.clearState();
  };

  private readonly handleChangeProfileData = (
    event: ProfileEditorChangeEvent,
  ) => {
    const { currentUser } = this.props;
    const { nameHasError, bioHasError, ...rest } = event;
    if (!currentUser) {
      return;
    }

    const avatarSave =
      rest.avatar_id === undefined ? true : Boolean(rest.avatar_id);

    this.setState({
      canSave: !nameHasError && !bioHasError && avatarSave,
      updatedProfileData: {
        ...rest,
        name: rest.name !== "" ? rest.name : null,
        bio: rest.bio !== "" ? rest.bio : null,
      },
    });
  };

  private readonly clearState = () => {
    this.setState({
      canSave: false,
      updatedProfileData: {},
    });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ProfileEditorContainer));
