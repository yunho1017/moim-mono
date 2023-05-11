import * as React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { FormattedMessage, FormattedNumber } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Wrapper,
  Box,
  Row,
  Title,
  SubTitle,
  CaptionLabel,
  CaptionToken,
  CircularBarWrapper,
} from "./styled";

interface IProps {
  currency: string;
  token?: Moim.Campaign.IToken;
  usedAmount?: number;
  raisedAmount?: number;
}

const WalletInformation: React.FC<IProps> = ({
  currency,
  token,
  usedAmount = 0,
  raisedAmount = 0,
}) => {
  const remainRate = React.useMemo(
    () =>
      raisedAmount === 0
        ? 0
        : ((raisedAmount - usedAmount) / raisedAmount) * 100,
    [raisedAmount, usedAmount],
  );

  const currentBalance = React.useMemo(() => raisedAmount - usedAmount, [
    raisedAmount,
    usedAmount,
  ]);

  return (
    <Wrapper>
      <Box>
        <Row>
          <div className="left">
            <CaptionLabel>
              <FormattedMessage id="project_manager_project_wallet_dashboard_current_balance_title" />
            </CaptionLabel>
            <Title>
              <CurrencyFormatter currency={currency} value={currentBalance} />
            </Title>
            <CaptionToken>
              <FormattedNumber
                useGrouping={true}
                value={currentBalance / (token?.price ?? 1)}
              />{" "}
              {token?.symbol}
            </CaptionToken>
          </div>
          <div className="right">
            <Spacer value={8} />
            <CircularBarWrapper>
              <CircularProgressbarWithChildren
                value={remainRate}
                counterClockwise={false}
                strokeWidth={6}
                styles={buildStyles({
                  strokeLinecap: "butt",
                })}
              >
                <span className="legendTitle">{Math.round(remainRate)}%</span>
                <span className="legendDesc">
                  <FormattedMessage id="project_manager_dashboard_community_wallet_current_balance_percent" />
                </span>
              </CircularProgressbarWithChildren>
            </CircularBarWrapper>
          </div>
        </Row>
        <Spacer value={32} />
        <Row>
          <div className="left">
            <CaptionLabel>
              <FormattedMessage id="project_manager_project_wallet_dashboard_total_income_title" />
            </CaptionLabel>
            <SubTitle>
              <CurrencyFormatter currency={currency} value={raisedAmount} />
            </SubTitle>
            <CaptionToken>
              <FormattedNumber
                useGrouping={true}
                value={raisedAmount / (token?.price ?? 1)}
              />{" "}
              {token?.symbol}
            </CaptionToken>
          </div>
          <div className="right">
            <CaptionLabel>
              <FormattedMessage id="project_manager_project_wallet_dashboard_total_expense_title" />
            </CaptionLabel>
            <SubTitle>
              <CurrencyFormatter currency={currency} value={usedAmount} />
            </SubTitle>
            <CaptionToken>
              <FormattedNumber
                useGrouping={true}
                value={usedAmount / (token?.price ?? 1)}
              />{" "}
              {token?.symbol}
            </CaptionToken>
          </div>
        </Row>
      </Box>
    </Wrapper>
  );
};

export default WalletInformation;
