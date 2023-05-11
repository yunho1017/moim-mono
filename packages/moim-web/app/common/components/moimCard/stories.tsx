import * as React from "react";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  boolean: booleanKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import MoimCard from ".";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 340px;
  height: 271px;
`;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 2);
endDate.setDate(endDate.getDate() - 1);

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/moimCard`, module)
  .add("Default", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name Moim name Moim name Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels`}
      />
    </CardWrapper>
  ))
  .add("short title", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels`}
      />
    </CardWrapper>
  ))
  .add("with Tag", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name Moim name Moim name Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels`}
        tags={[
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
        ]}
      />
    </CardWrapper>
  ))
  .add("with long Tag", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name Moim name Moim name Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an update here - I have went through and archived some channels`}
        tags={[
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname tagname tagname tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
          { name: "tagname" } as Moim.Tag.ITag,
        ]}
      />
    </CardWrapper>
  ))
  .add("with domain", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name Moim name Moim name Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an`}
        tags={[]}
        domain="vake"
      />
    </CardWrapper>
  ))
  .add("with period", () => (
    <CardWrapper>
      <MoimCard
        moimId="M12345"
        url="https://test.moim.co"
        isJoined={booleanKnob("IsJoined", false)}
        title={textKnob("Name", "Moim name Moim name Moim name Moim name")}
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
        memberCount={numberKnob("MemberCount", 123456)}
        description={`Hey there! Just posting an`}
        tags={[]}
        domain="vake"
        period={{
          startTime: startDate.getTime(),
          endTime: endDate.getTime(),
        }}
        status="activated"
        statusConfig={{
          type: "withPeriod",
        }}
      />
    </CardWrapper>
  ));
