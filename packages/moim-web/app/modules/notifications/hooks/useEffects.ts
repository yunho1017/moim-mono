import * as React from "react";

import { IHookProps, IHookHandlers } from "./";
import { NotificationType } from "app/enums";

export function useEffects(
  _hookProps: IHookProps,
  hookHandlers: IHookHandlers,
) {
  const { handleGetNotifications } = hookHandlers;

  React.useEffect(() => {
    handleGetNotifications(NotificationType.ALL);
    handleGetNotifications(NotificationType.MENTION);
  }, [handleGetNotifications]);
}
