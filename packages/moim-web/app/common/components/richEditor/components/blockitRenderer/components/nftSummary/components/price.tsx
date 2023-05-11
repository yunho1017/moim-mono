import CurrencyIcon from "common/components/currencyIcon";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { PriceNumber, PriceWrapper } from "./styled";

type IProps = Pick<Moim.NFT.IContract, "network" | "price" | "currency">;

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
