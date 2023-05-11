import * as React from "react";
import styled from "styled-components";
// helpers
import { px2rem } from "common/helpers/rem";
// components
import { SkeletonBox, SkeletonCircleBox } from "common/components/skeleton";

const SkeletonHolderWrapper = styled.div`
  height: ${px2rem(52)};
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
  padding: 0 ${px2rem(16)};
`;

export const UserSkeleton: React.FC = () => (
  <SkeletonHolderWrapper>
    <SkeletonCircleBox size={px2rem(36)} />
    <SkeletonBox width="30%" height={px2rem(22)} />
  </SkeletonHolderWrapper>
);
