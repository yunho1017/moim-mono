// vendor
import * as React from "react";
// component
import ChannelItem from "..";
import { CommonBadge } from "common/components/alertBadge";
import { LinkIcon, PrivateIcon } from "../styled";
import { mountWithThemeAndStoreAndRouter } from "app/__tests__/intlEnzymeTestHelper";
// helper
import { MAX_UNREAD_COUNT } from "../hooks/props";
import { MOCK_SIMPLE_CHANNEL, RAW } from "app/__mocks__";
import { initialState } from "app/rootReducer";

describe("Channel Item Component", () => {
  describe("when click channel item", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it("should invoke onClickChannel function", () => {});
  });

  describe("when private channel", () => {
    it("should render private icon", () => {
      const wrapper = mountWithThemeAndStoreAndRouter(
        <ChannelItem
          channelId={MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id}
          isMuted={false}
          onClickChannel={jest.fn()}
          onInViewChange={jest.fn()}
        />,
        {
          locale: "ko",
          initialState: {
            ...initialState,
            entities: {
              ...initialState.entities,
              channels: {
                ...initialState.entities.channels,
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]:
                  MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA,
              } as any,
              stats: {
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]: {
                  count: 0,
                  last_read: "M134",
                  has_new: false,
                  updated_at: 0,
                },
              },
            },
            permission: {
              ...initialState.permission,
              permission: {
                ...initialState.permission.permission,
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]: {
                  ACCESS: {
                    ...RAW.PERMISSIONS.data[0],
                    right: "ACCESS",
                    applied_type: "LIMITED",
                  },
                },
              },
            },
          },
        },
      );

      expect(wrapper.find(PrivateIcon)).toHaveLength(1);
    });
  });

  describe("when link channel", () => {
    it("should render link icon", () => {
      const wrapper = mountWithThemeAndStoreAndRouter(
        <ChannelItem
          channelId={MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id}
          isMuted={false}
          onClickChannel={jest.fn()}
          onInViewChange={jest.fn()}
        />,
        {
          locale: "ko",
          initialState: {
            ...initialState,
            entities: {
              ...initialState.entities,
              channels: {
                ...initialState.entities.channels,
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]:
                  MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA,
              } as any,
              stats: {
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]: {
                  count: 0,
                  last_read: "M134",
                  has_new: false,
                  updated_at: 0,
                },
              },
            },
          },
        },
      );

      expect(wrapper.find(LinkIcon)).toHaveLength(1);
    });

    it("should render private icon", () => {
      const wrapper = mountWithThemeAndStoreAndRouter(
        <ChannelItem
          channelId={MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id}
          isMuted={false}
          onClickChannel={jest.fn()}
          onInViewChange={jest.fn()}
        />,
        {
          locale: "ko",
          initialState: {
            ...initialState,
            entities: {
              ...initialState.entities,
              channels: {
                ...initialState.entities.channels,
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]:
                  MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA,
              } as any,
              stats: {
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]: {
                  count: 0,
                  last_read: "M134",
                  has_new: false,
                  updated_at: 0,
                },
              },
            },
          },
        },
      );

      expect(wrapper.find(LinkIcon)).toHaveLength(1);
    });
  });

  describe("when forum channel", () => {
    it("should unread count include + string", () => {
      const wrapper = mountWithThemeAndStoreAndRouter(
        <ChannelItem
          channelId={MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id}
          isMuted={false}
          onClickChannel={jest.fn()}
          onInViewChange={jest.fn()}
        />,
        {
          locale: "ko",
          initialState: {
            ...initialState,
            entities: {
              ...initialState.entities,
              channels: {
                ...initialState.entities.channels,
                [MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id]:
                  MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
              },
              stats: {
                [MOCK_SIMPLE_CHANNEL.LINK_MOCK_DATA.id]: {
                  count: 0,
                  last_read: "M134",
                  has_new: false,
                  updated_at: 0,
                },
              },
            },
          },
        },
      );

      expect(wrapper.find(LinkIcon)).toHaveLength(0);
    });
  });

  describe("when unread state", () => {
    let unreadCount: number;

    it("should item has unread count", () => {
      unreadCount = 8;

      const wrapper = mountWithThemeAndStoreAndRouter(
        <ChannelItem
          channelId={MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id}
          isMuted={false}
          onClickChannel={jest.fn()}
          onInViewChange={jest.fn()}
        />,
        {
          locale: "ko",
          initialState: {
            ...initialState,
            entities: {
              ...initialState.entities,
              channels: {
                [MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id]: {
                  ...MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
                },
              },
              stats: {
                [MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id]: {
                  count: unreadCount,
                  last_read: "M134",
                  has_new: false,
                  updated_at: 0,
                },
              },
            },
          },
        },
      );

      expect(wrapper.find(CommonBadge).text()).toEqual(unreadCount.toString());
    });

    describe("when unread count is over then MAX_UNREAD_COUNT", () => {
      it("should unread count include + string", () => {
        unreadCount = MAX_UNREAD_COUNT + 1;

        const wrapper = mountWithThemeAndStoreAndRouter(
          <ChannelItem
            channelId={MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id}
            isMuted={false}
            onClickChannel={jest.fn()}
            onInViewChange={jest.fn()}
          />,
          {
            locale: "ko",
            initialState: {
              ...initialState,
              entities: {
                ...initialState.entities,
                channels: {
                  [MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id]: {
                    ...MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA,
                  },
                },
                stats: {
                  [MOCK_SIMPLE_CHANNEL.FORUM_MOCK_DATA.id]: {
                    count: unreadCount,
                    last_read: "M134",
                    has_new: false,
                    updated_at: 0,
                  },
                },
              },
            },
          },
        );

        expect(wrapper.find(CommonBadge).text()).toEqual(
          `${MAX_UNREAD_COUNT}+`,
        );
      });
    });
  });
});
