import * as React from "react";
import {
  NotiOnInput as NotiOnInputBase,
  NotificationTypeInputWrapper,
  MentionInput,
  NewMessageInput,
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
          <NewMessageInput
            meta={alarmNotificationSetting.detailed.newMessage}
            checked={alarmNotificationSetting.detailed.newMessage.web}
            onChange={onNotificationTypeChange}
          />
        </NotificationTypeInputWrapper>
      </CSSTransition>
    </>
  );
}
