import * as React from "react";
import { AlertComponentProps, useAlert } from "react-alert";
import { FormattedMessage } from "react-intl";
import { getCloseIcon as _getCloseIcon } from "common/components/snackbar.new/presets/generator";

import GlobalSnackbar, { IProps } from "./";

export const DEFAULT_TIMEOUT = 2500;
const getCloseIcon = (
  alert: AlertComponentProps | undefined,
  remove: (_alert: AlertComponentProps) => void,
) => {
  const onClose = () => {
    if (alert) {
      remove(alert);
    }
  };
  return alert ? _getCloseIcon(onClose) : undefined;
};

export function useSnackbar({
  useCloseButton,
  timeout,
  ...option
}: IProps & { useCloseButton?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { remove, show } = useAlert();

  const [alert, setAlert] = React.useState<AlertComponentProps | undefined>();

  const handleClose = React.useCallback(
    (givenAlertCTX?: AlertComponentProps) => {
      const instance = givenAlertCTX ?? alert;
      if (instance) {
        remove(instance);

        setAlert(undefined);
      }
    },
    [remove, alert],
  );

  const handleOpen = React.useCallback(
    (params?: Pick<Moim.Snackbar.IPresetProps, "text" | "textElement">) => {
      // eslint-disable-next-line prefer-const
      let alertInst: AlertComponentProps | undefined;
      const { rightIcon, ...restOption } = option;

      const overrideRightClickHandler: React.MouseEventHandler<HTMLDivElement> = e => {
        option.rightIcon?.onClick?.(e);
        handleClose(alertInst);
      };

      // eslint-disable-next-line prefer-const
      alertInst = show(
        <GlobalSnackbar
          rightIcon={
            useCloseButton
              ? getCloseIcon(alertInst, remove)
              : rightIcon
              ? { ...rightIcon, onClick: overrideRightClickHandler }
              : undefined
          }
          {...restOption}
          {...params}
        />,
        { timeout: timeout === null ? undefined : timeout ?? DEFAULT_TIMEOUT },
      );
      setAlert(alertInst);
    },
    [show, useCloseButton, remove, handleClose, option, timeout],
  );

  return {
    open: handleOpen,
    close: handleClose,
  };
}

export function useMessageSnackbar(messageKey: string) {
  return useSnackbar({
    type: "normal",
    textElement: <FormattedMessage id={messageKey} />,
  });
}
