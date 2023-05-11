import React from "react";
import styled from "styled-components";

import { Spacer } from "common/components/designSystem/spacer";
import Author from "./components/author";
import Title from "./components/title";
import Description from "./components/description";
import TimeStamp from "./components/timeStamp";

import { px2rem } from "common/helpers/rem";
import { Thread } from "app/typings";

import { useStoreState } from "app/store";
import { BGLevel1 } from "common/components/designSystem/BGLevel";
import { useOpacityHoverStyle } from "common/components/designSystem/styles";

const CompactConversationWrapper = styled(BGLevel1)`
  width: 100%;
  height: 100%;
  border-radius: ${px2rem(4)};
  padding: ${px2rem(4)} 0;

  overflow: hidden;

  &:hover {
    ${useOpacityHoverStyle}
  }
`;

export const CompactConversationItem: React.FC<Thread.IThreadItemBaseProps> = ({
  threadId,
  stat,
  config,
  className,
  disableAnonymousSuffix,
}) => {
  const thread = useStoreState(state => state.entities.threads[threadId]);
  const showAuthorAvatar = Boolean(config?.showAuthorAvatar);
  const showAuthor = Boolean(config?.showAuthor);
  const showTitle = Boolean(config?.showTitle);
  const showDescription = Boolean(config?.showText);
  const showDate = Boolean(config?.showDate);

  const textAlign = config?.textAlignment;

  if (!thread) {
    return null;
  }
  return (
    <CompactConversationWrapper className={className}>
      <Spacer value={12} />

      {(showAuthor || showAuthorAvatar) && (
        <Author
          author={thread.author}
          showAuthor={showAuthor}
          showAvatar={showAuthorAvatar}
          textAlign={textAlign}
          anonymousData={thread.anonymous_data}
          disableAnonymousSuffix={disableAnonymousSuffix}
        />
      )}
      {showTitle && (
        <Title
          title={thread.preview?.title}
          stat={stat}
          textAlign={textAlign}
        />
      )}
      {showDescription && (
        <Description
          description={thread.preview?.description}
          descriptionPlain={thread.preview?.descriptionPlain}
          isUnread={stat?.isUnread}
          textAlign={textAlign}
        />
      )}
      {showDate && (
        <TimeStamp createdAt={thread.created_at} textAlign={textAlign} />
      )}
      <Spacer value={12} />
    </CompactConversationWrapper>
  );
};
