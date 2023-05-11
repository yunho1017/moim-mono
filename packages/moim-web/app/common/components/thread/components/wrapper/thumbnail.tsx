import * as React from "react";
import styled, { css } from "styled-components";
import PlayIconBase from "@icon/48-play.svg";
import { px2rem } from "common/helpers/rem";
const DEFAULT_WIDTH_RATIO = 5;
const DEFAULT_HEIGHT_RATIO = 3;
const REGEX_RATIO_PARAMS = /(type=ratio&value=[0-9]:[0-9])/g;

const PlayIcon = styled(PlayIconBase).attrs({
  size: "l",
  touch: 48,
})``;

const PlayIconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function replaceRatio(src?: string, ratio?: string) {
  return src && ratio
    ? decodeURIComponent(src).replace(
        REGEX_RATIO_PARAMS,
        `type=ratio&value=${encodeURIComponent(ratio)}`,
      )
    : src;
}
export function parseRatio(value?: string) {
  let widthRatio = DEFAULT_WIDTH_RATIO;
  let heightRatio = DEFAULT_HEIGHT_RATIO;
  if (value) {
    const ratio = value.split(":");
    widthRatio = parseInt(ratio[0], 10) || DEFAULT_WIDTH_RATIO;
    heightRatio = parseInt(ratio[1], 10) || DEFAULT_HEIGHT_RATIO;
  }

  return {
    width: widthRatio,
    height: heightRatio,
  };
}

const ImageContent = styled.div<{ ratio?: string }>`
  position: relative;
  width: 100%;
  ${props => {
    const { width, height } = parseRatio(props.ratio);
    return css`
      height: 0;
      padding-top: ${Math.round(100 * (height / width))}%;
    `;
  }}
`;

export function ThreadThumbnailWrapper({
  children,
  ratio: stringRatio,
  thumbnail,
  thumbnailScale,
  className,
  isVideo,
}: {
  children: (src?: string, srcSet?: string) => React.ReactElement<HTMLElement>;
  thumbnail?: Moim.Forum.IThumbnail;
  thumbnailScale?: Moim.ImageScaleType;
  ratio?: string;
  className?: string;
  isVideo?: boolean;
}) {
  const replacedSrc = React.useMemo(
    () =>
      thumbnailScale
        ? replaceRatio(
            thumbnail?.[`url_${thumbnailScale}` as keyof Moim.Forum.IThumbnail],
            stringRatio,
          )
        : undefined,
    [thumbnail, stringRatio],
  );

  const replacedSrcSet = React.useMemo(
    () =>
      !replacedSrc ? replaceRatio(thumbnail?.src_set, stringRatio) : undefined,
    [thumbnail?.src_set, replacedSrc, stringRatio],
  );

  return (
    <ImageContent ratio={stringRatio} className={className}>
      {children(replacedSrc, replacedSrcSet)}
      {isVideo && (
        <PlayIconWrapper>
          <PlayIcon />
        </PlayIconWrapper>
      )}
    </ImageContent>
  );
}

export default Image;
