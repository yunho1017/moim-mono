import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";

const ImageSkeleton = styled(SkeletonBox)`
  padding-top: 100%;
  margin-bottom: ${px2rem(4)};
`;

export default function Skeleton() {
  return (
    <div>
      <ImageSkeleton width="100%" />
      <SkeletonBox width="100%" height={px2rem(20)} />
    </div>
  );
}
