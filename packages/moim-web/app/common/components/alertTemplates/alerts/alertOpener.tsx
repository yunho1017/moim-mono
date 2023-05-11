import * as React from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";
import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "app/actions/snackbar";
import GlobalSnackbar from "./globalSnackbar";
import useReconnectGRPCSnackBar from "./reconnectGRPCSnackBar/useSnackBar";
import useNotificationRequestBanner from "./notificationRequest/useBanner";
import { DEFAULT_TIMEOUT } from "./globalSnackbar/useGlobalSnackbar";

export default function GlobalSnackbarOpener() {
  const intl = useIntl();
  const { show } = useAlert();
  const { snackbarList } = useStoreState(state => ({
    snackbarList: state.snackbar.snackbarList,
  }));
  const { dispatchClearSnackbar } = useActions({
    dispatchClearSnackbar: ActionCreators.clearSnackbar,
  });

  useReconnectGRPCSnackBar();
  useNotificationRequestBanner();

  React.useEffect(() => {
    if (snackbarList.length > 0) {
      const _snackbarList = [...snackbarList];
      dispatchClearSnackbar(_snackbarList.map(sb => sb.id));
      _snackbarList.forEach(sb => {
        show(
          <GlobalSnackbar
            text={sb.textKey ? intl.formatMessage({ id: sb.textKey }) : sb.text}
            textElement={sb.textElement}
            type={sb.type}
            leftIcon={sb.leftIcon}
            rightIcon={sb.rightIcon}
            rightSecondIcon={sb.rightSecondIcon}
            onClick={sb.onClick}
          />,
          { timeout: sb.timeout ?? DEFAULT_TIMEOUT },
        );
      });
    }
  }, [snackbarList]);

  return null;
}
