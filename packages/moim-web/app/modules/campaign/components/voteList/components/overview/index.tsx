import * as React from "react";
import { ThemeContext } from "styled-components";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { VOTE_LIST_TYPE } from "../../../../containers/voteList";
import { Spacer } from "app/common/components/designSystem/spacer";
import CurrencyFormatter from "common/components/currencyFormatter";
import {
  Wrapper,
  Status,
  Title,
  InfoBox,
  AmountLabel,
  AmountValue,
  TokenValue,
  InfoColumRow,
  ChartTitleContainer,
  ChartTitle,
  CircularBarWrapper,
  CircleMoreWrapper,
  CircleMoreIcon,
  MoreIcon,
  AgreementColorBox,
  DisagreementColorBox,
  ButtonWrapper,
  TransferButton,
  MiddleDot,
} from "./styled";

interface IProps {
  currency: string;
  isCreator: boolean;
  execution: Moim.Campaign.IDenormalizedCampaignExecution;
  token?: Moim.Campaign.IToken;
  onClickToVoteList(type: VOTE_LIST_TYPE): void;
  onClickToTransfer(): void;
}

const Overview: React.FC<IProps> = ({
  execution,
  isCreator,
  token,
  currency,
  onClickToVoteList,
  onClickToTransfer,
}) => {
  const intl = useIntl();
  const {
    status,
    title,
    passRule,
    voteDuration,
    amount,
    creator,
    acceptedCount = 0,
    rejectedCount = 0,
  } = execution;
  const theme = React.useContext(ThemeContext);

  const totalVoteCount = React.useMemo(() => acceptedCount + rejectedCount, [
    acceptedCount,
    rejectedCount,
  ]);

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

  const handleClickToAgreeVoteList = React.useCallback(() => {
    onClickToVoteList("participant-agree");
  }, [onClickToVoteList]);
  const handleClickToDisagreeVoteList = React.useCallback(() => {
    onClickToVoteList("participant-disagree");
  }, [onClickToVoteList]);

  return (
    <Wrapper>
      <Status status={status}>{statusText}</Status>
      <Title>{title}</Title>
      <InfoBox>
        <div className="box">
          <AmountLabel>
            <FormattedMessage id="dialog_vote_result_for_funding_proposal_terms_of_approval" />
          </AmountLabel>
          <AmountValue>
            <CurrencyFormatter currency={currency} value={amount} />
          </AmountValue>
          {token && (
            <TokenValue>
              <FormattedNumber value={amount / token.price} /> {token.symbol}
            </TokenValue>
          )}
        </div>
      </InfoBox>
      <Spacer value={16} />
      <InfoColumRow>
        <span className="left">
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_amount" />
        </span>
        <span className="right">
          {durationElem} |{" "}
          <FormattedMessage
            id="dialog_funding_proposal_approval_options_condition"
            values={{
              formattedCount: Math.round(parseInt(passRule, 10)),
            }}
          />
        </span>
      </InfoColumRow>
      <InfoColumRow>
        <span className="left">
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_requester" />
        </span>
        <span className="right">{creator.name}</span>
      </InfoColumRow>
      {/* <InfoColumRow>
        <span className="left">
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_total_number_of_votes" />
        </span>
        <span className="right">
          <FormattedMessage
            id="dialog_vote_result_for_funding_proposal_votes"
            values={{
              plain_count: totalVoteCount,
              formattedCount: intl.formatNumber(totalVoteCount, {
                useGrouping: true,
              }),
            }}
          />
        </span>
      </InfoColumRow> */}
      <Spacer value={8} />
      <InfoBox>
        <div className="box">
          <ChartTitleContainer>
            <ChartTitle>
              <FormattedMessage
                id="dialog_vote_result_for_funding_proposal_result_title"
                values={{
                  formattedCount: intl.formatNumber(totalVoteCount, {
                    useGrouping: true,
                  }),
                }}
              />
            </ChartTitle>
            <CircleMoreWrapper
              role="button"
              onClick={handleClickToAgreeVoteList}
            >
              <CircleMoreIcon />
            </CircleMoreWrapper>
          </ChartTitleContainer>
          <CircularBarWrapper>
            <CircularProgressbar
              value={
                acceptedCount && totalVoteCount
                  ? (acceptedCount / totalVoteCount) * 100
                  : 0
              }
              strokeWidth={30}
              counterClockwise={false}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: theme.color.green400,
                trailColor:
                  rejectedCount === 0
                    ? theme.colorV2.colorSet.grey200
                    : theme.color.red700,
              })}
            />
          </CircularBarWrapper>
          <Spacer value={12} />
        </div>
      </InfoBox>

      <InfoColumRow
        role="button"
        thickTopBottom={true}
        onClick={handleClickToAgreeVoteList}
      >
        <span className="left">
          <AgreementColorBox />
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_agreement" />
        </span>
        <span className="right">
          <span>
            {acceptedCount && totalVoteCount
              ? Math.round(acceptedCount / totalVoteCount) * 100
              : 0}
            %
          </span>
          <MiddleDot>·</MiddleDot>
          <FormattedMessage
            id="dialog_vote_result_for_funding_proposal_votes_percent"
            values={{
              plain_count: acceptedCount,
              formattedCount: (
                <FormattedNumber useGrouping={true} value={acceptedCount} />
              ),
            }}
          />
          <MoreIcon />
        </span>
      </InfoColumRow>
      <InfoColumRow
        role="button"
        thickTopBottom={true}
        onClick={handleClickToDisagreeVoteList}
      >
        <span className="left">
          <DisagreementColorBox />
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_disagreement" />
        </span>
        <span className="right">
          <span>
            {rejectedCount && totalVoteCount
              ? Math.round(rejectedCount / totalVoteCount) * 100
              : 0}
            %
          </span>
          <MiddleDot>·</MiddleDot>
          <FormattedMessage
            id="dialog_vote_result_for_funding_proposal_votes_percent"
            values={{
              plain_count: rejectedCount,
              formattedCount: (
                <FormattedNumber useGrouping={true} value={rejectedCount} />
              ),
            }}
          />
        </span>
        <MoreIcon />
      </InfoColumRow>
      {isCreator &&
      execution.status === "accepted" &&
      !execution.remittedAt ? (
        <>
          <Spacer value={90} />
          <ButtonWrapper>
            <TransferButton onClick={onClickToTransfer}>
              <FormattedMessage id="button_transfer_fund" />
            </TransferButton>
          </ButtonWrapper>
        </>
      ) : (
        <Spacer value={24} />
      )}
    </Wrapper>
  );
};

export default Overview;
