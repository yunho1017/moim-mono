import { px2rem } from "common/helpers/rem";
import React from "react";
import styled, { css } from "styled-components";
import { SkeletonBox } from "../skeleton";
import { Wrapper as ProductItemWrapper } from "./components/wrapper/styled";

const imageSkeletonStyle = css`
  padding-top: 100%;
  margin-bottom: ${px2rem(8)};
`;

const textSkeletonStyle = css`
  margin-bottom: ${px2rem(8)};
`;
const Wrapper = styled(ProductItemWrapper)`
  .inner {
    display: flex;
    flex-direction: column;
  }

  ${props =>
    props.direction === "row" &&
    css`
      gap: ${px2rem(8)};
    `}
`;

const Skeleton = function Skeleton({
  direction,
}: {
  direction?: "row" | "column";
}) {
  return (
    <Wrapper direction={direction}>
      <SkeletonBox width="100%" overrideStyle={imageSkeletonStyle} />
      <div className="inner">
        <SkeletonBox
          width="100%"
          height={px2rem(20)}
          overrideStyle={textSkeletonStyle}
        />
        <SkeletonBox
          width="100%"
          height={px2rem(20)}
          overrideStyle={textSkeletonStyle}
        />
        <SkeletonBox width="80%" height={px2rem(20)} />
      </div>
    </Wrapper>
  );
};

export default React.memo(Skeleton);
