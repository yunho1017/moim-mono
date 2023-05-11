// vendor
import * as React from "react";
import styled from "styled-components";

const { storiesOf } = require("@storybook/react");
const { actions } = require("@storybook/addon-actions");

import ChannelItem from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { MOCK_SIMPLE_CHANNEL } from "app/__mocks__";

const MOCK_DATA = {
  chat: MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  forum: MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
  link: MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA,
};

const Wrapper = styled.div`
  width: 320px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Channel Item`, module)
  .add("Default", () => (
    <Wrapper>
      <ChannelItem
        channelId={MOCK_DATA.chat.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
      <ChannelItem
        channelId={MOCK_DATA.forum.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />

      <ChannelItem
        channelId={MOCK_DATA.link.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
      <ChannelItem
        channelId={MOCK_DATA.chat.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
    </Wrapper>
  ))
  .add("Unread", () => (
    <Wrapper>
      <ChannelItem
        channelId={MOCK_DATA.chat.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
    </Wrapper>
  ))
  .add("Muted", () => (
    <Wrapper>
      <ChannelItem
        channelId={MOCK_DATA.chat.id}
        isMuted={true}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
    </Wrapper>
  ))
  .add("Max Unread Count", () => (
    <Wrapper>
      <ChannelItem
        channelId={MOCK_DATA.chat.id}
        isMuted={false}
        onClickChannel={actions("onClickChannel")}
        onInViewChange={actions("onInViewChange")}
      />
    </Wrapper>
  ));
