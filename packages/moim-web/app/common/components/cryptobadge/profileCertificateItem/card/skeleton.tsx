import styled from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

export const BadgeSkeleton = styled(SkeletonBox).attrs({
  width: "100%",
  height: px2rem(180),
})``;
