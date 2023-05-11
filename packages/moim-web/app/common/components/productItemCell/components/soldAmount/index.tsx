import React from "react";
import styled from "styled-components";

import CurrencyFormatter from "common/components/currencyFormatter";
import { H10Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const AchieveText = styled(H10Bold)<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  color: ${props => props.theme.colorV2.accent};
  padding: ${px2rem(2)} 0;

  & > span + span {
    &::before {
      content: "·";
      display: inline-block;
      margin: 0 ${px2rem(4)};
    }
  }
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
`;

interface IProps {
  className?: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  currency: string;
  goalAmount?: number;
  soldAmount: number;

  block: Moim.Component.ProductItem.ISoldAmount;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const SoldAmount = ({
  className,
  productType,
  goalAmount,
  soldAmount,
  currency,
  block,
  horizontalAlign,
}: IProps) => {
  if (productType !== "fund") {
    return null;
  }

  const showPercentage = block.showPercentage ?? true;
  const showAmount = block.showAmount ?? true;
  const achieveRate = goalAmount
    ? Math.round((soldAmount / goalAmount) * 100)
    : 0;

  return (
    <AchieveText className={className} horizontalAlign={horizontalAlign}>
      {showPercentage && <span>{achieveRate}%</span>}

      {showAmount && (
        <span>
          <CurrencyFormatter currency={currency} value={soldAmount} />
        </span>
      )}
    </AchieveText>
  );
};

export default React.memo(SoldAmount);
