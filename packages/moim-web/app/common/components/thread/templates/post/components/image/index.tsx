import * as React from "react";
import styled from "styled-components";

import FallbackImage from "common/components/fallbackImage";
import { ThreadThumbnailWrapper } from "common/components/thread/components/wrapper/thumbnail";

import { px2rem } from "common/helpers/rem";

interface IProps {
  thumbnail?: Moim.Forum.IThumbnail;
  thumbnailScale?: Moim.ImageScaleType;
  ratio?: string;
  isVideo?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}

const StyledImage = styled.img.attrs<IProps>({ loading: "lazy" })`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
`;

const FallbackImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  img {
    height: initial !important;
  }
`;

const Wrapper = styled.div<{
  position?: "left" | "right" | "top" | "bottom";
}>`
  width: ${props =>
    props.position === "left" || props.position === "right"
      ? px2rem(100)
      : "100%"};
`;

function Image({
  thumbnail,
  thumbnailScale,
  ratio,
  position,
  isVideo,
}: IProps) {
  return (
    <Wrapper position={position}>
      <ThreadThumbnailWrapper
        ratio={ratio}
        thumbnail={thumbnail}
        thumbnailScale={thumbnailScale}
        isVideo={isVideo}
      >
        {(src, srcSet) =>
          src || srcSet ? (
            <StyledImage src={src} srcSet={srcSet} />
          ) : (
            <FallbackImageWrapper>
              <FallbackImage />
            </FallbackImageWrapper>
          )
        }
      </ThreadThumbnailWrapper>
    </Wrapper>
  );
}

export default React.memo(Image);
