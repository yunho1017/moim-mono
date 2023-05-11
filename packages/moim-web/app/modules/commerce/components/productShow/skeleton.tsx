import React from "react";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

export function TabContentSkeleton() {
  return <SkeletonBox width="100%" height={px2rem(440)} />;
}
