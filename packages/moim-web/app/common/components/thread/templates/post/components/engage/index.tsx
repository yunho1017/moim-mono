import * as React from "react";

import {
  Wrapper,
  EngageWrapper,
  StatusWrapper,
  Status,
  Engage,
} from "./styled";
import { SmallLike } from "common/components/engage/like";
import { SmallUpDown } from "common/components/engage/upDown";
import Comment from "common/components/engage/comment";
import CreateDayOMeter from "common/components/createDayOMeter";
import ShavedText from "common/components/shavedText/v2";

import { useIntlShort } from "common/hooks/useIntlShort";
import { VoteStatus } from "app/enums";

import { useStoreState } from "app/store";
import useGroupTexts, {
  useCurrentUserLocale,
} from "common/hooks/useGroupTexts";

export interface IProps {
  threadId: Moim.Id;
  upVoteCount: number;
  downVoteCount: number;
  commentCount: number;
  voteType?: Moim.Forum.PostReactionType;
  voteStatus?: Moim.Enums.VoteStatus;
  anonymousData?: Moim.Forum.IAnonymousData;
  disableAnonymousSuffix?: boolean;

  author: Moim.Id;
  createdAt: number;

  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
  showReaction: boolean;
  showCommentCount: boolean;
  showAuthor: boolean;
  showDate: boolean;
}

function Engagement({
  threadId,
  voteType,
  voteStatus,
  upVoteCount,
  downVoteCount,
  commentCount,
  author: authorId,
  createdAt,
  textAlign,
  showReaction,
  showCommentCount,
  showAuthor,
  showDate,
  anonymousData,
  disableAnonymousSuffix,
}: IProps) {
  const intl = useIntlShort();
  const author = useStoreState(state => state.entities.users[authorId]);
  const anonymousTextKey = useGroupTexts("anonymous_member");
  const locale = useCurrentUserLocale();
  const engageRef = React.useRef<HTMLDivElement>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);

  return (
    <Wrapper textAlign={textAlign}>
      {(showReaction || showCommentCount) && (
        <EngageWrapper ref={engageRef}>
          {showReaction && (
            <Engage>
              {voteType === "up" ? (
                <SmallLike
                  liked={voteStatus === VoteStatus.POSITIVE}
                  likeCount={upVoteCount}
                  threadId={threadId ?? ""}
                />
              ) : (
                <SmallUpDown
                  threadId={threadId ?? ""}
                  status={voteStatus ?? VoteStatus.NONE}
                  upCount={upVoteCount}
                  downCount={downVoteCount}
                  visibleNoneCountFallback={false}
                />
              )}
            </Engage>
          )}

          {showCommentCount && (
            <Engage>
              <Comment count={commentCount} />
            </Engage>
          )}
        </EngageWrapper>
      )}
      {(showAuthor || showDate) && (
        <StatusWrapper ref={statusRef}>
          {showAuthor && (
            <Status key="author">
              <ShavedText line={1}>
                {anonymousData
                  ? `${anonymousTextKey?.singular}${
                      !disableAnonymousSuffix
                        ? anonymousData.authorSuffix?.[locale]
                        : ""
                    }`
                  : author?.name ?? authorId}
              </ShavedText>
            </Status>
          )}
          {showDate && (
            <Status key="createAt">
              <ShavedText line={1}>
                <CreateDayOMeter
                  key="create-at"
                  givenDate={createdAt}
                  className="time"
                  useChange={false}
                  normalFormat={intl("datetime_format_short_tiny_date")}
                />
              </ShavedText>
            </Status>
          )}
        </StatusWrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(Engagement);
