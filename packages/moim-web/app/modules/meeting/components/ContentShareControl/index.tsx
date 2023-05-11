// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  ScreenShare,
  useContentShareControls,
  useContentShareState,
} from "amazon-chime-sdk-component-library-react";
import React from "react";

import ControlBarButton from "../controlBarButton";

interface Props {
  label?: string;
  pauseLabel?: string;
  unpauseLabel?: string;
}

const ContentShareControl: React.FC<Props> = ({
  label = "Content",
  pauseLabel = "Pause",
  unpauseLabel = "Unpause",
}) => {
  const { isLocalUserSharing } = useContentShareState();
  const {
    paused,
    toggleContentShare,
    togglePauseContentShare,
  } = useContentShareControls();

  const dropdownOptions = [
    {
      children: <span>{paused ? unpauseLabel : pauseLabel}</span>,
      onClick: togglePauseContentShare,
    },
  ];

  return (
    <>
      <ControlBarButton
        icon={<ScreenShare />}
        onClick={toggleContentShare}
        label={label}
        options={isLocalUserSharing ? dropdownOptions : undefined}
      />
    </>
  );
};

export default ContentShareControl;
