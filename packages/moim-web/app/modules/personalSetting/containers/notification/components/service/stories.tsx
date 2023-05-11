import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import NotificationSettingComponent from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Personal setting/components`,
  module,
).add("Notification", () => (
  <NotificationSettingComponent
    moimName="Moim이름!"
    notificationSetting={{
      alarmNotification: {
        allowed: { web: true, mobile: true, email: true },
        detailed: {
          appointment: { web: true, mobile: true, email: true },
          commentFollowingPost: { web: true, mobile: true, email: true },
          commentPost: { web: true, mobile: true, email: true },
          directMessage: { web: true, mobile: true, email: true },
          likeComment: { web: true, mobile: true, email: true },
          likePost: { web: true, mobile: true, email: true },
          mention: { web: true, mobile: true, email: true },
          newMessage: { web: true, mobile: true, email: true },
          newPost: { web: true, mobile: true, email: true },
          like1DepthProductThread: { web: true, mobile: true, email: true },
          new2DepthThread: { web: true, mobile: true, email: true },
          like2DepthProductThread: { web: true, mobile: true, email: true },
          new2DepthThreadOnFollowing: { web: true, mobile: true, email: true },
          mentionOn1DepthThread: { web: true, mobile: true, email: true },
          mentionOn2DepthThread: { web: true, mobile: true, email: true },
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
    }}
    onChangeGroupNotification={action("onChangeCommonNotification")}
  />
));
