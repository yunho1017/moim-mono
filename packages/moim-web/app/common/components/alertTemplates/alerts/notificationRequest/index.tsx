import * as React from "react";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { reRequestPermission } from "common/helpers/browserNotification";
import NotificationRequestComponent from "./component";
import { setVisibleFromLocalStorage } from "./helper";
import { ICommonAlertProps } from "../type";

const NotificationRequestBanner: React.FC<ICommonAlertProps> = ({
  onClose,
}) => {
  const currentMoim = useCurrentGroup();

  const handleDismissClick = React.useCallback(() => {
    onClose();
    setVisibleFromLocalStorage(false);
  }, [onClose]);

  const handleRequestClick = React.useCallback(() => {
    reRequestPermission(handleDismissClick, handleDismissClick);
  }, [handleDismissClick]);

  return (
    <NotificationRequestComponent
      moimName={currentMoim?.name || ""}
      onRequestClick={handleRequestClick}
      onDismissClick={handleDismissClick}
    />
  );
};

export default NotificationRequestBanner;
