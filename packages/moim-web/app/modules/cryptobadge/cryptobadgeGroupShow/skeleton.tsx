import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox, SkeletonRatioBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";

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

export const CryptobadgeItemCellBodySkeleton: React.FC = () => (
  <div>
    <Spacer value={10} />
    <CellBodyTitleSkeleton width="60%" height={px2rem(32)} />
    <CellBodyTitleSkeleton width="80%" height={px2rem(24)} />
    <Spacer value={10} />
  </div>
);
