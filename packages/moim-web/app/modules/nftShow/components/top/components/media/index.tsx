import React from "react";
import videojs from "video.js";
import styled, { FlattenInterpolation } from "styled-components";
import { useActions } from "app/store";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
// components
import { SkeletonBox } from "common/components/skeleton";
import { SkeletonContainer } from "common/components/mediaWrapper/styledComponents";
import VideoPlayer from "./video";

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: ${px2rem(4)};
  box-shadow: ${props => props.theme.shadow.whiteElevated2};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
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
  border-radius: ${px2rem(4)};
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: zoom-in;
`;

const StyledImageSvg = styled.div`
  display: block;
`;

interface PropsType {
  src?: string;
  alt?: string;
  poster?: string;
  metaData?: Moim.NFT.INftMetaData;
  videoOptions?: videojs.PlayerOptions;
  videoStyle?: FlattenInterpolation<any>;
}

const Media: React.FC<PropsType> = ({
  src,
  alt,
  poster,
  metaData,
  videoOptions,
  videoStyle,
}) => {
  const isVideo: boolean =
    Boolean(metaData?.mimeType?.includes("video")) ?? false;
  const [isLoaded, setLoadStatus] = React.useState<boolean>(true);
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
  });
  const handleClickImage: React.MouseEventHandler<HTMLImageElement> = React.useCallback(
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
                type: metaData?.mimeType,
              },
            ],
            poster: poster ?? "",
            ...videoOptions,
          }}
          videoStyle={videoStyle}
        />
      );
    } else if (src?.startsWith("<svg")) {
      return <StyledImageSvg dangerouslySetInnerHTML={{ __html: src }} />;
    } else {
      return (
        <StyledImage
          role="button"
          data-role={`brochure-thumbnail-${src}`}
          src={src}
          alt={alt}
          onClick={handleClickImage}
          width={564}
          height={564}
          onLoad={handleLoad}
        />
      );
    }
  }, [
    alt,
    handleClickImage,
    handleLoad,
    isVideo,
    metaData?.mimeType,
    poster,
    src,
    videoOptions,
    videoStyle,
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
