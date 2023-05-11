import * as React from "react";
import { css } from "styled-components";

import Image from "./components/image";
import Title from "./components/title";
import Description from "./components/description";
import Engage from "./components/engage";
import { Wrapper, ContentWrapper } from "./styled";

import { Thread } from "app/typings";
import { PreviewBottom } from "../../components/previewBottom";

import { useStoreState } from "app/store";

interface IProps extends Thread.IThreadItemBaseProps {
  titlePrefix?: React.ReactNode;
  thumbnailScale?: Moim.ImageScaleType;
}

export const postItemStyles = css<{ selected: boolean }>`
  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey50};
    `};
`;

export function PostItem({
  threadId,
  stat,
  titlePrefix,
  thumbnailScale,
  config,
  className,
  disableAnonymousSuffix,
}: IProps) {
  const thread = useStoreState(state => state.entities.threads[threadId]);
  const showThumbnail = Boolean(config?.showThumbnail);
  const showTitle = Boolean(config?.showTitle);
  const showDescription = Boolean(config?.showText);
  const showReaction = Boolean(config?.showReaction);
  const showCommentCount = Boolean(config?.showCommentCount);
  const showAuthor = Boolean(config?.showAuthor);
  const showDate = Boolean(config?.showDate);
  const showEngage = showReaction || showCommentCount || showAuthor || showDate;

  const textAlgin = config?.textAlignment;

  if (!thread) {
    return null;
  }
  return (
    <Wrapper
      thumbnailPosition={config?.thumbnailConfig?.position}
      className={className}
    >
      {showThumbnail && (
        <Image
          position={config?.thumbnailConfig?.position}
          thumbnail={thread.preview?.thumbnail}
          thumbnailScale={thumbnailScale}
          ratio={
            config.thumbnailConfig?.type === "ratio"
              ? config.thumbnailConfig.value
              : undefined
          }
          isVideo={thread.preview?.isVideo}
        />
      )}
      <ContentWrapper>
        {showTitle && (
          <Title
            title={thread.preview?.title}
            stat={stat}
            prefix={titlePrefix}
            textAlign={textAlgin}
          />
        )}
        {showDescription && (
          <Description
            description={thread.preview?.description}
            descriptionPlain={thread.preview?.descriptionPlain}
            isUnread={stat?.isUnread}
            textAlign={textAlgin}
          />
        )}
        {showEngage && (
          <Engage
            threadId={thread.id}
            upVoteCount={thread.up_vote_score}
            downVoteCount={thread.down_vote_score}
            commentCount={thread.replies_count}
            voteStatus={thread.vote?.type}
            voteType={config?.reactionType}
            author={thread.author}
            createdAt={thread.created_at}
            textAlign={textAlgin}
            showReaction={showReaction}
            showCommentCount={showCommentCount}
            showAuthor={showAuthor}
            showDate={showDate}
            anonymousData={thread.anonymous_data}
            disableAnonymousSuffix={disableAnonymousSuffix}
          />
        )}
      </ContentWrapper>
      <PreviewBottom blockits={thread.previewBottom ?? []} config={config} />
    </Wrapper>
  );
}
