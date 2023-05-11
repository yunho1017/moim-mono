import React from "react";
import styled from "styled-components";
import { getTextComponent } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import CurrencyFormatter from "common/components/currencyFormatter";
import { getFlexAlignStyle } from "../wrapper/styled";

const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  display: flex;
  width: 100%;
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;

export const DiscountPercentage = styled.span`
  color: ${props => props.theme.color.red700};
  margin-right: ${px2rem(2)};
`;

export const OriginPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colorV2.colorSet.grey200};
`;

interface IProps {
  className?: string;
  rawOriginPrice?: number;
  rawPrice: number;
  originPrice?: Moim.Commerce.IProductPrice;
  block: Moim.Component.ProductItem.IDiscountPrice;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const DiscountPrice = ({
  className,
  rawPrice,
  rawOriginPrice,
  originPrice,
  block,
  horizontalAlign,
}: IProps) => {
  if (!(rawOriginPrice && rawOriginPrice !== rawPrice)) {
    return null;
  }

  const Text = getTextComponent(block.textStyle ?? "body3");

  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <Text>
        <DiscountPercentage>
          {((1 - rawPrice / rawOriginPrice) * 100).toFixed(0)}%
        </DiscountPercentage>
        <OriginPrice>
          <CurrencyFormatter
            currency={originPrice?.currency}
            value={originPrice?.value}
          />
        </OriginPrice>
      </Text>
    </Wrapper>
  );
};

export default React.memo(DiscountPrice);
