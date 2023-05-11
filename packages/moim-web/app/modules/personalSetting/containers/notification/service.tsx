import * as React from "react";

import NotificationSettingComponent from "./components/service";
import { IProps, useProps, useHandlers } from "./useHooks";

const NotificationContainer: React.FC<IProps> = props => {
  const {
    currentMoim,
    handleGroupNotificationChange,
    notificationSetting,
  } = useHandlers(useProps(props));
  if (!notificationSetting) {
    return null;
  }

  return (
    <NotificationSettingComponent
      notificationSetting={notificationSetting}
      moimName={currentMoim?.name || ""}
      onChangeGroupNotification={handleGroupNotificationChange}
    />
  );
};

export default NotificationContainer;
