import * as React from "react";
import { useActions } from "app/store";
import { ActionCreators } from "../action";
import useCurrentUser from "common/hooks/useCurrentUser";
import {
  NotiNothingIcon,
  NotiOffIcon,
  NotiOnIcon,
  NotiDefaultIcon,
} from "./styled";

export function useCurrentNotificationSetting(channelId: Moim.Id | null) {
  const currentUser = useCurrentUser();

  return React.useMemo(
    () =>
      currentUser?.config?.notification.channelSet?.[channelId || ""] ??
      currentUser?.config?.notification.defaultSet,
    [currentUser, channelId],
  );
}
export function useOpenChannelNotificationSettingDialog({
  type,
  channelId,
}: {
  type: Exclude<Moim.Channel.Type, "link" | "tag" | "subgroups" | "view">;
  channelId: Moim.Id;
}) {
  const { open } = useActions({ open: ActionCreators.open });

  return React.useCallback(() => {
    open({ type, channelId });
  }, [open, type, channelId]);
}
export function useCloseChannelNotificationSettingDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return React.useCallback(() => {
    close();
  }, [close]);
}

export function useNotificationStatus(
  notificationSetting: Moim.User.INotificationDefaultSet,
  onChange: (settingParcel: Moim.User.IPartialNotificationDefaultSet) => void,
) {
  const status: Moim.NotificationStatusType = React.useMemo(() => {
    if (
      notificationSetting.alarmNotification.allowed.web &&
      notificationSetting.creatingNotification.allowed
    ) {
      return "enable";
    } else if (notificationSetting.creatingNotification.allowed) {
      return "nothing";
    } else {
      return "mute";
    }
  }, [notificationSetting]);

  const handleChangeStatus = React.useCallback(
    (currentStatus: Moim.NotificationStatusType) => {
      const alarmAllowed = currentStatus === "enable";
      const createNotificationAllowed =
        currentStatus === "enable" || currentStatus === "nothing";

      onChange?.({
        alarmNotification: {
          allowed: {
            web: alarmAllowed,
          },
        },
        creatingNotification: {
          allowed: createNotificationAllowed,
        },
      });
    },
    [onChange],
  );

  return {
    status,
    handleChangeStatus,
  };
}

export function useHandleNotificationDetailChange(
  onChange: (settingParcel: Moim.User.IPartialNotificationDefaultSet) => void,
) {
  const handleNotificationTypeChange = React.useCallback(
    (
      setting: Partial<
        Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
      >,
    ) => {
      const syncFlag = Object.entries(setting).reduce<Record<string, boolean>>(
        (acc, config) => {
          if (config) {
            const [key, val] = config;
            if (val) {
              const st = Object.entries(val).reduce(
                (flag, [, status]) => flag || status,
                false,
              );
              acc = {
                ...acc,
                [key]: Boolean(st),
              };
            }
          }
          return acc;
        },
        {},
      );

      onChange({
        alarmNotification: {
          detailed: setting,
        },
        creatingNotification: {
          detailed: syncFlag,
        },
      });
    },
    [onChange],
  );
  return handleNotificationTypeChange;
}

export function useNotiIconWithStatus({
  channelId,
  size,
  handler,
}: {
  channelId: Moim.Id;
  size?: string;
  handler?: () => void;
}) {
  const notificationSetting = useCurrentNotificationSetting(channelId);
  const status: Moim.NotificationStatusType | undefined = React.useMemo(() => {
    if (!notificationSetting || !notificationSetting.isFollowSet) {
      return;
    }
    if (
      notificationSetting.alarmNotification.allowed.web &&
      notificationSetting.creatingNotification.allowed
    ) {
      return "enable";
    } else if (notificationSetting.creatingNotification.allowed) {
      return "nothing";
    } else {
      return "mute";
    }
  }, [notificationSetting]);
  return React.useMemo(() => {
    switch (status) {
      case "enable":
        return <NotiOnIcon size={size} onClick={handler} />;
      case "mute":
        return <NotiOffIcon size={size} onClick={handler} />;
      case "nothing":
        return <NotiNothingIcon size={size} onClick={handler} />;

      default:
        return <NotiDefaultIcon size={size} onClick={handler} />;
    }
  }, [status, size, handler]);
}
