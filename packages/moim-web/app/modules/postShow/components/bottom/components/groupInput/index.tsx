import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ThreadInput } from "common/components/threadV2";
import AlertDialog from "common/components/alertDialog";
import { UnsignedCommentInputFeedback } from "common/components/feedBack/components/unsigned/input";
import {
  ThreadInputWrapper,
  NoRightTextWrapper,
  BackgroundLayer,
} from "./styled";

// hook
import PermissionChecker from "common/components/permissionChecker";
import { useStoreState } from "app/store";
import useOpenState from "app/common/hooks/useOpenState";
import { useForumThreadInput } from "common/components/threadV2/components/threadInput/hooks";
import { usePostShowPermission } from "app/modules/postShow/hooks";
import { useHandleSignIn } from "common/hooks/useHandleSign";
// helper
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { fileListSelector } from "app/selectors/file";
// type
import { IForwardRef } from "common/components/groupInput";
import { PermissionDeniedFallbackType } from "app/enums";

import { PostShowContext } from "app/modules/postShow/context";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

function usePostShowSignIn() {
  const { post } = React.useContext(PostShowContext);
  const { currentGroupId, postShowGroup } = useStoreState(state => ({
    currentGroupId: state.app.currentGroupId,
    postShowGroup: post.groupId
      ? state.entities.groups[post.groupId]
      : undefined,
  }));

  const signIn = useHandleSignIn();

  return React.useCallback(() => {
    if (postShowGroup && postShowGroup?.id !== currentGroupId) {
      window.open(postShowGroup.url, "_blank");
    } else {
      signIn();
    }
  }, [postShowGroup, currentGroupId, signIn]);
}

export default function GroupInput() {
  const { post } = React.useContext(PostShowContext);
  const channelId = post.parent_id;
  const threadId = post.id;

  const intl = useIntl();
  const refThis = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<IForwardRef>(null);
  const uploadLoadingAlertOpenState = useOpenState();
  const { getFileEntities, group, isReplyAnonymous } = useStoreState(state => ({
    getFileEntities: (ids: string[]) => fileListSelector(state, ids),
    group: post.groupId ? state.entities.groups[post.groupId] : undefined,
    isReplyAnonymous: (state.entities.channels[
      channelId
    ] as Moim.Channel.IForumSimpleChannel)?.anonymous_config?.reaction,
  }));
  const handleSignIn = usePostShowSignIn();
  const { hasPermission: writeComment, isLoading } = usePostShowPermission(
    "WRITE_COMMENT",
    channelId,
  );
  const threadInputHookProps = useForumThreadInput.useProps();
  const { handlePostThread } = useForumThreadInput.useHandlers(
    threadInputHookProps,
  );

  const checkUploadDone = React.useCallback(() => {
    const ids = inputRef.current?.getUploadQueue();

    if (!ids) return true;
    const files = getFileEntities(ids);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFileEntities, inputRef]);

  const handleFocus = React.useCallback(() => {
    AnalyticsClass.getInstance().forumPostCommentWriteSelect({
      forumId: post.root_id ?? "",
      postId: post.id,
    });
  }, [post.id, post.root_id]);

  const handleEnter = React.useCallback(
    (
      contents: Moim.Blockit.Blocks[],
      preLinkMeetingData: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => {
      if (!checkUploadDone()) {
        uploadLoadingAlertOpenState.open();
        return;
      }
      const { isEmptyFile, isEmptyText, isEmptyImageFile } = isEmpty(contents);

      if (
        isEmptyFile &&
        isEmptyText &&
        isEmptyImageFile &&
        !preLinkMeetingData
      ) {
        return;
      }

      handlePostThread({
        channelId,
        threadId,
        contents,
        groupId: post.groupId,
      });

      inputRef.current?.groupInputClear();
      AnalyticsClass.getInstance().forumPostCommentWritePublish({
        forumId: post.root_id ?? "",
        postId: post.id,
      });
    },
    [
      checkUploadDone,
      handlePostThread,
      channelId,
      threadId,
      post.groupId,
      post.root_id,
      post.id,
      uploadLoadingAlertOpenState,
    ],
  );

  const uploadLoadingAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "ok_button" }),
        onClick: uploadLoadingAlertOpenState.close,
      },
    ],
    [uploadLoadingAlertOpenState.close, intl],
  );

  const unsignedFeedbackType = React.useMemo(() => {
    if (group) {
      return group.is_hub ? "parent" : "child";
    }
    return undefined;
  }, [group]);

  return (
    <>
      <ThreadInputWrapper ref={refThis}>
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.CUSTOM}
          hasPermission={writeComment}
          isLoading={isLoading}
          groupId={post.groupId}
          permissionDeniedCustomElement={
            <NoRightTextWrapper>
              <BackgroundLayer>
                <FormattedMessage id="no_right_block_input_placeholder" />
              </BackgroundLayer>
            </NoRightTextWrapper>
          }
          unsignedCustomElement={
            <UnsignedCommentInputFeedback
              feedbackType={unsignedFeedbackType}
              onClick={handleSignIn}
            />
          }
        >
          <ThreadInput
            id={threadId}
            groupId={post.groupId}
            inputRef={inputRef}
            maxAttachmentCount={50}
            mentionPortalContainer={refThis.current}
            onFocus={handleFocus}
            onEnter={handleEnter}
            placeholder={intl.formatMessage({
              id: "post_show/comment_placeholder",
            })}
            useImageFileAttachButton={true}
            resizeDetectHeight={true}
            disableMention={Boolean(isReplyAnonymous)}
            disableCreateMeeting={true}
            disableMentionPortal={false}
          />
        </PermissionChecker>
      </ThreadInputWrapper>
      <AlertDialog
        key="uploadLoadingAlert"
        open={uploadLoadingAlertOpenState.isOpen}
        content={
          <FormattedMessage id="thread_v2_input_upload_working_alert_body" />
        }
        rightButtons={uploadLoadingAlertButtons}
        onClose={uploadLoadingAlertOpenState.close}
      />
    </>
  );
}
