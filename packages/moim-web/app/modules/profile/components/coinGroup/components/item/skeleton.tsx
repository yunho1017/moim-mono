import React from "react";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

export const CoinItemSkeleton = () => (
  <SkeletonBox width="100%" height={px2rem(60)} />
);
