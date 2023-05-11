import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { boolean: booleanKnob } = require("@storybook/addon-knobs");

import RosterCell from ".";
import MicrophoneActivity from "../microphoneActivity";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Meeting/Components`,
  module,
).add("RosterCell", () => {
  return (
    <RosterCell
      isHost={booleanKnob("isHost", true)}
      name="NAME"
      videoEnabled={booleanKnob("videEnable", true)}
      microphone={
        <MicrophoneActivity
          attendeeId="test"
          hostMuted={booleanKnob("hostMuted", false)}
        />
      }
      hostDisabledVideo={booleanKnob("hostDisabledVideo", false)}
      isMine={false}
      menuTexts={{
        toggleMic: "마이크 전환",
        toggleVideo: "비디오 전환",
        makeHost: "호스트 위임",
        pinVideo: "비디오 고정",
      }}
      onClickMenuToggleMic={action("toggle_mic")}
      onClickMenuToggleVideo={action("toggle_video")}
      onClickMenuMakeHost={action("mek_host")}
    />
  );
});
