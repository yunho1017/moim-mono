import * as React from "react";
import styled from "styled-components";
import { FundOnSaleStatusText, NormalStatusText, SoldOutText } from "./styled";
import DDayComponent, { calculateDDay } from "common/components/period";

import useProductStatusLabel from "common/components/commerce/statusLabel";
import { px2rem } from "common/helpers/rem";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(2)} 0;
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
`;

interface IProps {
  className?: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  status: Moim.Commerce.PRODUCT_STATUS;
  sellingStart?: number;
  sellingEnd?: number;
  block: Moim.Component.ProductItem.IStatus;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Status = React.memo(
  ({
    className,
    productType,
    status,
    sellingStart,
    sellingEnd,
    horizontalAlign,
  }: IProps) => {
    const { scheduledText, completedText, soldOutText } = useProductStatusLabel(
      productType,
    );

    const el = React.useMemo(() => {
      switch (status) {
        case "onSale": {
          if (productType === "fund" && sellingEnd) {
            const dDayData = calculateDDay({
              startTime: sellingStart,
              endTime: sellingEnd,
            });

            return (
              <Wrapper className={className} horizontalAlign={horizontalAlign}>
                <FundOnSaleStatusText>
                  <DDayComponent dDay={dDayData} />
                </FundOnSaleStatusText>
              </Wrapper>
            );
          }
          return null;
        }
        case "scheduled": {
          return (
            <Wrapper className={className} horizontalAlign={horizontalAlign}>
              <NormalStatusText>{scheduledText}</NormalStatusText>
            </Wrapper>
          );
        }
        case "completed": {
          return (
            <Wrapper className={className} horizontalAlign={horizontalAlign}>
              <SoldOutText>{completedText}</SoldOutText>
            </Wrapper>
          );
        }
        case "soldOut": {
          return (
            <Wrapper className={className} horizontalAlign={horizontalAlign}>
              <SoldOutText>{soldOutText}</SoldOutText>
            </Wrapper>
          );
        }
      }
    }, [horizontalAlign, productType, status, sellingStart, sellingEnd]);
    return el;
  },
);

export default Status;
