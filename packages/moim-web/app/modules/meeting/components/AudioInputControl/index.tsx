// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { useIntl } from "react-intl";
import { useEffectOnce } from "react-use";
import {
  useMeetingManager,
  useAudioInputs,
  useToggleLocalMute,
} from "amazon-chime-sdk-component-library-react";
import { AudioInputDevice } from "amazon-chime-sdk-js";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import Microphone from "app/modules/meeting/components/micVolumeIndicator/mic";
import ControlBarButton from "../controlBarButton";

interface IProps {
  config: Moim.Meeting.IMeetingConfig;
  hostConfig?: Partial<Moim.Meeting.IMeetingConfig>;
}

const isOptionActive = (
  meetingManagerDeviceId: AudioInputDevice | undefined,
  currentDeviceId: string,
): boolean => {
  if (currentDeviceId === "none" && meetingManagerDeviceId === undefined) {
    return true;
  }
  return currentDeviceId === meetingManagerDeviceId;
};

const AudioInputControl: React.FC<IProps> = ({ config, hostConfig }) => {
  const intl = useIntl();
  const { open: openSnackBar } = useSnackbar({
    text: intl.formatMessage({ id: "video_chat_screen_message_disable" }),
  });
  // const { open: openDeviceNotUseSnackBar } = useSnackbar({
  //   text: intl.formatMessage({ id: "audio_input_device_not_use_message" }),
  // });
  const meetingManager = useMeetingManager();
  const { muted, toggleMute } = useToggleLocalMute();
  const { devices, selectedDevice } = useAudioInputs();

  const options = React.useMemo(
    () =>
      devices.map(device => ({
        children: (
          <span>
            {device.label === "None"
              ? intl.formatMessage({
                  id: "video_chat/screen/button_video_options_none",
                })
              : device.label}
          </span>
        ),
        checked: isOptionActive(selectedDevice, device.deviceId),
        onClick: async () => meetingManager.startAudioInputDevice(device),
      })),
    [devices, intl, meetingManager, selectedDevice],
  );

  const hostMuted = React.useMemo(() => {
    if (hostConfig && typeof hostConfig.enableMic === "boolean") {
      return !hostConfig.enableMic;
    }
    return config.enableMic ? false : true;
  }, [config.enableMic, hostConfig]);

  const handleClickEvent = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () =>
      config.enableMic && !hostMuted
        ? toggleMute
        : () => {
            openSnackBar();
          },
    [config.enableMic, openSnackBar, hostMuted, toggleMute],
  );

  useEffectOnce(() => {
    if (!muted && !config.enableMic) {
      toggleMute();
    }
  });

  return (
    <ControlBarButton
      icon={
        <Microphone
          muted={muted}
          hostMuted={hostMuted}
          iconColorSwitch="white"
        />
      }
      onClick={handleClickEvent}
      label={intl.formatMessage({
        id: muted
          ? "video_chat/screen/button_unmute"
          : "video_chat/screen/button_mute",
      })}
      options={options}
    />
  );
};

export default AudioInputControl;
