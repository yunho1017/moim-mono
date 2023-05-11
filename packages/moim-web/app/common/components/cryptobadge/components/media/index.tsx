import React from "react";
import videojs from "video.js";
import styled, { FlattenInterpolation } from "styled-components";
import { useActions } from "app/store";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import { MEDIA_QUERY } from "common/constants/responsive";
// components
import { SkeletonBox } from "common/components/skeleton";
import { SkeletonContainer } from "common/components/mediaWrapper/styledComponents";
import VideoPlayer from "./video";

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MediaWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  ${SkeletonContainer} {
    position: relative;
  }
`;

const StyledSkeletonBox = styled(SkeletonBox)`
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: zoom-in;
`;

interface PropsType {
  src?: string;
  alt?: string;
  poster?: string;
  isVideo?: boolean;
  videoOptions?: videojs.PlayerOptions;
  videoStyle?: FlattenInterpolation<any>;
}

const Media: React.FC<PropsType> = ({
  src,
  alt,
  poster,
  isVideo,
  videoOptions,
  videoStyle,
}) => {
  const [isLoaded, setLoadStatus] = React.useState<boolean>(true);
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
  });

  const handleClickMedia = React.useCallback(
    e => {
      if (src) {
        e.currentTarget.dataset.brochureSelected = "true";
        e.currentTarget.dataset.hideActionButton = "true";
        openImageBrochure(src);
      }
    },
    [openImageBrochure, src],
  );

  const handleLoad = React.useCallback(() => {
    setLoadStatus(true);
  }, []);

  const mediaElements = React.useMemo(() => {
    if (isVideo) {
      return (
        <VideoPlayer
          options={{
            sources: [
              {
                src: src ?? "",
              },
            ],
            poster: poster ?? "",
            userActions: {
              click: handleClickMedia,
            },
            ...videoOptions,
          }}
          videoStyle={videoStyle}
        />
      );
    } else {
      return (
        <StyledImage
          role="button"
          data-role={`brochure-thumbnail-${src}`}
          src={src}
          alt={alt}
          onClick={handleClickMedia}
          onLoad={handleLoad}
        />
      );
    }
  }, [
    isVideo,
    src,
    poster,
    handleClickMedia,
    videoOptions,
    videoStyle,
    alt,
    handleLoad,
  ]);

  return (
    <Wrapper>
      <MediaWrapper>
        {!isLoaded && <StyledSkeletonBox />}
        {mediaElements}
      </MediaWrapper>
    </Wrapper>
  );
};
export default Media;
