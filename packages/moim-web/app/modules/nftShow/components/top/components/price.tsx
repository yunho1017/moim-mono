import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { H4BoldStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import CurrencyIcon from "common/components/currencyIcon";

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(58)};
`;

const PriceNumber = styled.div`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  margin-left: ${px2rem(12)};
`;

interface IProps {
  network: Moim.Community.IBlockchainType;
  price?: number;
  currency?: string;
}

const Price: React.FC<IProps> = ({ network, price, currency }: IProps) => {
  const networkIcon = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return <CurrencyIcon currency="MATIC" />;
      }
      case "ETHEREUM": {
        return <CurrencyIcon currency="ETH" />;
      }
    }
  }, [network]);

  if (price === undefined) return null;

  return (
    <PriceWrapper>
      {networkIcon}
      <PriceNumber>
        {price === 0 ? (
          <FormattedMessage id="price_free_mint" />
        ) : (
          <>
            {price} {currency}
          </>
        )}
      </PriceNumber>
    </PriceWrapper>
  );
};

export default React.memo(Price);
