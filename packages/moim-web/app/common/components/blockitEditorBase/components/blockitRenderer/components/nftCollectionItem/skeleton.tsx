import * as React from "react";
import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Inner,
  NftCollectionItemContainer,
  NftCollectionItemWrapper,
} from "./styled";
import CollectionItemBanner from "./components/banner";

const titleSkeletonStyle = css`
  border-radius: ${px2rem(4)};
  width: ${px2rem(165)};
`;

export const Skeleton: React.FC = () => (
  <Inner>
    <NftCollectionItemWrapper>
      <CollectionItemBanner />
      <NftCollectionItemContainer>
        <Spacer value={10} />
        <SkeletonBox height={px2rem(20)} overrideStyle={titleSkeletonStyle} />
        <Spacer value={10} />
        <SkeletonBox height={px2rem(16)} width="100%" />
        <Spacer value={6} />
        <SkeletonBox height={px2rem(16)} width="60%" />
        <Spacer value={16} />
        <SkeletonBox height={px2rem(60)} width="100%" />
      </NftCollectionItemContainer>
    </NftCollectionItemWrapper>
  </Inner>
);

export default React.memo(Skeleton);
