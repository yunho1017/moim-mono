import * as React from "react";
import {
  NotiOnInput as NotiOnInputBase,
  NotificationTypeInputWrapper,
  MentionInput,
  NewPostInput,
  CommentInput,
  FollowingPostCommentInput,
  LikePostInput,
  LikeCommentInput,
} from "../../../common/pushNotificationSettingForm";
import { CSSTransition } from "react-transition-group";

interface INotiOnInput {
  status: Moim.NotificationStatusType;
  alarmNotificationSetting: Moim.INotificationItem<Moim.NotificationEnabled>;
  onChangeNotiStatus(option: Moim.NotificationStatusType): void;
  onNotificationTypeChange(
    option: Partial<
      Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    >,
  ): void;
}
export function NotiOnInput({
  status,
  alarmNotificationSetting,
  onChangeNotiStatus,
  onNotificationTypeChange,
}: INotiOnInput) {
  return (
    <>
      <NotiOnInputBase status={status} onChange={onChangeNotiStatus} />

      <CSSTransition
        in={status === "enable"}
        timeout={300}
        classNames="bodyAnim"
        unmountOnExit={true}
      >
        <NotificationTypeInputWrapper>
          <MentionInput
            meta={alarmNotificationSetting.detailed.mention}
            checked={alarmNotificationSetting.detailed.mention.web}
            onChange={onNotificationTypeChange}
          />
          <NewPostInput
            meta={alarmNotificationSetting.detailed.newPost}
            checked={alarmNotificationSetting.detailed.newPost.web}
            onChange={onNotificationTypeChange}
          />
          <CommentInput
            meta={alarmNotificationSetting.detailed.commentPost}
            checked={alarmNotificationSetting.detailed.commentPost.web}
            onChange={onNotificationTypeChange}
          />
          <FollowingPostCommentInput
            meta={alarmNotificationSetting.detailed.commentFollowingPost}
            checked={alarmNotificationSetting.detailed.commentFollowingPost.web}
            onChange={onNotificationTypeChange}
          />
          <LikePostInput
            meta={alarmNotificationSetting.detailed.likePost}
            checked={alarmNotificationSetting.detailed.likePost.web}
            onChange={onNotificationTypeChange}
          />
          <LikeCommentInput
            meta={alarmNotificationSetting.detailed.likeComment}
            checked={alarmNotificationSetting.detailed.likeComment.web}
            onChange={onNotificationTypeChange}
          />
        </NotificationTypeInputWrapper>
      </CSSTransition>
    </>
  );
}
