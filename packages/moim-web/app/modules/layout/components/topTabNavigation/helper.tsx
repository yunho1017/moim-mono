import React from "react";
import { Link } from "react-router-dom";
import getChannelUrl from "common/helpers/getChannelUrl";
import { ItemSkeleton } from "./mobile/styled";
import { px2rem } from "common/helpers/rem";

export interface ChannelLinkType {
  type: Moim.Channel.Type | "category";
  id: string;
  url?: string;
}

export function LinkController({
  channel,
  children,
}: React.PropsWithChildren<{
  channel?: ChannelLinkType;
}>) {
  if (!channel || channel.type === "category") return <>{children}</>;

  return React.createElement(
    Link,
    {
      to: getChannelUrl({
        type: channel.type,
        id: channel.id,
      }),
    },

    children,
  );
}

export function TabMenuSkeleton(count: number) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <ItemSkeleton
        key={`mobile_Top_Tab_skeleton_${idx}`}
        width={px2rem(100)}
        height={px2rem(20)}
      />
    ));
}
