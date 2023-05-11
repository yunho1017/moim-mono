import React from "react";
import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";

const imageSkeletonStyle = css`
  padding-top: 100%;
  margin-bottom: ${px2rem(4)};
`;

export default function Skeleton() {
  return (
    <div>
      <SkeletonBox width="100%" overrideStyle={imageSkeletonStyle} />
      <SkeletonBox width="100%" height={px2rem(20)} />
    </div>
  );
}
