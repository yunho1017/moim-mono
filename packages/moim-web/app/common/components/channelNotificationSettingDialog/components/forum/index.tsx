import * as React from "react";
import { CSSTransition } from "react-transition-group";
import PushNotificationSettingForm from "./components/pushNotificationSettingForm";
import NotActivatedSettingForm from "./components/notActivatedSettingForm";
import ChannelNotificationForm from "./components/channelNotificationForm";

interface IProps {
  notificationSetting: Moim.User.INotificationDefaultSet;
  onChange(settingParcel: Moim.User.IPartialNotificationDefaultSet): void;
}

export default function ForumNotificationSetting({
  notificationSetting,
  onChange,
}: IProps) {
  const handleChannelNotificationChange = React.useCallback(
    (option: boolean) => {
      onChange({ isFollowSet: option });
    },
    [onChange],
  );
  return (
    <>
      <ChannelNotificationForm
        checked={Boolean(notificationSetting.isFollowSet)}
        onChange={handleChannelNotificationChange}
      />
      <CSSTransition
        in={Boolean(notificationSetting.isFollowSet)}
        timeout={300}
        classNames="bodyAnim"
        unmountOnExit={true}
      >
        <div>
          <PushNotificationSettingForm
            notificationSetting={notificationSetting}
            onChange={onChange}
          />
          <NotActivatedSettingForm
            notificationSetting={notificationSetting}
            onChange={onChange}
          />
        </div>
      </CSSTransition>
    </>
  );
}
