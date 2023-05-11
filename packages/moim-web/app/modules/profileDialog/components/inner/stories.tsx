import * as React from "react";

const { storiesOf } = require("@storybook/react");
const { array: arrayKnob } = require("@storybook/addon-knobs");
const { action } = require("@storybook/addon-actions");

import ProfileDialogComponent from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { UserStatusTypes } from "app/enums";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile Dialog/components/inner`,
  module,
).add("Default", () => (
  <div style={{ width: "32rem", minHeight: "19rem" }}>
    <ProfileDialogComponent
      userId="U1234"
      cryptoBadges={arrayKnob("크립토배지", ["Moim"], ",")}
      isCryptoBadgeLoading={false}
      userData={{
        updated_at: 0,
        created_at: 0,
        group_id: "1234",
        hubUserId: "U1234",
        id: "U1234",
        name: "Genesis sam",
        bio: "Hello!",
        avatar_url:
          "tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia",
        tz: "Asia/Seoul",
        is_deactivated: false,
        is_bot: false,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s",
        positions: [],
        certifications: { data: [] },
        certificationStatus: {
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
            __typename: "PageInfo",
          },
          totalCount: 0,
        },
        encrypted_email: "",
        config: {
          blockDm: false,
          notification: {
            isFollowChannelSet: false,
            channelSet: {},
            defaultSet: {
              alarmNotification: {
                allowed: { web: true, mobile: true, email: true },
                detailed: {
                  appointment: { web: true, mobile: true, email: true },
                  commentFollowingPost: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                  commentPost: { web: true, mobile: true, email: true },
                  directMessage: { web: true, mobile: true, email: true },
                  likeComment: { web: true, mobile: true, email: true },
                  likePost: { web: true, mobile: true, email: true },
                  mention: { web: true, mobile: true, email: true },
                  newMessage: { web: true, mobile: true, email: true },
                  newPost: { web: true, mobile: true, email: true },
                  like1DepthProductThread: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                  new2DepthThread: { web: true, mobile: true, email: true },
                  like2DepthProductThread: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                  new2DepthThreadOnFollowing: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                  mentionOn1DepthThread: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                  mentionOn2DepthThread: {
                    web: true,
                    mobile: true,
                    email: true,
                  },
                },
              },
              creatingNotification: {
                allowed: true,
                detailed: {
                  appointment: true,
                  commentFollowingPost: true,
                  commentPost: true,
                  directMessage: true,
                  likeComment: true,
                  likePost: true,
                  mention: true,
                  newMessage: true,
                  newPost: true,
                  like1DepthProductThread: true,
                  new2DepthThread: true,
                  like2DepthProductThread: true,
                  new2DepthThreadOnFollowing: true,
                  mentionOn1DepthThread: true,
                  mentionOn2DepthThread: true,
                },
              },
            },
          },
        },
        presence: "AWAY",
        status: UserStatusTypes.ACTIVE,
      }}
      onCloseRequest={action("onCloseRequest")}
      onChangeBodyResize={action("onChangeBodyResize")}
    />
  </div>
));
