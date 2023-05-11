import * as React from "react";
import { FormattedMessage } from "react-intl";
import useRedirect from "common/hooks/useRedirect";
import useTheme from "app/theme/hooks/useTheme";
import useOpenState from "common/hooks/useOpenState";
import PostItem from "app/modules/forum/components/forumThreadList/components/threadList/postItem";
import AlertDialog from "common/components/alertDialog";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { Wrapper, DeleteWrapper, TrashIcon } from "./styled";
import { MoimURL } from "common/helpers/url";

const DEFAULT_THREAD_CONFIG: Moim.Forum.IForumListConfig = {
  show_thumbnail: true,
  show_title: true,
  show_text: true,
  show_author_avatar: false,
  text_alignment: "LEFT",
  thumbnail_config: {
    position: "left",
    type: "ratio",
    value: "5:3",
  },
  column_count: 1,
  mobile_column_count: 1,
  convertible_column_count: [1],
  mobile_convertible_column_count: [1],
  show_author: true,
  show_comment_count: false,
  show_date: true,
  show_reaction: false,
  reaction_type: "up",
  tag_sets: [],
  tag_set_filter_type: "NAVIGATION",
};

interface IProps {
  thread: Moim.Forum.IDenormalizedThread;
  enableDeleteButton: boolean;
  onClick(): void;
  onDelete(parentId: Moim.Id, threadId: Moim.Id): void;
}

const DraftItem: React.FC<IProps> = ({
  thread,
  enableDeleteButton,
  onClick,
  onDelete,
}) => {
  const redirect = useRedirect();
  const { close: closeNativeSecView } = useNativeSecondaryView();
  const { isOpen, open, close } = useOpenState(false);
  const themeContext = useTheme();

  const doDelete = React.useCallback(() => {
    close();
    onDelete(thread.parent_id, thread.id);
  }, [onDelete, close, thread.id, thread.parent_id]);

  const handleDeleteClick = React.useCallback(
    e => {
      e.stopPropagation();
      open();
    },
    [open],
  );

  const alertButtons = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="cancel_button" />,
        onClick: close,
      },
      {
        text: <FormattedMessage id="delete_button" />,
        textColor: themeContext?.theme.color.blue700,
        onClick: doDelete,
      },
    ],
    [close, doDelete, themeContext],
  );

  const handleClick = React.useCallback(() => {
    closeNativeSecView();
    const { pathname, search } = new MoimURL.BlockitEditor().toObject();
    const qs = new URLSearchParams(search);
    qs.set("channel", thread.parent_id);
    qs.set("draft", thread.id);

    redirect({
      pathname,
      search: qs.toString(),
    });
    onClick();
  }, [closeNativeSecView, onClick, redirect, thread.id, thread.parent_id]);

  return (
    <>
      <Wrapper
        role="button"
        showDeleteButton={enableDeleteButton}
        onClick={handleClick}
      >
        <PostItem
          thread={thread}
          selected={false}
          config={DEFAULT_THREAD_CONFIG}
          disableHyperLink={true}
        />
        <DeleteWrapper onClick={handleDeleteClick}>
          <TrashIcon />
        </DeleteWrapper>
      </Wrapper>
      <AlertDialog
        open={isOpen}
        onClose={close}
        content={
          <FormattedMessage id="post_draft/list_dialog/delete_dialog_description" />
        }
        rightButtons={alertButtons}
      />
    </>
  );
};

export default React.memo(DraftItem);
