import * as React from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState, useActions } from "app/store";
import {
  ActionCreators,
  deleteAllDraft as deleteAllDraftAction,
} from "app/actions/draft";
import useOpenState from "common/hooks/useOpenState";
import useIsMobile from "common/hooks/useIsMobile";
import useTheme from "app/theme/hooks/useTheme";
// components
import ResponsiveDialog from "common/components/responsiveDialog";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import AlertDialog from "common/components/alertDialog";
import Inner from "./component";
import { AppBarDeleteButton } from "./styled";

const BOTTOM_SHEET_APPBAR_HEIGHT = 60;

const Container = styled.div`
  width: 100%;
`;

const DraftListModal: React.FC = ({}) => {
  const {
    isOpen: deleteModeStatus,
    setIsOpen: setDeleteModeStatus,
  } = useOpenState(false);
  const {
    isOpen: deleteAllAlertStatus,
    open: openDeleteAllAlert,
    close: closeDeleteAllAlert,
  } = useOpenState(false);
  const intl = useIntl();
  const themeContext = useTheme();
  const isMobile = useIsMobile();

  const { open, draftsLength } = useStoreState(state => ({
    open: state.draftState.modalOpen,
    draftsLength: state.draftState.draftCount,
  }));
  const { close, deleteAllDraft } = useActions({
    close: ActionCreators.closeDraftListModal,
    deleteAllDraft: deleteAllDraftAction,
  });
  const [minHeight, setMinHeight] = React.useState(80);

  const handleResize = React.useCallback((_, height: number) => {
    setMinHeight(height + BOTTOM_SHEET_APPBAR_HEIGHT);
  }, []);

  const handleClose = React.useCallback(() => {
    close();
  }, [close]);

  const doDeleteAll = React.useCallback(() => {
    deleteAllDraft([], {
      success: intl.formatMessage({ id: "delete_success_toast_message" }),
      failed: intl.formatMessage({ id: "delete_failure_toast_message" }),
    });
    closeDeleteAllAlert();
  }, [deleteAllDraft, intl, closeDeleteAllAlert]);

  const alertButtons = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="cancel_button" />,
        onClick: closeDeleteAllAlert,
      },
      {
        text: <FormattedMessage id="delete_button" />,
        textColor: themeContext?.theme.color.blue700,
        onClick: doDeleteAll,
      },
    ],
    [closeDeleteAllAlert, doDeleteAll, themeContext],
  );

  const toggleDeleteMode = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setDeleteModeStatus(!deleteModeStatus);
    },
    [deleteModeStatus, setDeleteModeStatus],
  );

  const mobileLeftAppBarButton = React.useMemo(
    () =>
      isMobile && deleteModeStatus ? (
        <AppBarDeleteButton onClick={openDeleteAllAlert}>
          <FormattedMessage id="delete_all_button" />
        </AppBarDeleteButton>
      ) : null,
    [deleteModeStatus, isMobile, openDeleteAllAlert],
  );

  const deleteButton = React.useMemo(
    () =>
      isMobile ? (
        <AppBarDeleteButton
          onClick={toggleDeleteMode}
          setTextColorToHighlight={deleteModeStatus}
        >
          <FormattedMessage
            id={deleteModeStatus ? "done_button" : "delete_button"}
          />
        </AppBarDeleteButton>
      ) : (
        <AppBarDeleteButton onClick={openDeleteAllAlert}>
          <FormattedMessage id="delete_all_button" />
        </AppBarDeleteButton>
      ),
    [deleteModeStatus, isMobile, openDeleteAllAlert, toggleDeleteMode],
  );

  return (
    <>
      <ResponsiveDialog
        open={open}
        minHeight={minHeight}
        dialogBase={FixedHeightBasicDialog}
        useSameAppBarHeaderFromBottomSheet={true}
        titleAlignment="Center"
        titleElement={
          <FormattedMessage
            id="post_draft/list_dialog_title"
            values={{ count: draftsLength }}
          />
        }
        leftButton={mobileLeftAppBarButton}
        rightButton={deleteButton}
        onCloseRequest={handleClose}
      >
        <Container>
          <ReactResizeDetector handleHeight={true} onResize={handleResize}>
            <Inner enableDeleteMode={deleteModeStatus} />
          </ReactResizeDetector>
        </Container>
      </ResponsiveDialog>
      <AlertDialog
        open={deleteAllAlertStatus}
        onClose={closeDeleteAllAlert}
        content={
          <FormattedMessage id="post_draft/list_dialog/delete_all_dialog_description" />
        }
        rightButtons={alertButtons}
      />
    </>
  );
};

export default DraftListModal;
