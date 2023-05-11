import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import numberWithComma from "common/helpers/numberWithComma";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const Wrapper = styled(B4Regular)<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(2)} 0;

  width: 100%;
  display: inline-block;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
`;

interface IProps {
  className?: string;
  soldCount?: number;
  stockCount?: number;
  block: Moim.Component.ProductItem.IStockCount;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const StockCount = ({
  className,
  soldCount,
  stockCount,
  horizontalAlign,
}: IProps) => {
  if (stockCount === undefined) {
    return null;
  }
  const totalCount = stockCount + (soldCount ?? 0);
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <FormattedMessage
        id="status_stock_count_left"
        values={{
          quantity: numberWithComma(totalCount ?? 0),
          quantity_left: numberWithComma(stockCount),
        }}
      />
    </Wrapper>
  );
};

export default React.memo(StockCount);
