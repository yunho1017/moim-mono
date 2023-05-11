import React from "react";
import { FlexWrapper, SkeletonCircleBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

export const BadgeSkeleton = React.memo(() => {
  return (
    <FlexWrapper flexDirection="column" alignItems="center">
      <SkeletonCircleBox size={px2rem(64)} />
    </FlexWrapper>
  );
});
export const BadgeSmallSkeleton = React.memo(() => {
  return (
    <FlexWrapper flexDirection="column" alignItems="center">
      <SkeletonCircleBox size={px2rem(36)} />
    </FlexWrapper>
  );
});
