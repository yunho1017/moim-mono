import React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// helper
import { px2rem } from "common/helpers/rem";
// components
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";
// styled
import { Left, Right, Wrapper } from "./styled";

export const TopSkeleton = React.memo(() => {
  const isMobile = useIsMobile();

  return (
    <Wrapper>
      <Left>
        {isMobile && <Spacer value={20} />}
        <SkeletonBox
          width="100%"
          height={!isMobile ? px2rem(565) : px2rem(343)}
        />
      </Left>
      <Right>
        {!isMobile && <Spacer value={60} />}
        <SkeletonBox width="30%" height={px2rem(18)} />

        <Spacer value={16} />
        <SkeletonBox width="40%" height={px2rem(30)} />

        <Spacer value={16} />
        <SkeletonBox width="60%" height={px2rem(18)} />

        <Spacer value={16} />
        <SkeletonBox width="34%" height={px2rem(18)} />

        {isMobile && <Spacer value={16} />}
      </Right>
    </Wrapper>
  );
});

export default React.memo(TopSkeleton);
