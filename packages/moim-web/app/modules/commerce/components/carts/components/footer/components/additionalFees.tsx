import React from "react";

import { H10Bold } from "common/components/designSystem/typos";
import { useStoreState } from "app/store";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

interface IProps {
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

const Fees = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Fee = styled(H10Bold)`
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bolder};
  & + &::before {
    content: "+";
    margin: 0 ${px2rem(4)};
    display: inline-block;
  }

  display: inline-flex;
  align-items: center;
  gap: ${px2rem(4)};
`;

const CoinImage = styled.img`
  width: ${px2rem(16)};
  height: ${px2rem(16)};
  object-fit: cover;
  border-radius: 50%;
`;
const FeeItem: React.FC<{ fee: Moim.Commerce.IProductAdditionalFee }> = ({
  fee,
}) => {
  const coinId = fee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }
  return (
    <Fee>
      <span>{fee.amount}</span>
      <span>{coin?.symbol}</span>
      <CoinImage src={coin.preview?.XS} alt={coin.name} />
    </Fee>
  );
};
export default function AdditionalFees({ additionalFees }: IProps) {
  const availableFees = React.useMemo(
    () => additionalFees?.filter(fee => fee.type === "coin" && fee.resourceId),
    [additionalFees],
  );
  if (!availableFees?.length) {
    return null;
  }
  return (
    <Fees>
      {availableFees?.map(fee => (
        <FeeItem key={`${fee.resourceId}_${fee.amount}`} fee={fee} />
      ))}
    </Fees>
  );
}
