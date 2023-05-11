import CurrencyIcon from "common/components/currencyIcon";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { NFTItemCellPriceWrapper, NFTItemCellPrice } from "./styled";

interface IProps {
  network: Moim.Community.IBlockchainType;
  price: number;
  currency: string;
  justifyContent?: "flex-start" | "center" | "flex-end";
}

const Price: React.FC<IProps> = ({
  network = "POLYGON",
  price,
  currency,
  justifyContent = "flex-start",
}: IProps) => {
  const networkIcon = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return <CurrencyIcon currency="MATIC" />;
      }
      case "ETHEREUM": {
        return <CurrencyIcon currency="ETH" />;
      }
      case "MUMBAI": {
        return <CurrencyIcon currency="MATIC" />;
      }
    }
  }, [network]);

  if (price === undefined) return null;

  return (
    <NFTItemCellPriceWrapper justifyContent={justifyContent}>
      {networkIcon}
      <NFTItemCellPrice>
        {price === 0 ? (
          <FormattedMessage id="price_free_mint" />
        ) : (
          <>
            {price} {currency}
          </>
        )}
      </NFTItemCellPrice>
    </NFTItemCellPriceWrapper>
  );
};

export default React.memo(Price);
