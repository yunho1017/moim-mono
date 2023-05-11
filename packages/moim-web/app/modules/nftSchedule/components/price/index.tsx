import CurrencyIcon from "common/components/currencyIcon";
import { DEFAULT_MAX_PRICE_DECIMALS_LIMIT } from "common/constants/default";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { SchedulePriceText, SchedulePriceWrapper } from "./styled";

type IProps = Pick<Moim.NFT.IContract, "network" | "price" | "currency">;

const SchedulePrice: React.FC<IProps> = ({
  network,
  price,
  currency,
}: IProps) => {
  const networkIcon = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return <CurrencyIcon currency="MATIC" />;
      }
      case "ETHEREUM": {
        return <CurrencyIcon currency="ETH" />;
      }
      default: {
        return null;
      }
    }
  }, [network]);

  if (price === undefined) return null;

  return (
    <SchedulePriceWrapper>
      {networkIcon}
      <SchedulePriceText>
        {price === 0 ? (
          <FormattedMessage id="price_free_mint" />
        ) : (
          <>
            {Number(price.toFixed(DEFAULT_MAX_PRICE_DECIMALS_LIMIT))} {currency}
          </>
        )}
      </SchedulePriceText>
    </SchedulePriceWrapper>
  );
};

export default React.memo(SchedulePrice);
