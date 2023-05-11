import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";
import { SkeletonBox, SkeletonRatioBox } from "../../skeleton";

const CellBodyTitleSkeleton = styled(SkeletonBox)`
  margin: ${px2rem(8)} 0 ${px2rem(4)};
`;

const Skeleton = function Skeleton() {
  return (
    <div>
      <SkeletonRatioBox ratio="1:1" />
    </div>
  );
};

export default React.memo(Skeleton);

export function CryptobadgeItemCellBodySkeleton() {
  return (
    <div>
      <CellBodyTitleSkeleton width="60%" height={px2rem(16)} />
    </div>
  );
}
