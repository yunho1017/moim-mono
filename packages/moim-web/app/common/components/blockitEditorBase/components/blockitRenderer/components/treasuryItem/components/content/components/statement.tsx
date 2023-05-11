import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DEFAULT_MAX_PRICE_DECIMALS_LIMIT } from "common/constants/default";
import {
  StatementCaptionWrapper,
  StatementMainBalanceWrapper,
  StatementSubBalanceWrapper,
  StatementTotalIncomeWrapper,
} from "./styled";

interface IProps {
  titleKey: string;
  mainBalance: number;
  mainCurrency: string;
  subBalance: number;
  subCurrency: string;
  showSubBalance?: boolean;
}

const TreasuryItemStatement: React.FC<IProps> = ({
  titleKey,
  mainBalance,
  mainCurrency,
  subBalance,
  subCurrency,
  showSubBalance,
}: IProps) => (
  <StatementTotalIncomeWrapper>
    <StatementCaptionWrapper>
      <FormattedMessage id={titleKey} />
    </StatementCaptionWrapper>
    <StatementMainBalanceWrapper>{`${mainBalance.toLocaleString("fullwide", {
      useGrouping: true,
      maximumSignificantDigits: DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
    })} ${mainCurrency}`}</StatementMainBalanceWrapper>
    {showSubBalance && (
      <StatementSubBalanceWrapper>{`${subBalance.toFixed(
        2,
      )} ${subCurrency}`}</StatementSubBalanceWrapper>
    )}
  </StatementTotalIncomeWrapper>
);

export default React.memo(TreasuryItemStatement);
