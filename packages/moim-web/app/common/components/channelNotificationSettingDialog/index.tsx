import * as React from "react";
import { Inner } from "./styled";
import ChatSetting from "./components/chat";
import DMSetting from "./components/dm";
import ForumSetting from "./components/forum";

import { updateMyProfile } from "app/actions/me";
import { doMute as doMuteAction } from "app/actions/notification";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useCurrentNotificationSetting } from "./hooks";

export default function ChannelNotificationSetting() {
  const cancelToken = useCancelToken();
  const { isUpdateLoading, type, channelId } = useStoreState(state => ({
    isUpdateLoading: state.profileEditorPage.isUpdateLoading,
    type: state.channelNotificationSettingDialog.type,
    channelId: state.channelNotificationSettingDialog.channelId,
  }));
  const { putUserData, doMute } = useActions({
    putUserData: updateMyProfile,
    doMute: doMuteAction,
  });
  const notificationSetting = useCurrentNotificationSetting(channelId);
  const handleChange = React.useCallback(
    (settingParcel: Moim.User.IPartialNotificationDefaultSet) => {
      if (!channelId) {
        return;
      }
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
              notification: {
                channelSet: {
                  [channelId]: { ...notificationSetting, ...settingParcel },
                },
              },
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [
      notificationSetting,
      channelId,
      cancelToken,
      doMute,
      isUpdateLoading,
      putUserData,
    ],
  );

  const innerElement = React.useMemo(() => {
    if (!notificationSetting) {
      return null;
    }

    switch (type) {
      case "conversation":
        return (
          <ChatSetting
            notificationSetting={notificationSetting}
            onChange={handleChange}
          />
        );
      case "dm":
        return (
          <DMSetting
            notificationSetting={notificationSetting}
            onChange={handleChange}
          />
        );
      case "forum":
        return (
          <ForumSetting
            notificationSetting={notificationSetting}
            onChange={handleChange}
          />
        );
    }
  }, [notificationSetting, type, handleChange]);

  return <Inner>{innerElement}</Inner>;
}
