import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Normal } from "common/components/snackbar.new";
import { RetryIcon } from "./styled";

import {
  reconnectGRPC,
  ActionCreators as gRPCActionCreator,
} from "app/actions/gRPC";
import { useActions } from "app/store";
import { ICommonAlertProps } from "../type";

const ReconnectGRPCSnackBar: React.FC<ICommonAlertProps> = ({ onClose }) => {
  const { dispatchReconnectGRPC, close, resetReconnectDelay } = useActions({
    dispatchReconnectGRPC: reconnectGRPC,
    close: gRPCActionCreator.closeReconnectGRPCSnackBar,
    resetReconnectDelay: gRPCActionCreator.resetReconnectDelay,
  });

  const handleReconnect = React.useCallback(() => {
    dispatchReconnectGRPC();
    resetReconnectDelay();
    close();
    onClose();
  }, [onClose, close, dispatchReconnectGRPC, resetReconnectDelay]);

  return (
    <Normal.Snackbar
      textElement={<FormattedMessage id="connection_error/body" />}
      rightIcon={{
        component: <RetryIcon />,
        onClick: handleReconnect,
      }}
    />
  );
};

export default ReconnectGRPCSnackBar;
