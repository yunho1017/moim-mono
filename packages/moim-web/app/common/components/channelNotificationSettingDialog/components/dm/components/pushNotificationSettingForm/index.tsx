import * as React from "react";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import {
  NotiNothingInput,
  NotiOffInput,
  NotiOnInput,
} from "../../../common/pushNotificationSettingForm";

import { useIntl } from "react-intl";
import { useNotificationStatus } from "common/components/channelNotificationSettingDialog/hooks";

interface IProps {
  notificationSetting: Moim.User.INotificationDefaultSet;
  onChange(settingParcel: Moim.User.IPartialNotificationDefaultSet): void;
}

function PushNotificationSettingForm({
  notificationSetting,
  onChange,
}: IProps) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "notification_settings/push_notification_title",
  });
  const { status, handleChangeStatus } = useNotificationStatus(
    notificationSetting,
    onChange,
  );

  return (
    <SettingCell title={title}>
      <NotiOffInput status={status} onChange={handleChangeStatus} />
      <NotiNothingInput status={status} onChange={handleChangeStatus} />
      <NotiOnInput status={status} onChange={handleChangeStatus} />
    </SettingCell>
  );
}

export default PushNotificationSettingForm;
