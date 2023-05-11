import * as React from "react";
import styled from "styled-components";
import TimeSaleTimerComponent from "app/modules/commerce/components/productShow/layout/productSummary/components/right/timeSaleTimer";
import { px2rem } from "common/helpers/rem";
import { getFlexAlignStyle } from "../wrapper/styled";

const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(4)} 0;
  display: flex;
  width: 100%;
  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;

const StyledTimeSaleTimerComponent = styled(TimeSaleTimerComponent)`
  width: 100%;
  padding: 0;
`;
interface IProps {
  className?: string;
  productSets?: Moim.Commerce.ITimeSaleEntity[];
  block: Moim.Component.ProductItem.ITimer;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const TimeSaleTimer = ({ className, productSets, horizontalAlign }: IProps) => {
  if (
    Boolean(productSets?.length) &&
    productSets?.some(set => set.showTimeSaleTimer && set.timeSaleEndAt)
  ) {
    return (
      <Wrapper className={className} horizontalAlign={horizontalAlign}>
        <StyledTimeSaleTimerComponent size="small" productSets={productSets} />
      </Wrapper>
    );
  }

  return null;
};

export default React.memo(TimeSaleTimer);
