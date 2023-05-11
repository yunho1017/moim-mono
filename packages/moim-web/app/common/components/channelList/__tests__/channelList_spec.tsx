// vendor
import * as React from "react";
import { shallow } from "enzyme";
// component
import ChannelList from "../";
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

describe("ChannelList Component", () => {
  describe("when inject default props", () => {
    it("should render successfully", () => {
      const wrapper = shallow(
        <ChannelList
          categoryName={"Category"}
          channelList={MOCK_DATA}
          collapsed={false}
          useCollapse={true}
          showChannelAddButton={true}
          onClickChannelItem={jest.fn()}
          onClickCategoryName={jest.fn()}
          onInViewChange={jest.fn()}
        />,
      );

      expect(wrapper.length).toEqual(1);
    });
  });
});
