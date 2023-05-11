import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useActions } from "app/store";
import UserProfileImage from "common/components/userProfileImage";
import CurrencyFormatter from "common/components/currencyFormatter";
import Chip from "common/components/chips";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import { calculateDDay } from "common/components/period/helper";
import DDayComponent from "common/components/period";
import {
  Wrapper,
  Status,
  Title,
  DueDate,
  Description,
  UserSection,
  AvatarWrapper,
  Username,
  VoteButton,
  VoteStatusButton,
  DDayChipStyle,
  StatusContainer,
  ContentContainer,
  ButtonContainer,
} from "./styled";

const RequestFundItem: React.FC<Moim.Campaign.IDenormalizedCampaignExecution & {
  currency: string;
}> = ({
  title,
  status,
  creator,
  amount,
  currency,
  voteDuration,
  passRule,
  campaignId,
  startAt,
  endAt,
  vote,
  id,
}) => {
  const { openExecutionShow, openExecutionVoteList } = useActions({
    openExecutionShow: CampaignActionCreators.openExecutionViewDialog,
    openExecutionVoteList: CampaignActionCreators.openExecutionVoteListDialog,
  });

  const handleClick = React.useCallback(() => {
    openExecutionShow({
      campaignId,
      executionId: id,
    });
  }, [campaignId, id, openExecutionShow]);

  const handleVoteAgreeClick = React.useCallback(
    e => {
      e.stopPropagation();
      openExecutionShow({
        campaignId,
        executionId: id,
      });
    },
    [campaignId, id, openExecutionShow],
  );
  const handleVoteInfoClick = React.useCallback(
    e => {
      e.stopPropagation();
      openExecutionVoteList({
        campaignId,
        executionId: id,
      });
    },
    [id, campaignId, openExecutionVoteList],
  );

  const statusText = React.useMemo(() => {
    switch (status) {
      case "proposed": {
        return <FormattedMessage id="status_funding_proposal_ongoing" />;
      }
      case "waitingForSign": {
        return <FormattedMessage id="status_funding_proposal_wait_for_sign" />;
      }
      case "rejected": {
        return <FormattedMessage id="status_funding_proposal_rejected" />;
      }
      case "accepted": {
        return <FormattedMessage id="status_funding_proposal_approved" />;
      }
    }
  }, [status]);

  const durationElem = React.useMemo(() => {
    const days = Math.round(voteDuration / 864000);
    const hours = Math.round(voteDuration / 3600);
    const minutes = Math.round(voteDuration / 60);
    let text: React.ReactNode | undefined;
    if (days > 0) {
      text = (
        <FormattedMessage
          id="time_days"
          values={{
            plain_count: days,
            formattedCount: days,
          }}
        />
      );
    } else if (hours > 0) {
      text = (
        <FormattedMessage
          id="time_hours"
          values={{
            plain_count: hours,
            formattedCount: hours,
          }}
        />
      );
    } else if (minutes > 0) {
      text = (
        <FormattedMessage
          id="time_minutes"
          values={{
            plain_count: minutes,
            formattedCount: minutes,
          }}
        />
      );
    }
    if (!text) {
      return null;
    }
    return <span>{text}</span>;
  }, [voteDuration]);

  const dDayElem = React.useMemo(() => {
    const date = calculateDDay({
      startTime: startAt,
      endTime: endAt,
    });

    return (
      <Chip size="small" shape="round" overrideStyle={DDayChipStyle}>
        <DDayComponent dDay={date} />
      </Chip>
    );
  }, [endAt, startAt]);

  return (
    <Wrapper role="button" onClick={handleClick}>
      <ContentContainer>
        <StatusContainer>
          <div className="left">
            <Status status={status}>{statusText}</Status>
          </div>
          <div className="right">{status === "proposed" && dDayElem}</div>
        </StatusContainer>

        <Title>{title}</Title>
        <Description>
          <CurrencyFormatter currency={currency} value={amount} />
        </Description>
        <DueDate>
          {durationElem} |{" "}
          <FormattedMessage
            id="dialog_funding_proposal_approval_options_condition"
            values={{ formattedCount: Math.round(parseInt(passRule, 10)) }}
          />
        </DueDate>
        <UserSection>
          <AvatarWrapper>
            <UserProfileImage size="xs" src={creator.avatar_url} />
          </AvatarWrapper>
          <Username>{creator.name}</Username>
        </UserSection>
      </ContentContainer>

      <ButtonContainer>
        <VoteButton
          isActive={Boolean(vote)}
          disabled={status !== "proposed"}
          onClick={handleVoteAgreeClick}
        >
          <FormattedMessage id="button_vote" />
        </VoteButton>
        <VoteStatusButton onClick={handleVoteInfoClick}>
          <FormattedMessage
            id={
              status === "proposed"
                ? "button_vote_result"
                : "button_vote_result_ended"
            }
          />
        </VoteStatusButton>
      </ButtonContainer>
    </Wrapper>
  );
};

export default React.memo(RequestFundItem);
