import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import ReactResizeDetector from "react-resize-detector";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import { MenuWrapper } from "common/components/responsiveMenu/components/menu";
import { MenuItem } from "./styled";
import AlertModal from "common/components/alertDialog";
import NoRightAlert, {
  IRefHandler as INoRightRefHandler,
} from "common/components/feedBack/components/noRight/alert";
import { MaxCountPinAlertDialog, UnPinAlertDialog } from "../pinAlertDialog";

import { useActions, useStoreState } from "app/store";
import usePostShowMenu from "./usePostShowMenu";
import { useOpenPostReportDialog } from "common/components/reportDialog/presets/post/hooks";
import useIsMobile from "common/hooks/useIsMobile";

import { MoimURL } from "common/helpers/url";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { pinPost } from "app/actions/forum";

const MAX_PINNED_POST_COUNT = 100;

interface IProps {
  open: boolean;
  rootId: Moim.Id;
  threadId: Moim.Id;
  authorId: Moim.Id;
  refMenuButton: React.RefObject<HTMLDivElement>;
  onClose(): void;
  onDeleteThread(): void;
}
const ForumShowMenu = ({
  rootId,
  threadId,
  authorId,
  open,
  refMenuButton,
  onClose,
  onDeleteThread,
}: IProps) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const {
    hasEditPermission,
    hasDeletePermission,
    hasPinPermission,
    visibleReportButton,
  } = usePostShowMenu(threadId, authorId);
  const { pinned, hasMaxPinnedPost } = useStoreState(state => ({
    pinned: state.forumData.pinnedPostList[rootId]?.includes(threadId),
    hasMaxPinnedPost:
      (state.forumData.pinnedPostList[rootId]?.length ?? 0) >
      MAX_PINNED_POST_COUNT,
  }));

  const { dispatchOpenSnackbar, dispatchPinPost } = useActions({
    dispatchOpenSnackbar: SnackbarActionCreators.openSnackbar,
    dispatchPinPost: pinPost,
  });

  const refNoRightAlert = React.useRef<INoRightRefHandler>(null);
  const [minHeight, setMinHeight] = React.useState<number | undefined>(0);
  const [isOpenDeleteConfirm, setDeleteConfirmOpenStatus] = React.useState(
    false,
  );
  const [unPinAlertDialogOpen, setUnPinAlertDialogOpen] = React.useState(false);
  const [
    maxCountPinAlertDialogOpen,
    setMaxCountPinAlertDialogOpen,
  ] = React.useState(false);

  const editThreadUrlObject = React.useMemo(() => {
    if (isMobile) {
      return new MoimURL.EditForumThread({
        threadId,
        forumId: rootId,
      }).toString();
    }
    const { pathname, search } = new MoimURL.BlockitEditor().toObject();
    const qs = new URLSearchParams(search);
    if (rootId) {
      qs.set("channel", rootId);
    }
    if (threadId) {
      qs.set("thread", threadId);
    }

    return {
      pathname,
      search: qs.toString(),
    };
  }, [isMobile, rootId, threadId]);

  const handleResponsiveMenuWrapperResize = React.useCallback(
    (_width: number, height: number) => {
      setMinHeight(height);
    },
    [],
  );

  const handleOpenDeleteConfirm = React.useCallback(() => {
    setDeleteConfirmOpenStatus(true);
  }, []);
  const handleCloseDeleteConfirm = React.useCallback(() => {
    setDeleteConfirmOpenStatus(false);
  }, []);

  const handleDeleteThread = React.useCallback(() => {
    if (hasDeletePermission) {
      handleOpenDeleteConfirm();
    } else {
      refNoRightAlert.current?.openHandler();
    }
    onClose();
  }, [hasDeletePermission, onClose, handleOpenDeleteConfirm]);

  const handleOpenUnPinAlertDialog = React.useCallback(() => {
    setUnPinAlertDialogOpen(true);
    onClose();
  }, [onClose]);

  const handleCloseUnPinAlertDialog = React.useCallback(() => {
    setUnPinAlertDialogOpen(false);
  }, []);

  const handleOpenMaxCountPinAlertDialog = React.useCallback(() => {
    setMaxCountPinAlertDialogOpen(true);
  }, []);

  const handleCloseMaxCountPinAlertDialog = React.useCallback(() => {
    setMaxCountPinAlertDialogOpen(false);
  }, []);

  const handlePinPost = React.useCallback(async () => {
    if (hasMaxPinnedPost) {
      handleOpenMaxCountPinAlertDialog();
      return;
    }

    const result = await dispatchPinPost({
      channelId: rootId,
      pinIds: [threadId],
    });

    if (result?.success) {
      dispatchOpenSnackbar({
        text: intl.formatMessage({
          id: "post_show/pin_success_toast_message",
        }),
      });
    } else {
      dispatchOpenSnackbar({
        text: intl.formatMessage({
          id: "post_show/pin_failure_toast_message",
        }),
      });
    }
    onClose();
  }, [
    dispatchOpenSnackbar,
    dispatchPinPost,
    onClose,
    handleOpenMaxCountPinAlertDialog,
    hasMaxPinnedPost,
    intl,
    rootId,
    threadId,
  ]);

  const handleReportButtonClick = useOpenPostReportDialog({
    parentId: authorId,
    threadId,
  });
  return (
    <>
      <ResponsiveMenu
        open={open}
        anchorElement={refMenuButton.current}
        onCloseRequest={onClose}
        minHeight={minHeight}
      >
        <MenuWrapper>
          <ReactResizeDetector
            handleHeight={true}
            onResize={handleResponsiveMenuWrapperResize}
          >
            {hasEditPermission && (
              <MenuItem key="mene_edit_thread">
                <Link to={editThreadUrlObject}>
                  <FormattedMessage id="edit_button" />
                </Link>
              </MenuItem>
            )}

            {hasPinPermission &&
              (pinned ? (
                <MenuItem
                  key="menu_un_pin"
                  onClick={handleOpenUnPinAlertDialog}
                >
                  <FormattedMessage id="post_show/post_more_menu_unpin" />
                </MenuItem>
              ) : (
                <MenuItem key="menu_pin" onClick={handlePinPost}>
                  <FormattedMessage id="post_show/post_more_menu_pin" />
                </MenuItem>
              ))}

            {hasDeletePermission && (
              <MenuItem key="mene_delete_thread" onClick={handleDeleteThread}>
                <FormattedMessage id="delete_button" />
              </MenuItem>
            )}

            {visibleReportButton && (
              <MenuItem key="menu_report" onClick={handleReportButtonClick}>
                <FormattedMessage id="more_menu_report" />
              </MenuItem>
            )}
          </ReactResizeDetector>
        </MenuWrapper>
      </ResponsiveMenu>
      <AlertModal
        open={isOpenDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        content={
          <FormattedMessage id="post_show/post_more_menu_delete_dialog_body" />
        }
        rightButtons={[
          {
            text: intl.formatMessage({ id: "cancel_button" }),
            onClick: handleCloseDeleteConfirm,
          },
          {
            text: intl.formatMessage({ id: "delete_button" }),
            onClick: onDeleteThread,
          },
        ]}
      />
      <NoRightAlert ref={refNoRightAlert} />
      <UnPinAlertDialog
        open={unPinAlertDialogOpen}
        onClose={handleCloseUnPinAlertDialog}
        rootId={rootId}
        threadId={threadId}
      />
      <MaxCountPinAlertDialog
        open={maxCountPinAlertDialogOpen}
        onClose={handleCloseMaxCountPinAlertDialog}
      />
    </>
  );
};

export default ForumShowMenu;
