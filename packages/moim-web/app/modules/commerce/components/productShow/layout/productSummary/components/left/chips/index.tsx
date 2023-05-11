import * as React from "react";

import ShavedText from "common/components/shavedText";

import {
  TimeSaleChipContainer,
  TimeSaleChip,
  CoinChip,
  CoinImage,
} from "./styled";
import { useStoreState } from "app/store";

type ThumbnailChipType =
  | {
      type: "coin";
      value: { type: "coin"; resourceId?: Moim.Id };
    }
  | { type: "productSet"; value: Moim.Commerce.ITimeSaleEntity };

const CoinChipComponent: React.FC<{ coinId: Moim.Id }> = ({ coinId }) => {
  const coin = useStoreState(state => state.entities.community_coins[coinId]);

  if (!coin) {
    return null;
  }

  return (
    <CoinChip badgeColor={coin.preview?.hexCode} scale={coin.preview?.fogType}>
      {coin.preview?.XS ? (
        <CoinImage>
          <img src={coin.preview?.XS} alt={coin.name} />
        </CoinImage>
      ) : null}
      <ShavedText line={1} value={coin.name} />
    </CoinChip>
  );
};
interface IProps {
  productId: string;
  productSets?: Moim.Commerce.ITimeSaleEntity[];
}

const HeaderChips = ({ productId, productSets }: IProps) => {
  const additionalFeeInfos = useStoreState(
    state => state.entities.commerce_product[productId]?.additionalFeeInfos,
  );
  const chips: ThumbnailChipType[] = React.useMemo(() => {
    const availableProductSetChips =
      productSets
        ?.filter(prdSet => prdSet.badgeText)
        .reverse()
        .map<ThumbnailChipType>(productSet => ({
          type: "productSet",
          value: productSet,
        })) ?? [];
    const availableAdditionalFeeInfoChips =
      additionalFeeInfos
        ?.filter(info => info.type === "coin" && info.resourceId)
        .map<ThumbnailChipType>(info => ({ type: "coin", value: info })) ?? [];

    return [...availableProductSetChips, ...availableAdditionalFeeInfoChips];
  }, [additionalFeeInfos, productSets]);

  if (!chips?.length) {
    return null;
  }

  return (
    <TimeSaleChipContainer>
      {chips.map(({ type, value }) => {
        if (type === "productSet") {
          return (
            <TimeSaleChip
              key={`event_${value.id}`}
              badgeColor={value.badgeBackgroundColor}
            >
              <ShavedText line={1} value={value.badgeText} />
            </TimeSaleChip>
          );
        }

        return (
          <CoinChipComponent
            key={`coin_${value.resourceId}`}
            coinId={value.resourceId!}
          />
        );
      })}
    </TimeSaleChipContainer>
  );
};
export default React.memo(HeaderChips);
