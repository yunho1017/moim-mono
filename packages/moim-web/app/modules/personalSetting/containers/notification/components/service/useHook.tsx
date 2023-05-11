import * as React from "react";
import Push from "push.js";
import { useStoreState } from "app/store";

export interface IProps {
  notificationSetting: Moim.User.INotificationDefaultSet;
  moimName: string;
  onChangeGroupNotification(
    settingParcel: Moim.User.IPartialNotificationDefaultSet,
  ): void;
}

export function useProps(props: IProps) {
  const isDenied = Push.Permission.get() !== Push.Permission.GRANTED;
  const { hasEmail } = useStoreState(state => ({
    hasEmail: state.app.currentUserId
      ? Boolean(state.entities.users[state.app.currentUserId]?.email)
      : false,
  }));
  const notiSupport = Boolean(window.Notification);
  const status: Moim.NotificationStatusType = React.useMemo(() => {
    if (
      props.notificationSetting.alarmNotification.allowed.web &&
      props.notificationSetting.creatingNotification.allowed
    ) {
      return "enable";
    } else if (props.notificationSetting.creatingNotification.allowed) {
      return "nothing";
    } else {
      return "mute";
    }
  }, [
    props.notificationSetting.alarmNotification.allowed.web,
    props.notificationSetting.creatingNotification.allowed,
  ]);
  return {
    ...props,
    hasEmail,
    isDenied,
    notiSupport,
    status,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const { onChangeGroupNotification } = props;

  const handleNotificationDetailChange = React.useCallback(
    (
      setting: Partial<
        Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
      >,
    ) => {
      const detailed = Object.keys(setting).reduce<
        Partial<
          Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
        >
      >(
        (
          result,
          current: keyof Moim.INotificationDetailSetting<
            Partial<Moim.NotificationEnabled>
          >,
        ) => {
          result[current] = {
            ...setting[current],
            email: setting[current]?.web,
          };

          return result;
        },
        {},
      );

      onChangeGroupNotification({
        alarmNotification: {
          detailed,
        },
      });
    },
    [onChangeGroupNotification],
  );

  const handleChangeStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        const status = e.currentTarget.value as Moim.NotificationStatusType;

        const alarmAllowed = status === "enable";
        const createNotificationAllowed =
          status === "enable" || status === "nothing";
        onChangeGroupNotification({
          alarmNotification: {
            allowed: {
              web: alarmAllowed,
            },
          },
          creatingNotification: {
            allowed: createNotificationAllowed,
          },
        });
      }
    },
    [onChangeGroupNotification],
  );

  const handleChangeEmail = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;

      onChangeGroupNotification({
        alarmNotification: {
          allowed: {
            email: checked,
          },
        },
      });
    },
    [onChangeGroupNotification],
  );

  return {
    ...props,
    handleChangeStatus,
    handleChangeEmail,
    handleNotificationDetailChange,
  };
}
