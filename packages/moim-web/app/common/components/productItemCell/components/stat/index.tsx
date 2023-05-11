import * as React from "react";

import {
  EngageIcon,
  EngageLabel,
  EngageLikeIcon,
  EngageCommentIcon,
  EngageViewIcon,
  Engagement,
} from "./styled";

import numberWithComma from "common/helpers/numberWithComma";

interface IProps {
  className?: string;
  voteScore: number;
  viewCount: number;
  repliesCount?: number;
  reviewsCount?: number;
  commentsCount?: number;
  block: Moim.Component.ProductItem.IStat;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Stat = ({
  className,
  voteScore,
  viewCount,
  repliesCount: _repliesCount,
  reviewsCount,
  commentsCount,
  block,
  horizontalAlign,
}: IProps) => {
  const repliesCount =
    (_repliesCount ?? 0) + (reviewsCount ?? 0) + (commentsCount ?? 0);
  const visibleVoteScore = block.showVoteScore !== false && voteScore;
  const visibleRepliesCount = block.showCommentCount !== false && repliesCount;
  const visibleViewCount = block.showViewCount !== false && viewCount;

  const visible = visibleVoteScore || visibleRepliesCount || visibleViewCount;

  if (!visible) {
    return null;
  }
  return (
    <Engagement className={className} horizontalAlign={horizontalAlign}>
      {visibleVoteScore ? (
        <>
          <EngageIcon key="engage-vote-icon">
            <EngageLikeIcon />
          </EngageIcon>
          <EngageLabel key="engage-vote-label">
            {numberWithComma(voteScore)}
          </EngageLabel>
        </>
      ) : null}
      {visibleRepliesCount ? (
        <>
          <EngageIcon key="engage-replies-icon">
            <EngageCommentIcon />
          </EngageIcon>
          <EngageLabel key="engage-replies-label">
            {numberWithComma(repliesCount)}
          </EngageLabel>
        </>
      ) : null}
      {visibleViewCount ? (
        <>
          <EngageIcon key="engage-view-icon">
            <EngageViewIcon />
          </EngageIcon>
          <EngageLabel key="engage-view-label">
            {numberWithComma(viewCount)}
          </EngageLabel>
        </>
      ) : null}
    </Engagement>
  );
};

export default React.memo(Stat);
