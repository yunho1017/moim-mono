import * as React from "react";
import Push from "push.js";
import { useAlert } from "react-alert";
import { isiOS } from "common/helpers/browserDetect";
import {
  getVisibleFromLocalStorage,
  setVisibleFromLocalStorage,
} from "./helper";
import ALERT_COMMAND_MESSAGE from "common/components/alertTemplates/command";
import { notificationRequestOpen } from "common/components/alertTemplates";
import useCurrentUser from "common/hooks/useCurrentUser";

const NotificationRequestBanner = () => {
  const alert = useAlert();
  const currentUser = useCurrentUser();

  React.useLayoutEffect(() => {
    if (!isiOS() && !notificationRequestOpen && currentUser) {
      const visible =
        (Push.Permission.get() as NotificationPermission) === "default" &&
        getVisibleFromLocalStorage();

      if (visible) {
        alert.show(ALERT_COMMAND_MESSAGE.NOTIFICATION_REQUEST, {
          timeout: 0,
        });
      }
      setVisibleFromLocalStorage(visible ?? true);
    }
  }, [alert, currentUser]);
};

export default NotificationRequestBanner;
