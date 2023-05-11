import * as React from "react";
import { FormattedNumber, FormattedMessage, useIntl } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";
import Chip from "common/components/chips";
import { calculateDDay } from "common/components/period/helper";
import DDayComponent from "common/components/period";
import { Spacer } from "common/components/designSystem/spacer";
import RichEditor from "common/components/richEditor";
import moment from "moment";
import {
  Wrapper,
  Inner,
  Footer,
  VotingDate,
  Title,
  InfoBox,
  InfoColumRow,
  ContentContainer,
  AmountLabel,
  AmountValue,
  TokenValue,
  Divider,
  DenyVoteButton,
  AgreeVoteButton,
  IconWrapper,
  VoteAgreeIcon,
  VoteDenyIcon,
  DDayChipStyle,
  StatusContainer,
  Status,
} from "./styled";

interface IProps {
  currency: string;
  execution: Moim.Campaign.IDenormalizedCampaignExecution;
  token?: Moim.Campaign.IToken;
  onClickAgree(): void;
  onClickDeny(): void;
  onClickResult(): void;
}

const ExecutionShowComponent: React.FC<IProps> = ({
  currency,
  token,
  execution,
  onClickAgree,
  onClickDeny,
  onClickResult,
}) => {
  const intl = useIntl();
  const statusText = React.useMemo(() => {
    switch (execution.status) {
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
  }, [execution.status]);

  const durationElem = React.useMemo(() => {
    const days = Math.round(execution.voteDuration / 864000);
    const hours = Math.round(execution.voteDuration / 3600);
    const minutes = Math.round(execution.voteDuration / 60);
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
  }, [execution.voteDuration]);

  const dDayElem = React.useMemo(() => {
    const date = calculateDDay({
      startTime: execution.startAt,
      endTime: execution.endAt,
    });

    return (
      <Chip size="small" shape="round" overrideStyle={DDayChipStyle}>
        <DDayComponent dDay={date} />
      </Chip>
    );
  }, [execution]);

  const votingDate = React.useMemo(() => {
    const startAt = moment(execution.startAt).format(
      intl.formatMessage({ id: "datetime_format_full_time_date" }),
    );
    const endAt = moment(execution.endAt).format(
      intl.formatMessage({ id: "datetime_format_full_time_date" }),
    );

    return (
      <VotingDate>
        {startAt} ~ {endAt}
      </VotingDate>
    );
  }, [execution.endAt, execution.startAt, intl]);

  return (
    <Wrapper>
      <Inner data-scroll-lock-scrollable>
        <StatusContainer>
          <Status status={execution.status}>{statusText}</Status>
          {execution.status === "proposed" && dDayElem}
        </StatusContainer>
        {execution.status === "proposed" && votingDate}
        <Title>{execution.title}</Title>
        <InfoBox>
          <div className="box">
            <AmountLabel>
              <FormattedMessage id="dialog_funding_proposal_amount_input" />
            </AmountLabel>
            <AmountValue>
              <CurrencyFormatter currency={currency} value={execution.amount} />
            </AmountValue>
            {token && (
              <TokenValue>
                <FormattedNumber value={execution.amount / token.price} />{" "}
                {token.symbol}
              </TokenValue>
            )}
          </div>
        </InfoBox>
        <Spacer value={8} />
        <InfoColumRow>
          <span className="left">
            <FormattedMessage id="dialog_funding_proposal_approval_options" />
          </span>
          <span className="right">
            {durationElem} |{" "}
            <FormattedMessage
              id="dialog_funding_proposal_approval_options_condition"
              values={{
                formattedCount: Math.round(parseInt(execution.passRule, 10)),
              }}
            />
          </span>
        </InfoColumRow>
        <InfoColumRow>
          <span className="left">
            <FormattedMessage id="dialog_vote_for_funding_proposal_requester" />
          </span>
          <span className="right">{execution.creator.name}</span>
        </InfoColumRow>
        <Divider />
        <ContentContainer>
          <RichEditor
            id={`execution_content_${execution.id}`}
            readonly={true}
            contents={execution.thread?.content ?? []}
          />
        </ContentContainer>
      </Inner>
      <Footer>
        <Divider />
        <div className="inner">
          {execution.status === "accepted" ||
          execution.status === "rejected" ? (
            <AgreeVoteButton onClick={onClickResult}>
              <FormattedMessage id="button_vote_result_ended" />
            </AgreeVoteButton>
          ) : (
            <>
              <DenyVoteButton
                isActive={execution.vote?.status === "rejected"}
                disabled={
                  execution.status !== "proposed" ||
                  execution.vote?.status === "rejected"
                }
                onClick={onClickDeny}
              >
                <FormattedMessage id="button_disagree" />
                {execution.vote?.status === "rejected" && (
                  <IconWrapper>
                    <VoteDenyIcon />
                  </IconWrapper>
                )}
              </DenyVoteButton>
              <AgreeVoteButton
                isActive={execution.vote?.status === "accepted"}
                disabled={
                  execution.status !== "proposed" ||
                  execution.vote?.status === "accepted"
                }
                onClick={onClickAgree}
              >
                <FormattedMessage id="button_agree" />
                {execution.vote?.status === "accepted" && (
                  <IconWrapper>
                    <VoteAgreeIcon />
                  </IconWrapper>
                )}
              </AgreeVoteButton>
            </>
          )}
        </div>
      </Footer>
    </Wrapper>
  );
};

export default ExecutionShowComponent;
