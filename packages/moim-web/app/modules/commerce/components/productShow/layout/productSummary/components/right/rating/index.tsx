import React from "react";
import { Rating as RatingComponent } from "@material-ui/lab";

import { Review } from "./styled";

interface IProps {
  block: Moim.Component.ProductShow.IRating;
  rating?: number;
  reviewsCount?: number;
}
export default function Rating({
  block,

  reviewsCount,
  rating,
}: IProps) {
  if (false && rating && reviewsCount) {
    return (
      <Review hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}>
        <RatingComponent precision={0.5} readOnly={true} value={rating} /> (
        {reviewsCount})
      </Review>
    );
  }

  return null;
}
