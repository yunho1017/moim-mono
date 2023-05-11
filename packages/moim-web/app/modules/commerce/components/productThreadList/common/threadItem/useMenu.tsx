import * as React from "react";

import { FormattedMessage, useIntl } from "react-intl";
// hooks
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import makeShareUrl from "common/helpers/makeShareUrl";
import { MoimURL } from "common/helpers/url";

// action
import {
  deleteProductReview,
  deleteFundComment,
  deleteProductQuestion,
} from "app/actions/commerce";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import { Share } from "common/components/snsShareDialog/utils";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import NoRightAlert, {
  IRefHandler as INoRightRefHandler,
} from "common/components/feedBack/components/noRight/alert";
import AlertModal from "common/components/alertDialog";

import ProductThreadListContext from "../../context";

interface IProps {
  thread: Moim.Forum.IThread;
  onClickEditComment(): void;
}

const getShareUrl = (thread: Moim.Forum.IThread, productId?: Moim.Id) => {
  if (!productId) {
    return undefined;
  }
  switch (thread.type) {
    case "productReview":
      return makeShareUrl(
        new MoimURL.CommerceProductShowReview({
          id: productId,
          threadId: thread.id,
        }).toString(),
      );
    case "productReviewReply":
      return makeShareUrl(
        new MoimURL.CommerceProductShowReviewReply({
          id: productId,
          threadId: thread.parent_id,
          replyId: thread.id,
        }).toString(),
      );
    case "productQuestion":
      return makeShareUrl(
        new MoimURL.CommerceProductShowQnA({
          id: productId,
          threadId: thread.id,
        }).toString(),
      );
    case "productQuestionReply":
      return makeShareUrl(
        new MoimURL.CommerceProductShowQnAReply({
          id: productId,
          threadId: thread.parent_id,
          replyId: thread.id,
        }).toString(),
      );
    case "productComment":
      return makeShareUrl(
        new MoimURL.CommerceProductShowComment({
          id: productId,
          threadId: thread.id,
        }).toString(),
      );
    case "productCommentReply":
      return makeShareUrl(
        new MoimURL.CommerceProductShowCommentReply({
          id: productId,
          threadId: thread.parent_id,
          replyId: thread.id,
        }).toString(),
      );

    default:
      return;
  }
};

export const useThreadItemMenu = ({ thread, onClickEditComment }: IProps) => {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const { productId, sellerId } = React.useContext(ProductThreadListContext);
  const shareUrl = React.useMemo(() => getShareUrl(thread, productId), [
    thread,
    productId,
  ]);

  const {
    dispatchDeleteProductReview,
    dispatchDeleteFundComment,
    dispatchDeleteProductQuestion,
  } = useActions({
    dispatchDeleteProductReview: deleteProductReview,
    dispatchDeleteFundComment: deleteFundComment,
    dispatchDeleteProductQuestion: deleteProductQuestion,
  });

  const refMoreMenu = React.useRef<HTMLDivElement>(null);
  const responsiveMenuOpenState = useOpenState();
  const uploadLoadingAlertOpenState = useOpenState();
  const refNoRightAlert = React.useRef<INoRightRefHandler>(null);
  const deleteConfirmOpenState = useOpenState();

  const isAuthor = thread.author === currentUser?.id;

  const handleClickEditComment = React.useCallback(() => {
    onClickEditComment();
    responsiveMenuOpenState.close();
  }, [responsiveMenuOpenState.close, onClickEditComment]);

  const handleClickDelete = React.useCallback(() => {
    if (isAuthor) {
      deleteConfirmOpenState.open();
    } else {
      refNoRightAlert.current?.openHandler();
    }
    responsiveMenuOpenState.close();
  }, [isAuthor, responsiveMenuOpenState.close, deleteConfirmOpenState.open]);

  const onDelete = React.useCallback(() => {
    if (productId && sellerId) {
      switch (thread.type) {
        case "productComment": {
          dispatchDeleteFundComment(
            sellerId,
            productId,
            thread.parent_id,
            thread.id,
          );
          break;
        }
        case "productQuestion": {
          dispatchDeleteProductQuestion(
            sellerId,
            productId,
            thread.parent_id,
            thread.id,
          );
          break;
        }
        default: {
          dispatchDeleteProductReview(
            sellerId,
            productId,
            thread.parent_id,
            thread.id,
          );
          break;
        }
      }
    }
    deleteConfirmOpenState.close();
  }, [
    dispatchDeleteProductReview,
    dispatchDeleteProductQuestion,
    dispatchDeleteFundComment,
    deleteConfirmOpenState.close,
    productId,
    thread.parent_id,
    thread.id,
    sellerId,
  ]);

  const uploadLoadingAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "ok_button" }),
        onClick: uploadLoadingAlertOpenState.close,
      },
    ],
    [uploadLoadingAlertOpenState.close, intl],
  );

  const responsiveMenuElement = React.useMemo(() => {
    const menus: {
      text?: string;
      onClick?: () => void;
      children?: React.ReactNode;
    }[] = [];

    if (isAuthor && thread.type !== "productReview") {
      menus.push(
        {
          text: intl.formatMessage({ id: "delete_button" }),
          onClick: deleteConfirmOpenState.open,
        },
        {
          text: intl.formatMessage({ id: "edit_button" }),
          onClick: onClickEditComment,
        },
      );
    }

    menus.push({
      children: (
        <Share shareUrl={shareUrl}>
          {handler => (
            <MenuItem onClick={handler}>
              <FormattedMessage id="menu_content_link_share" />
            </MenuItem>
          )}
        </Share>
      ),
    });

    return (
      <ResponsiveMenu
        open={responsiveMenuOpenState.isOpen}
        anchorElement={refMoreMenu.current}
        onCloseRequest={responsiveMenuOpenState.close}
      >
        <MenuWrapper>
          {menus.map(menu =>
            menu.children ? (
              menu.children
            ) : (
              <MenuItem onClick={menu.onClick}>
                <FormattedMessage id={menu.text!} />
              </MenuItem>
            ),
          )}
        </MenuWrapper>
      </ResponsiveMenu>
    );
  }, [isAuthor, thread, shareUrl, responsiveMenuOpenState]);

  const menuElement = React.useMemo(
    () => (
      <>
        {responsiveMenuElement}
        <NoRightAlert ref={refNoRightAlert} />
        <AlertModal
          open={deleteConfirmOpenState.isOpen}
          content={
            <FormattedMessage id="post_show/comment_more_menu_delete_dialog_body" />
          }
          rightButtons={[
            {
              text: intl.formatMessage({ id: "cancel_button" }),
              onClick: deleteConfirmOpenState.close,
            },
            {
              text: intl.formatMessage({ id: "delete_button" }),
              onClick: onDelete,
            },
          ]}
          onClose={deleteConfirmOpenState.close}
        />
        <AlertModal
          key="uploadLoadingAlert"
          open={uploadLoadingAlertOpenState.isOpen}
          content={
            <FormattedMessage id="thread_v2_input_upload_working_alert_body" />
          }
          rightButtons={uploadLoadingAlertButtons}
          onClose={uploadLoadingAlertOpenState.close}
        />
      </>
    ),
    [
      responsiveMenuElement,

      deleteConfirmOpenState.isOpen,
      deleteConfirmOpenState.close,
      uploadLoadingAlertOpenState.isOpen,
      uploadLoadingAlertOpenState.close,
      uploadLoadingAlertButtons,
      onDelete,
      handleClickDelete,
      handleClickEditComment,
    ],
  );

  return {
    refMoreMenu,
    responsiveMenuOpenState,
    uploadLoadingAlertOpenState,
    menuElement,
  };
};
