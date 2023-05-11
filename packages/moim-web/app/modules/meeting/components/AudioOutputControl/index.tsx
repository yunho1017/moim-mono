// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  useAudioOutputs,
  useLocalAudioOutput,
  useMeetingManager,
  Sound,
} from "amazon-chime-sdk-component-library-react";
import { DeviceType } from "amazon-chime-sdk-component-library-react/lib/types";

import ControlBarButton from "../controlBarButton";

const isOptionActive = (
  meetingManagerDeviceId: string | null,
  currentDeviceId: string,
): boolean => {
  if (currentDeviceId === "none" && meetingManagerDeviceId === null) {
    return true;
  }
  return currentDeviceId === meetingManagerDeviceId;
};

const supportsSetSinkId = (): boolean =>
  "setSinkId" in HTMLAudioElement.prototype;

interface Props {
  /** The label that will be shown for audio output speaker control, it defaults to `Speaker`. */
  label?: string;
}

const AudioOutputControl: React.FC<Props> = ({ label = "Speaker" }) => {
  const meetingManager = useMeetingManager();
  const { devices, selectedDevice } = useAudioOutputs();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput();
  // const { open: openDeviceNotUseSnackBar } = useSnackbar({
  //   text: intl.formatMessage({ id: "audio_output_device_not_use_message" }),
  // });
  const audioOutputOnClick = async (deviceId: string): Promise<void> => {
    if (supportsSetSinkId()) {
      await meetingManager.startAudioOutputDevice(deviceId);
    }
  };

  const dropdownOptions = devices.map((device: DeviceType) => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: async () => audioOutputOnClick(device.deviceId),
  }));

  return (
    <>
      <ControlBarButton
        icon={<Sound disabled={!isAudioOn} />}
        onClick={toggleAudio}
        label={label}
        options={dropdownOptions.length ? dropdownOptions : undefined}
      />
    </>
  );
};

export default AudioOutputControl;
