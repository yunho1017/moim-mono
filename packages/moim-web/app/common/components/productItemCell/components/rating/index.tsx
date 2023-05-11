import React from "react";
import styled from "styled-components";
import RatingBase from "@material-ui/lab/Rating";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import numberWithComma from "common/helpers/numberWithComma";
import { getFlexAlignStyle } from "../wrapper/styled";

const Wrapper = styled(B4Regular)<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  display: flex;

  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;

interface IProps {
  className?: string;
  avgRate: number;
  reviewsCount: number;
  block: Moim.Component.ProductItem.IRating;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Rating = ({
  className,
  avgRate,
  reviewsCount,
  horizontalAlign,
}: IProps) => {
  if (true) {
    return null;
  }
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <RatingBase precision={0.5} readOnly={true} value={avgRate} /> (
      {numberWithComma(reviewsCount)})
    </Wrapper>
  );
};

export default React.memo(Rating);
