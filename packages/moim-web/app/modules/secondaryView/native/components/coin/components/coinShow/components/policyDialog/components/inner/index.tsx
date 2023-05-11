import * as React from "react";

import styled from "styled-components";

import ExchangeConfigBox from "../exchangeConfigBox";
import { Spacer } from "common/components/designSystem/spacer";
import { pB3RegularStyle, H10Bold } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
`;

const PolicyWrapper = styled.div``;
const PolicyTitle = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(6)} ${px2rem(40)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(6)} ${px2rem(16)};
  }
`;
const PolicyText = styled.div`
  ${pB3RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: 0 ${px2rem(40)};
  white-space: pre-line;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

const Inner: React.FC<{
  policyTitle?: string;
  policy?: string;
  currencyExchangeConfigs?: Moim.Community.Coin.ICurrencyExchangeConfig[];
  coinCurrency: string;
}> = ({ policyTitle, policy, currencyExchangeConfigs, coinCurrency }) => {
  const currencyExchangeConfig = currencyExchangeConfigs?.[0];
  return (
    <Wrapper>
      {currencyExchangeConfig?.visualRatio &&
      currencyExchangeConfig.currency?.symbol !== coinCurrency ? (
        <ExchangeConfigBox
          currencyExchangeConfig={currencyExchangeConfig}
          coinSymbol={coinCurrency}
        />
      ) : null}

      {policy || policyTitle ? (
        <PolicyWrapper>
          {Boolean(policyTitle) && (
            <>
              <PolicyTitle>{policyTitle}</PolicyTitle>
              <Spacer value={16} />
            </>
          )}

          {Boolean(policy) && <PolicyText>{policy}</PolicyText>}
        </PolicyWrapper>
      ) : null}
    </Wrapper>
  );
};

export default Inner;
