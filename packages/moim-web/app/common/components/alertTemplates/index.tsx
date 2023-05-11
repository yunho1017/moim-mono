import * as React from "react";
import { AlertComponentPropsWithStyle } from "react-alert";
import { AlertContainer } from "./styled";
import ALERT_COMMAND_MESSAGE from "app/common/components/alertTemplates/command";
import NotificationRequestBanner from "./alerts/notificationRequest";
import ReconnectGRPCSnackBar from "./alerts/reconnectGRPCSnackBar";
import useIsMobile from "common/hooks/useIsMobile";

import "animate.css";

export let notificationRequestOpen = false;
export let reconnectGRPCSnackBarOpen = false;

const AlertTemplates: React.FC<AlertComponentPropsWithStyle> = ({
  style,
  // options,
  message,
  close,
}) => {
  const isMobile = useIsMobile();
  const handleClose = React.useCallback(() => {
    switch (message) {
      case ALERT_COMMAND_MESSAGE.NOTIFICATION_REQUEST: {
        notificationRequestOpen = false;
        break;
      }

      case ALERT_COMMAND_MESSAGE.RECONNECT_GRPC: {
        reconnectGRPCSnackBarOpen = false;
        break;
      }
      default: {
        break;
      }
    }
    close();
  }, [close, message]);

  const content = React.useMemo(() => {
    switch (message) {
      case ALERT_COMMAND_MESSAGE.NOTIFICATION_REQUEST: {
        notificationRequestOpen = true;
        return <NotificationRequestBanner onClose={handleClose} />;
      }

      case ALERT_COMMAND_MESSAGE.RECONNECT_GRPC: {
        notificationRequestOpen = true;
        return <ReconnectGRPCSnackBar onClose={handleClose} />;
      }

      default: {
        return message;
      }
    }
  }, [handleClose, message]);

  return (
    <AlertContainer
      style={style}
      className={isMobile ? "animate__slideInDown" : "animate__slideInLeft"}
    >
      {/* {options.type === "info" && "!"}
      {options.type === "success" && ":)"}
      {options.type === "error" && ":("} */}
      {content}
      {/* <button onClick={close}>X</button> */}
    </AlertContainer>
  );
};

export default AlertTemplates;
