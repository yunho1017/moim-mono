import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";
import { SkeletonBox, SkeletonRatioBox } from "../skeleton";

const TitleSkeleton = styled(SkeletonBox)`
  margin: ${px2rem(4)} 0;
`;

const TextSkeleton = styled(SkeletonBox)`
  margin-bottom: ${px2rem(4)};
`;

const CellBodyTitleSkeleton = styled(SkeletonBox)`
  margin: ${px2rem(8)} 0 ${px2rem(4)};
`;

const Skeleton = function Skeleton() {
  return (
    <div>
      <SkeletonRatioBox ratio="1:1" />
      <TitleSkeleton width="60%" height={px2rem(16)} />
      <TextSkeleton width="100%" height={px2rem(16)} />
      <SkeletonBox width="80%" height={px2rem(16)} />
    </div>
  );
};

export default React.memo(Skeleton);

export function NFTItemCellBodySkeleton() {
  return (
    <div>
      <CellBodyTitleSkeleton width="60%" height={px2rem(16)} />
      <TextSkeleton width="100%" height={px2rem(16)} />
      <SkeletonBox width="80%" height={px2rem(16)} />
    </div>
  );
}
