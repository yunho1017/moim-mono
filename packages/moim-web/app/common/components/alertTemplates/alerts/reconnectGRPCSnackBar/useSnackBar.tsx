import * as React from "react";
import { useAlert } from "react-alert";
import { useStoreState } from "app/store";
import ALERT_COMMAND_MESSAGE from "../../command";
import { reconnectGRPCSnackBarOpen } from "../..";

const useReconnectGRPCSnackBar = () => {
  const alert = useAlert();
  const { open } = useStoreState(storeState => ({
    open: storeState.gRPC.reconnectSnackBar.open,
  }));

  React.useEffect(() => {
    if (open && !reconnectGRPCSnackBarOpen) {
      alert.show(ALERT_COMMAND_MESSAGE.RECONNECT_GRPC, {
        timeout: 0,
      });
    }
  }, [open]);
};

export default useReconnectGRPCSnackBar;
