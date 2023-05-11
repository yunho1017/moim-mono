import * as React from "react";
import { SwitchInputTemplate, ISwitchInputProps } from "../styled";

export const EmailNotificationInput: React.FC<ISwitchInputProps> = ({
  checked,
  onChange,
}) => (
  <SwitchInputTemplate
    key="notification_settings/email_notification_option"
    titleKey="notification_settings/email_notification_option"
    checked={checked}
    onChange={onChange}
  />
);
