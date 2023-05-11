import * as React from "react";
import styled from "styled-components";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import ChannelList from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { MOCK_SIMPLE_CHANNEL } from "app/__mocks__";

const MOCK_DATA: Exclude<
  Moim.Channel.SimpleChannelType,
  { type: "category" }
>[] = [
  MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.CHAT_MOCK_DATA,
  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
];

const Wrapper = styled.div`
  width: 320px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Channel List`, module)
  .add("Default", () => (
    <Wrapper>
      <ChannelList
        channelList={MOCK_DATA}
        categoryName={
          "Vingle TeamVingle TeamVingle TeamVingle TeamVingle TeamVingle Team"
        }
        onClickCategoryName={action("onClickCategoryName")}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
        useCollapse={true}
        collapsed={false}
        showChannelAddButton={true}
      />
    </Wrapper>
  ))
  .add("multiple", () => (
    <Wrapper>
      <ChannelList
        channelList={MOCK_DATA}
        categoryName={"Vingle Team"}
        onClickCategoryName={action("onClickCategoryName")}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
        useCollapse={true}
        collapsed={false}
        showChannelAddButton={true}
      />
      <ChannelList
        channelList={MOCK_DATA}
        categoryName={"Vingle Team"}
        onClickCategoryName={action("onClickCategoryName")}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
        useCollapse={true}
        collapsed={false}
        showChannelAddButton={true}
      />
    </Wrapper>
  ))
  .add("Uncategorized", () => (
    <Wrapper>
      <ChannelList
        channelList={MOCK_DATA}
        useCollapse={true}
        collapsed={false}
        showChannelAddButton={true}
        onClickCategoryName={action("onClickCategoryName")}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
      />
    </Wrapper>
  ))
  .add("No Working Collapsed", () => (
    <Wrapper>
      <ChannelList
        channelList={MOCK_DATA}
        categoryName={"Vingle Team"}
        useCollapse={false}
        showChannelAddButton={true}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
      />
    </Wrapper>
  ))
  .add("No Channel Add Button", () => (
    <Wrapper>
      <ChannelList
        channelList={MOCK_DATA}
        categoryName={"Vingle Team"}
        useCollapse={true}
        showChannelAddButton={false}
        onClickChannelItem={action("onClickChannelItem")}
        onInViewChange={action("onInViewChange")}
        onClickCategoryName={action("onClickCategoryName")}
      />
    </Wrapper>
  ));
