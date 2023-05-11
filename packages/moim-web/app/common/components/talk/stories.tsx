import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { MessageItem, MessageGroup } from ".";
import { px2rem } from "common/helpers/rem";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { RAW } from "app/__mocks__";

function TalkTemplate({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: 350,
        margin: "0 auto",
        padding: `${px2rem(50)} 0`,
        ...styles,
      }}
    >
      <style>{"body{ background-color: #fff }"}</style>
      {children}
    </div>
  );
}

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Talk/Message`, module)
  .add("Item/Normal", () => (
    <TalkTemplate>
      <MessageItem
        channelId="C123"
        message={RAW.MESSAGE}
        mode="normal"
        onLike={action("onLike")}
        onDelete={action("onDelete")}
        onReport={action("onReport")}
        onRetry={action("onRetry")}
      />
    </TalkTemplate>
  ))
  .add("Group/Normal", () => (
    <TalkTemplate>
      <MessageGroup
        channelId="C123"
        messageGroupList={[
          {
            user: { ...RAW.MESSAGE.user, id: "UEBYQRH0S" },
            created_at: RAW.MESSAGE.created_at,
            messages: [RAW.MESSAGE, RAW.MESSAGE],
          },
          {
            user: { ...RAW.MESSAGE.user, id: "UEBYQRH0S" },
            created_at: RAW.MESSAGE.created_at,
            messages: [RAW.MESSAGE, RAW.MESSAGE, RAW.MESSAGE],
          },
        ]}
        onLike={action("onLike")}
        onDelete={action("onDelete")}
        onReport={action("onReport")}
        onRetry={action("onRetry")}
      />
    </TalkTemplate>
  ))
  .add("Group/isMine", () => (
    <TalkTemplate>
      <MessageGroup
        channelId="C123"
        messageGroupList={[
          {
            user: RAW.MESSAGE.user,
            created_at: RAW.MESSAGE.created_at,
            messages: [RAW.MESSAGE, RAW.MESSAGE],
          },
          {
            user: RAW.MESSAGE.user,
            created_at: RAW.MESSAGE.created_at,
            messages: [RAW.MESSAGE, RAW.MESSAGE, RAW.MESSAGE],
          },
        ]}
        onLike={action("onLike")}
        onDelete={action("onDelete")}
        onReport={action("onReport")}
        onRetry={action("onRetry")}
      />
    </TalkTemplate>
  ));
