import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import RawHlsVideo from "common/components/hlsVideo";
import { useRegisterWindowResizeCallback } from "common/hooks/useWindowSize";
import useIsMobile from "common/hooks/useIsMobile";

const MAX_MEDIA_WIDTH = 456;
const COMMON_PADDING = 64;
interface IProps {
  url: string;
  name: string;
  poster: string;
  metadata?: Moim.NFT.INftMetaData;
  onClick(): void;
}

export const MediaWrapper = styled.div.attrs({ role: "button" })`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(4)};
  overflow: hidden;
  margin-bottom: ${px2rem(16)};
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
`;

const Media = ({ url, name, poster, metadata, onClick }: IProps) => {
  const isMobile = useIsMobile();
  const [isVideo, setIsVideo] = React.useState<boolean>(
    metadata?.mimeType?.includes("video") ?? false,
  );
  const [, setLoadStatus] = React.useState<boolean>(true);
  const [imgSrc, setImgSrc] = React.useState<string>(url);
  const [mediaWidth, setMediaWidth] = React.useState<number>(
    window.innerWidth - COMMON_PADDING,
  );

  const handleLoad = React.useCallback(() => {
    setLoadStatus(true);
  }, []);
  const handleLoadStart = React.useCallback(() => {
    setLoadStatus(true);
  }, []);
  const handleError = React.useCallback(() => {
    if (isVideo) {
      setIsVideo(false);
      setImgSrc(poster);
    }
    setLoadStatus(true);
  }, [isVideo, poster]);

  const handleStopPropagation: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
    },
    [],
  );

  const mediaSize = React.useMemo(() => {
    const originWidth: number = Number(metadata?.width);
    const originHeight: number = Number(metadata?.height);
    if (isMobile) {
      return {
        width: mediaWidth,
        height: (mediaWidth / originWidth) * originHeight,
      };
    }
    return {
      width: MAX_MEDIA_WIDTH,
      height: (MAX_MEDIA_WIDTH / originWidth) * originHeight,
    };
  }, [isMobile, mediaWidth, metadata?.height, metadata?.width]);

  useRegisterWindowResizeCallback(({ width }) => {
    if (isMobile) {
      const intWidth = Math.round(width);
      setMediaWidth(intWidth - COMMON_PADDING);
    }
  });

  const mediaElement = React.useMemo(
    () =>
      isVideo ? (
        <RawHlsVideo
          sources={[
            {
              src: imgSrc,
              type: metadata?.mimeType,
            },
          ]}
          isAudio={true}
          poster={poster ?? ""}
          width={mediaSize.width}
          height={mediaSize.height}
          controls={true}
          onError={handleError}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
        />
      ) : (
        <StyledImage
          role="button"
          data-role={`brochure-thumbnail-${imgSrc}`}
          src={imgSrc}
          alt={name}
          onClick={onClick}
          width={564}
          height={564}
          onLoad={handleLoad}
        />
      ),
    [
      isVideo,
      imgSrc,
      metadata?.mimeType,
      poster,
      mediaSize.width,
      mediaSize.height,
      handleError,
      handleLoadStart,
      handleLoad,
      name,
      onClick,
    ],
  );

  return (
    <div onClick={handleStopPropagation}>
      <MediaWrapper>{mediaElement}</MediaWrapper>
    </div>
  );
};

export default React.memo(Media);
