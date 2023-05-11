import * as React from "react";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import CoverPage from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/CoverPage`, module)
  .add("Color Banner", () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CoverPage
        onClose={action("onClose")}
        name={textKnob("Name", "Moim name")}
        profileImage={{
          type: "image",
          data: {
            url:
              "https://pbs.twimg.com/profile_images/1179797391093817345/3sv7tw1L_400x400.jpg",
          },
        }}
        banner={{
          type: "color",
          data: {
            color: "#FF7100",
          },
        }}
        domain={textKnob("Domain", "moimname.vingle.group")}
        url={textKnob("Custom URL(Domain)", "moinname.custom.domain")}
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels and combined`}
        buttons={[
          {
            text: "Button",
            disabled: true,
            active: false,
            onClick: action("NormalButtonClick"),
          },
          {
            text: "Button",
            active: true,
            onClick: action("ActiveButtonClick"),
          },
        ]}
        moreMenu={[
          {
            text: "Menu 1",
            onClick: action("moreMenuMenu1"),
          },
          {
            text: "Menu 2",
            onClick: action("moreMenuMenu2"),
          },
        ]}
      />
    </div>
  ))
  .add("Image Banner", () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CoverPage
        onClose={action("onClose")}
        name={textKnob("Name", "Moim name")}
        profileImage={{
          type: "image",
          data: {
            url:
              "https://pbs.twimg.com/profile_images/1179797391093817345/3sv7tw1L_400x400.jpg",
          },
        }}
        banner={{
          type: "image",
          data: {
            url: "https://media.vingle.net/images/co_d_xl/bil824yw69.jpg",
          },
        }}
        domain={textKnob("Domain", "moimname.vingle.group")}
        url={textKnob("Custom URL(Domain)", "moimname.custom.domain")}
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels and combined`}
        buttons={[
          {
            text: "Button",
            disabled: true,
            active: false,
            onClick: action("NormalButtonClick"),
          },
          {
            text: "Button",
            active: true,
            onClick: action("ActiveButtonClick"),
          },
        ]}
        moreMenu={[
          {
            text: "Menu 1",
            onClick: action("moreMenuMenu1"),
          },
          {
            text: "Menu 2",
            onClick: action("moreMenuMenu2"),
          },
        ]}
      />
    </div>
  ));
