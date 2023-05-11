import React from "react";
import styled from "styled-components";
import CurrencyFormatter from "common/components/currencyFormatter";

import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const Price = styled.span`
  & + &::before {
    content: "+";
    margin: 0 ${px2rem(4)};
    display: inline-block;
  }

  display: inline-flex;
  align-items: center;
  gap: ${px2rem(4)};
`;

const CoinImage = styled.img<{ size: number }>`
  width: ${props => px2rem(props.size)};
  height: ${props => px2rem(props.size)};
  object-fit: cover;
  border-radius: 50%;
`;

interface IAdditionalFeeProps {
  additionalFee: Moim.Commerce.IProductAdditionalFee;
}
export function AdditionalFee({ additionalFee }: IAdditionalFeeProps) {
  const coinId = additionalFee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }
  return (
    <Price>
      <span>{additionalFee.amount}</span>
      <span>{coin?.symbol}</span>
    </Price>
  );
}

export function AdditionalFeeWithPreview({
  additionalFee,
  size = 16,
}: IAdditionalFeeProps & { size?: number }) {
  const coinId = additionalFee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }
  return (
    <Price>
      <span>{additionalFee.amount}</span>
      <span>{coin?.symbol}</span>

      <CoinImage size={size} src={coin.preview?.XS} alt={coin.name} />
    </Price>
  );
}

export const AdditionalFeeWithLargePreview: typeof AdditionalFeeWithPreview = props => (
  <AdditionalFeeWithPreview {...props} size={24} />
);

interface IProps {
  currency: string;
  price: string | number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
  visibleFiatPrice?: boolean;
  AdditionalFeeComponent?: React.ComponentType<IAdditionalFeeProps>;
  children?: (prices: React.ReactNode[]) => React.ReactNode;
}

export function PriceWithAdditionalFees({
  currency,
  price,
  additionalFees,
  visibleFiatPrice,
  AdditionalFeeComponent,
  children,
}: IProps) {
  const el: React.ReactNode[] = [];
  const availableAdditionalFees =
    additionalFees?.filter(fee => fee.type === "coin" && fee.resourceId) ?? [];
  if (
    visibleFiatPrice ||
    Number(price) !== 0 ||
    !availableAdditionalFees.length
  ) {
    el.push(
      <Price key="fiat_price">
        <CurrencyFormatter currency={currency} value={price} />
      </Price>,
    );
  }

  el.push(
    ...availableAdditionalFees?.map(fee => {
      if (AdditionalFeeComponent) {
        return (
          <AdditionalFeeComponent
            key={`${fee.resourceId}_${fee.amount}`}
            additionalFee={fee}
          />
        );
      }
      return (
        <AdditionalFee
          key={`${fee.resourceId}_${fee.amount}`}
          additionalFee={fee}
        />
      );
    }),
  );

  if (typeof children === "function") {
    return <>{children(el)}</>;
  }

  return <>{el}</>;
}
