// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { useIntl } from "react-intl";
import { useEffectOnce } from "react-use";
import {
  useLocalVideo,
  useVideoInputs,
  useRemoteVideoTileState,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { DeviceType } from "amazon-chime-sdk-component-library-react/lib/types";
import { VideoInputDevice } from "amazon-chime-sdk-js";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import ControlBarButton from "../controlBarButton";
import { LIMIT_OF_MAX_VIDEO_CONNECTION } from "../..";
import VideoIcon from "../videoIcon";

interface IProps {
  config: Moim.Meeting.IMeetingConfig;
  hostConfig?: Partial<Moim.Meeting.IMeetingConfig>;
}

const isOptionActive = (
  meetingManagerDeviceId: VideoInputDevice | undefined,
  currentDeviceId: string,
): boolean => {
  if (currentDeviceId === "none" && meetingManagerDeviceId === undefined) {
    return true;
  }
  return currentDeviceId === meetingManagerDeviceId;
};

const VideoInputControl: React.FC<IProps> = ({ config, hostConfig }) => {
  const intl = useIntl();
  const { open: openSnackBar } = useSnackbar({
    text: intl.formatMessage({ id: "video_chat_screen_message_disable" }),
  });
  // const { open: openDeviceNotUseSnackBar } = useSnackbar({
  //   text: intl.formatMessage({ id: "video_input_device_not_use_message" }),
  // });
  const { open: openLimitOfVideoConnection } = useSnackbar({
    text: intl.formatMessage({ id: "toast_message_limit_of_video_connection" }),
  });

  const { devices, selectedDevice } = useVideoInputs();
  const { tiles: remoteVideoTiles } = useRemoteVideoTileState();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const meetingManager = useMeetingManager();

  const deviceName = React.useCallback(
    (device: DeviceType) => {
      switch (device.deviceId) {
        case "blue":
          return intl.formatMessage({
            id: "video_chat/screen/button_video_options_blue",
          });
        case "smpte":
          return intl.formatMessage({
            id: "video_chat/screen/button_video_options_SMPTE",
          });
        case "none":
          return intl.formatMessage({
            id: "video_chat/screen/button_video_options_none",
          });
        default:
          return device.label;
      }
    },
    [intl],
  );

  const dropdownOptions = React.useMemo(
    () =>
      devices.map(device => ({
        children: <span>{deviceName(device)}</span>,
        checked: isOptionActive(selectedDevice, device.deviceId),
        onClick: async () => meetingManager.startVideoInputDevice(device),
      })),
    [devices, deviceName, selectedDevice, meetingManager],
  );

  const hostDisabled = React.useMemo(() => {
    if (hostConfig && typeof hostConfig.enableVideo === "boolean") {
      return !hostConfig.enableVideo;
    }
    return config.enableVideo ? false : true;
  }, [config.enableVideo, hostConfig]);

  const handleClickEvent = React.useMemo(
    () => () => {
      if (config.enableVideo && !hostDisabled) {
        if (
          !isVideoEnabled &&
          remoteVideoTiles.length === LIMIT_OF_MAX_VIDEO_CONNECTION
        ) {
          openLimitOfVideoConnection();
        } else {
          toggleVideo();
        }
      } else {
        openSnackBar();
      }
    },
    [
      config.enableVideo,
      hostDisabled,
      isVideoEnabled,
      remoteVideoTiles.length,
      toggleVideo,
      openLimitOfVideoConnection,
      openSnackBar,
    ],
  );

  useEffectOnce(() => {
    if (!isVideoEnabled && !config.enableVideo) {
      toggleVideo();
    }
  });

  React.useEffect(() => {
    if (isVideoEnabled && hostConfig && hostConfig.enableVideo === false) {
      toggleVideo();
    }
  }, [config.enableVideo, hostConfig, isVideoEnabled, toggleVideo]);

  return (
    <ControlBarButton
      // NOTE: 커스텀 아이콘으로 교체해서 3가지 타입을 인지하도록 변경 필요.
      icon={
        <VideoIcon
          enabled={isVideoEnabled}
          hostDisabled={hostDisabled}
          colorSwitch="white"
        />
      }
      onClick={handleClickEvent}
      label={intl.formatMessage({
        id: isVideoEnabled
          ? "video_chat/screen/button_video_off"
          : "video_chat/screen/button_video_on",
      })}
      options={dropdownOptions}
    />
  );
};

export default VideoInputControl;
