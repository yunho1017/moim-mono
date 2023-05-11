import * as React from "react";

const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "app/common/constants/storybook";
import LinkPreview from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Link Preview`, module)
  .add("Image", () => {
    const title = textKnob("Title", "크로스오버 32UL980 HDR TY...");
    const desc = textKnob(
      "Description",
      "크로스오버 32UL980 HDR TYPE-C 4K PREMIUM AS 후기 공유 드립니다....",
    );
    const image = textKnob(
      "Image",
      "https://media.vingle.net/images/ca_l/je0eekw193.jpg",
    );

    return (
      <LinkPreview
        readOnly={true}
        {...{
          url: textKnob("Url", "https://cafe.naver.com/fx8300/446789"),
          title: booleanKnob("Title visible", true) ? title : undefined,
          description: booleanKnob("Description visible", true)
            ? desc
            : undefined,
          image: booleanKnob("Image visible", true) ? image : undefined,
        }}
      />
    );
  })
  .add("Embed", () => (
    <LinkPreview
      readOnly={true}
      {...{
        url:
          "https://www.youtube.com/watch?v=Ao3XJ-UDdzI&list=RDAo3XJ-UDdzI&start_radio=1",
        title: "Clean Bandit - Mama (feat. Ellie Goulding) [Official Video]",
        description: `Download or stream now: https://atlanti.cr/Mama Taken from our new album "What Is Love?" - out now: http://atlanti.cr/WhatIsLove This is the official video f...`,
        embed: {
          width: 480,
          url: "https://www.youtube.com/embed/videoseries?list=RDAo3XJ-UDdzI",
          html:
            '<iframe width="480" height="270" src="https://www.youtube.com/embed/videoseries?list=RDAo3XJ-UDdzI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          height: 270,
        },
      }}
    />
  ));
