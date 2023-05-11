import { px2rem } from "common/helpers/rem";
import React from "react";
import styled, { css } from "styled-components";
import { FlexWrapper, SkeletonBox } from "common/components/skeleton";
import { Spacer, SpacerVertical } from "common/components/designSystem/spacer";
import { parseRatio } from "common/components/thread/components/wrapper/thumbnail";

const ImageSkeleton = styled(SkeletonBox)<{
  thumbnailConfig: Moim.Forum.IForumThumbnailConfig;
}>`
  ${props => {
    const totalPercent =
      props.thumbnailConfig.position === "left" ||
      props.thumbnailConfig.position === "right"
        ? 20
        : 100;
    if (props.thumbnailConfig.type === "ratio") {
      const { width, height } = parseRatio(
        props.thumbnailConfig.value ?? "5:3",
      );
      return css`
        height: 0;
        width: ${totalPercent}%;
        padding-top: ${Math.round(totalPercent * (height / width))}%;
      `;
    }

    return css`
      width: ${totalPercent}%;
      padding-top: ${totalPercent}%;
    `;
  }}
`;

const TextSkeletonWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const Wrapper = styled.div<{
  showThumbnail: boolean;
  thumbnailConfig: Moim.Forum.IForumThumbnailConfig;
}>`
  width: 100%;
  height: 100%;

  gap: ${px2rem(16)};
  ${props => {
    if (!props.showThumbnail) {
      return;
    }
    switch (props.thumbnailConfig.position) {
      case "top":
        return css`
          display: flex;
          flex-direction: column;
        `;
      case "bottom":
        return css`
          display: flex;
          flex-direction: column-reverse;
        `;
      case "left":
        return css`
          display: flex;
          flex-direction: row;
        `;
      case "right":
        return css`
          display: flex;
          flex-direction: row-reverse;
        `;
    }
  }}
`;

export function PostCellSkeleton({
  showThumbnail,
  thumbnailConfig,
}: {
  showThumbnail: boolean;
  thumbnailConfig: Moim.Forum.IForumThumbnailConfig;
}) {
  return (
    <Wrapper
      className="postCellSkeleton"
      showThumbnail={showThumbnail}
      thumbnailConfig={thumbnailConfig}
    >
      {showThumbnail && (
        <ImageSkeleton width="100%" thumbnailConfig={thumbnailConfig} />
      )}
      <TextSkeletonWrapper>
        <TextSkeleton />
      </TextSkeletonWrapper>
    </Wrapper>
  );
}

function TextSkeleton() {
  return (
    <FlexWrapper flexDirection="column">
      <SkeletonBox width="90%" height={px2rem(14)} />
      <Spacer value={8} />
      <SkeletonBox width="100%" height={px2rem(14)} />
      <Spacer value={8} />
      <FlexWrapper>
        <SkeletonBox width="60px" height={px2rem(16)} />
        <SpacerVertical value={6} />
        <SkeletonBox width="60px" height={px2rem(16)} />
      </FlexWrapper>
    </FlexWrapper>
  );
}
