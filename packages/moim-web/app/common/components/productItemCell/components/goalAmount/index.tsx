import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";
import { B4Regular } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const AchieveText = styled(B4Regular)<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(2)} 0;
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
`;

interface IProps {
  className?: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  currency: string;
  goalAmount?: number;

  block: Moim.Component.ProductItem.IGoalAmount;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const GoalAmount = ({
  className,
  productType,
  goalAmount,
  currency,
  horizontalAlign,
}: IProps) => {
  if (productType !== "fund") {
    return null;
  }

  return (
    <AchieveText className={className} horizontalAlign={horizontalAlign}>
      <FormattedMessage
        id="price_funding_goal"
        values={{
          goal: (
            <CurrencyFormatter currency={currency} value={goalAmount ?? 0} />
          ),
        }}
      />
    </AchieveText>
  );
};

export default React.memo(GoalAmount);
