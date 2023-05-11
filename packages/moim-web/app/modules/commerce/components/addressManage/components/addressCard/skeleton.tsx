import * as React from "react";
import { css } from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import { Wrapper, CardFrame, Header, Body, TitleContainer } from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

const basicSkeletonStyle = css`
  display: block !important;
`;

const AddressCardSkeleton: React.FC = ({}) => {
  return (
    <Wrapper>
      <CardFrame>
        <Header>
          <TitleContainer>
            <SkeletonBox
              width={px2rem(100)}
              height={px2rem(18)}
              overrideStyle={basicSkeletonStyle}
            />
          </TitleContainer>
          <SkeletonBox
            width={px2rem(64)}
            height={px2rem(32)}
            overrideStyle={basicSkeletonStyle}
          />
        </Header>
        <Body>
          <SkeletonBox
            width={px2rem(208)}
            height={px2rem(18)}
            overrideStyle={basicSkeletonStyle}
          />
          <Spacer value={8} />
          <SkeletonBox
            width={px2rem(232)}
            height={px2rem(18)}
            overrideStyle={basicSkeletonStyle}
          />
          <Spacer value={8} />
          <SkeletonBox
            width={px2rem(146)}
            height={px2rem(18)}
            overrideStyle={basicSkeletonStyle}
          />
        </Body>
      </CardFrame>
    </Wrapper>
  );
};

export default AddressCardSkeleton;
