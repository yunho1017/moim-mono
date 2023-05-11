import React from "react";

import { PostItem } from "./templates/post";
import { CompactConversationItem } from "./templates/compactConversation";
import useIsMobile from "common/hooks/useIsMobile";

export { CompactConversationItem, PostItem };

type PropsType = React.ComponentProps<typeof CompactConversationItem> &
  React.ComponentProps<typeof PostItem>;

export const ThreadRenderer: React.FC<PropsType> = ({
  threadId,
  config,
  stat,
  titlePrefix,
  thumbnailScale,
  className,
  disableAnonymousSuffix,
}) => {
  const isMobile = useIsMobile();
  const viewType = React.useMemo(
    () =>
      isMobile || !config.viewType_web ? config.viewType : config.viewType_web,
    [isMobile, config.viewType, config.viewType_web],
  );

  switch (viewType) {
    case "compact-conversation":
      return (
        <CompactConversationItem
          key={threadId}
          threadId={threadId}
          stat={stat}
          config={config}
          className={className}
          disableAnonymousSuffix={disableAnonymousSuffix}
        />
      );
    case "post":
    default:
      return (
        <PostItem
          key={threadId}
          threadId={threadId}
          stat={stat}
          titlePrefix={titlePrefix}
          config={config}
          thumbnailScale={thumbnailScale}
          className={className}
          disableAnonymousSuffix={disableAnonymousSuffix}
        />
      );
  }
};
