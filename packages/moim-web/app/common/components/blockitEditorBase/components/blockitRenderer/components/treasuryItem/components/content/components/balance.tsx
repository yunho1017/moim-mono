import * as React from "react";
import { FormattedMessage } from "react-intl";

import CurrencyIcon from "common/components/currencyIcon";
import { Spacer } from "common/components/designSystem/spacer";
import { DEFAULT_MAX_PRICE_DECIMALS_LIMIT } from "common/constants/default";

import {
  CaptionWrapper,
  MainBalanceWrapper,
  SubBalanceWrapper,
} from "./styled";

interface IProps {
  mainBalance: number;
  mainCurrency: string;
  subBalance: number;
  subCurrency: string;
  showSubBalance?: boolean;
}

const TreasuryItemBalance: React.FC<IProps> = ({
  mainBalance,
  mainCurrency,
  subBalance,
  subCurrency,
  showSubBalance,
}: IProps) => (
  <>
    <Spacer value={18} />
    <CaptionWrapper>
      <FormattedMessage id="treasury_block_current_balance_title" />
    </CaptionWrapper>
    <MainBalanceWrapper>
      <CurrencyIcon
        currency={mainCurrency as Moim.Community.BlockchainCommunityCurrency}
      />
      {`${mainBalance.toLocaleString("fullwide", {
        useGrouping: true,
        maximumSignificantDigits: DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
      })} ${mainCurrency}`}
    </MainBalanceWrapper>
    {showSubBalance && (
      <>
        <Spacer value={2} />
        <SubBalanceWrapper>{`${subBalance.toFixed(
          2,
        )} ${subCurrency}`}</SubBalanceWrapper>
      </>
    )}
  </>
);

export default React.memo(TreasuryItemBalance);
