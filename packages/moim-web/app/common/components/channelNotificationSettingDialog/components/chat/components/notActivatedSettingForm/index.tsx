import * as React from "react";
import { useIntl } from "react-intl";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import { EmailNotificationInput } from "../../../common/notActivatedSettingForm";

interface IProps {
  notificationSetting: Moim.User.INotificationDefaultSet;
  onChange(settingParcel: Moim.User.IPartialNotificationDefaultSet): void;
}

function NotActivatedSettingForm({ notificationSetting, onChange }: IProps) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "notification_settings/not_active_title",
  });
  const description = intl.formatMessage({
    id: "notification_settings/not_active_guide",
  });

  const handleChange = React.useCallback(
    (option: boolean) => {
      onChange({
        alarmNotification: {
          allowed: {
            email: option,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <SettingCell title={title} description={description} hasDivider={false}>
      <EmailNotificationInput
        checked={notificationSetting.alarmNotification.allowed.email}
        onChange={handleChange}
      />
    </SettingCell>
  );
}

export default NotActivatedSettingForm;
