import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useActions, useStoreState } from "app/store";
import { updateMyProfile } from "app/actions/me";
import { doMute as doMuteAction } from "app/actions/notification";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";

export type IProps = RouteComponentProps;

export function useProps(props: IProps) {
  const currentUser = useCurrentUser();
  const cancelToken = useCancelToken();
  const currentMoim = useCurrentGroup();
  const storeState = useStoreState(state => ({
    ...state.profileEditorPage,
  }));
  const action = useActions({
    putUserData: updateMyProfile,
    doMute: doMuteAction,
  });

  const notificationSetting:
    | Moim.User.INotificationDefaultSet
    | undefined = React.useMemo(
    () => currentUser?.config.notification.defaultSet,
    [currentUser],
  );

  const privacySetting:
    | Moim.User.INotificationConfig
    | undefined = React.useMemo(() => currentUser?.config, [currentUser]);

  return {
    ...props,
    ...storeState,
    ...action,
    cancelToken,
    currentMoim,
    currentUser,
    notificationSetting,
    privacySetting,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    currentUser,
    cancelToken,
    doMute,
    putUserData,
    isUpdateLoading,
  } = props;

  const handleGroupNotificationChange = React.useCallback(
    (settingParcel: Moim.User.IPartialNotificationDefaultSet) => {
      if (
        Boolean(settingParcel.alarmNotification?.allowed) === false &&
        settingParcel.creatingNotification?.allowed === false
      ) {
        doMute();
      }
      if (!isUpdateLoading) {
        putUserData(
          {
            config: {
              ...currentUser?.config,
              notification: {
                channelSet: {},
                defaultSet: settingParcel,
              },
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [currentUser?.config, cancelToken, doMute, isUpdateLoading, putUserData],
  );

  return {
    ...props,
    handleGroupNotificationChange,
  };
}
