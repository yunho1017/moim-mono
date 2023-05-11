import CurrencyIcon from "common/components/currencyIcon";
import { H4Bold } from "common/components/designSystem/typos";
import { DEFAULT_MAX_PRICE_DECIMALS_LIMIT } from "common/constants/default";
import { px2rem } from "common/helpers/rem";
import * as React from "react";
import styled from "styled-components";

const BadgeCurrencyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(6)};
  padding: ${px2rem(12)} 0;
`;

const PriceWrapper = styled(H4Bold)<{ textColor: string }>`
  color: ${props => props.textColor};
  opacity: 86%;
`;

interface IProps {
  currency: Moim.Community.BlockchainCommunityCurrency;
  priceAmount: number | string;
  textColor: string;
}

const ClaimPrice: React.FC<IProps> = ({ currency, priceAmount, textColor }) => (
  <BadgeCurrencyWrapper>
    <CurrencyIcon
      currency={currency as Moim.Community.BlockchainCommunityCurrency}
      size="s"
    />
    <PriceWrapper textColor={textColor}>{`${priceAmount?.toLocaleString(
      "fullwide",
      {
        useGrouping: true,
        maximumSignificantDigits: DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
      },
    )} ${currency}`}</PriceWrapper>
  </BadgeCurrencyWrapper>
);

export default React.memo(ClaimPrice);
