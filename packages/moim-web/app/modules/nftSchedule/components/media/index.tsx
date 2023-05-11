import React from "react";
import styled from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { useActions } from "app/store";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonContainer } from "common/components/mediaWrapper/styledComponents";
import VideoPlayer from "./video";
// helpers
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import useIsMobile from "common/hooks/useIsMobile";
import { checkVideo } from "app/common/helpers/nft";

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
  border: none;
  cursor: zoom-in;
`;

interface PropsType {
  media: Moim.NFT.IResource[];
  alt: string;
}

const Media: React.FC<PropsType> = ({ media, alt }) => {
  const isMobile = useIsMobile();
  const isVideo: boolean = Boolean(media[0].mimeType?.includes("video"))
    ? true
    : checkVideo(media[0].url)
    ? true
    : false;
  const [isLoaded, setLoadStatus] = React.useState<boolean>(true);
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
  });
  const handleClickImage: React.MouseEventHandler<HTMLImageElement> = React.useCallback(
    e => {
      if (media[0].url) {
        e.currentTarget.dataset.brochureSelected = "true";
        e.currentTarget.dataset.hideActionButton = "true";
        openImageBrochure(media[0].url);
      }
    },
    [media, openImageBrochure],
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
                src: media[0].url ?? "",
                type: media[0].mimeType,
              },
            ],
            poster: media[0].previewUrl ?? "",
          }}
        />
      );
    } else {
      return (
        <StyledImage
          role="button"
          data-role={`brochure-thumbnail-${media[0].url}`}
          src={media[0].url}
          alt={alt}
          onClick={handleClickImage}
          width={564}
          height={564}
          onLoad={handleLoad}
        />
      );
    }
  }, [alt, handleClickImage, handleLoad, isVideo, media]);

  return (
    <>
      <Wrapper>
        <MediaWrapper>
          {!isLoaded && <StyledSkeletonBox />}
          {mediaElements}
        </MediaWrapper>
      </Wrapper>
      <Spacer value={isMobile ? 16 : 28} />
    </>
  );
};
export default Media;
