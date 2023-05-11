import * as React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { STEP, VOTE_LIST_TYPE } from "app/modules/campaign/containers/voteList";
import { LoadingIcon } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller/new";
import VoteItem from "./voteItem";
import {
  Wrapper,
  StyledTabWrapper,
  StyledTabItem,
  SingleLineText,
  Inner,
  VoteCountTitle,
  Divider,
  VoteItemContainer,
  MiddleDot,
  EmptyWrapper,
  EmptyGuideText,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  type: STEP;
  isLoading: boolean;
  votes: {
    accepted: Moim.IPaginatedListResponse<
      Moim.Campaign.IDenormalizedExecutionVote
    >;
    rejected: Moim.IPaginatedListResponse<
      Moim.Campaign.IDenormalizedExecutionVote
    >;
  };
  onChangeType(type: VOTE_LIST_TYPE): void;
  onLoadMore(
    payload: {
      status: Moim.Campaign.CampaignExecutionVoteStatus;
    } & Moim.IPaging,
  ): void;
}

const VoteParticipants: React.FC<IProps> = ({
  type,
  isLoading,
  votes,
  onChangeType,
  onLoadMore,
}) => {
  const totalVoteCount = React.useMemo(
    () => votes.accepted.data.length + votes.rejected.data.length,
    [votes.accepted.data.length, votes.rejected.data.length],
  );

  const handleClickAgreeTab = React.useCallback(() => {
    onChangeType("participant-agree");
  }, [onChangeType]);
  const handleClickDisagreeTab = React.useCallback(() => {
    onChangeType("participant-disagree");
  }, [onChangeType]);

  const countInfoElem = React.useMemo(() => {
    const targetCount =
      type === "participant-disagree"
        ? votes.rejected.data.length
        : votes.accepted.data.length;
    return (
      <VoteCountTitle>
        {targetCount && totalVoteCount
          ? Math.round(targetCount / totalVoteCount) * 100
          : 0}
        %<MiddleDot>·</MiddleDot>
        <FormattedMessage
          id="dialog_vote_result_for_funding_proposal_votes_percent"
          values={{
            plain_count: targetCount,
            formattedCount: (
              <FormattedNumber useGrouping={true} value={targetCount} />
            ),
          }}
        />
      </VoteCountTitle>
    );
  }, [
    totalVoteCount,
    type,
    votes.accepted.data.length,
    votes.rejected.data.length,
  ]);

  const voteItemElem = React.useMemo(() => {
    const items =
      votes[type === "participant-disagree" ? "rejected" : "accepted"].data;
    return items.map(
      (item, index) =>
        item && (
          <>
            <VoteItemContainer key={`${type}_${item.id}`}>
              <VoteItem vote={item} />
            </VoteItemContainer>
            {index < items.length - 1 && (
              <>
                <Spacer value={8} />
                <Divider />
                <Spacer value={8} />
              </>
            )}
          </>
        ),
    );
  }, [votes, type]);

  const handleLoadMore = React.useCallback(() => {
    onLoadMore({
      status: type === "participant-disagree" ? "rejected" : "accepted",
      ...votes[type === "participant-disagree" ? "rejected" : "accepted"]
        .paging,
    });
  }, [onLoadMore, type, votes]);

  return (
    <Wrapper>
      <StyledTabWrapper>
        <StyledTabItem
          key={`voteList_agree`}
          onClick={handleClickAgreeTab}
          active={type === "participant-agree"}
        >
          <span>
            <SingleLineText>
              <FormattedMessage id="dialog_vote_result_for_funding_proposal_agreement_list_title" />
            </SingleLineText>
          </span>
        </StyledTabItem>
        <StyledTabItem
          key={`voteList_disagree`}
          onClick={handleClickDisagreeTab}
          active={type === "participant-disagree"}
        >
          <span>
            <SingleLineText>
              <FormattedMessage id="dialog_vote_result_for_funding_proposal_disagreement_list_title" />
            </SingleLineText>
          </span>
        </StyledTabItem>
      </StyledTabWrapper>
      <Inner data-scroll-lock-scrollable>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {countInfoElem}
            <Spacer value={8} />

            {votes[type === "participant-disagree" ? "rejected" : "accepted"]
              .data.length === 0 ? (
              <EmptyWrapper>
                <EmptyGuideText>
                  <FormattedMessage
                    id={
                      type === "participant-agree"
                        ? "dialog_vote_result_for_funding_proposal_agreement_list_empty"
                        : "dialog_vote_result_for_funding_proposal_disagreement_list_empty"
                    }
                  />
                </EmptyGuideText>
              </EmptyWrapper>
            ) : (
              <>
                <Divider />
                <InfiniteScroller
                  loader={<LoadingIcon />}
                  paging={
                    votes[
                      type === "participant-disagree" ? "rejected" : "accepted"
                    ].paging
                  }
                  isLoading={isLoading}
                  itemLength={
                    votes[
                      type === "participant-disagree" ? "rejected" : "accepted"
                    ].data.length
                  }
                  loadMore={handleLoadMore}
                >
                  {voteItemElem}
                </InfiniteScroller>
              </>
            )}
          </>
        )}
      </Inner>
    </Wrapper>
  );
};

export default VoteParticipants;
