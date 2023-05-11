import React from "react";
import { FormattedNumber } from "react-intl";

import {
  EngagementWrapper,
  EngageIcon,
  EngageLikeIcon,
  EngageCommentIcon,
  EngageViewIcon,
  EngageLabel,
} from "./styled";

interface IProps {
  block: Moim.Component.ProductShow.IStat;
  reviewsCount?: number;
  commentsCount?: number;
  repliesCount?: number;
  voteScore?: number;
  viewCount?: number;
}
export default function Engagement({
  block,
  reviewsCount,
  commentsCount,
  repliesCount: repliesCountProps,
  voteScore,
  viewCount,
}: IProps) {
  const repliesCount =
    (repliesCountProps ?? 0) + (reviewsCount ?? 0) + (commentsCount ?? 0);

  const engageElement = React.useMemo(() => {
    const el: React.ReactNode[] = [];
    if (voteScore) {
      el.push(
        <>
          <EngageIcon>
            <EngageLikeIcon />
          </EngageIcon>
          <EngageLabel>
            <FormattedNumber value={voteScore} />
          </EngageLabel>
        </>,
      );
    }
    if (repliesCount) {
      el.push(
        <>
          <EngageIcon>
            <EngageCommentIcon />
          </EngageIcon>
          <EngageLabel>
            <FormattedNumber value={repliesCount} />
          </EngageLabel>
        </>,
      );
    }

    if (viewCount) {
      el.push(
        <>
          <EngageIcon>
            <EngageViewIcon />
          </EngageIcon>
          <EngageLabel>
            <FormattedNumber value={viewCount} />
          </EngageLabel>
        </>,
      );
    }

    return el;
  }, [voteScore, viewCount, repliesCount]);

  if (engageElement.length) {
    return (
      <EngagementWrapper
        hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
      >
        {engageElement}
      </EngagementWrapper>
    );
  }
  return null;
}
