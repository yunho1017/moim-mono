import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useActions } from "app/store";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import ImageHolder from "common/components/lazyBlurHashImage";
import HorizontalScroll from "common/components/horizontalScroll";
import useIsMobile from "common/hooks/useIsMobile";

const MOBILE_IMAGE_THUMBNAIL_SIZE = 70;
const DESKTOP_IMAGE_THUMBNAIL_SIZE = 120;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  .react-horizontal-scrolling-menu--item
    + .react-horizontal-scrolling-menu--separator {
    margin-left: ${px2rem(4)};
  }
`;

const imageWrapperStyle = css`
  width: 100%;
  height: 100%;
`;

const imageStyle = css`
  object-fit: cover;
`;

const ImageCase = styled.div`
  position: relative;
  cursor: pointer;

  & + & {
    margin-left: ${px2rem(10)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(MOBILE_IMAGE_THUMBNAIL_SIZE)};
    height: ${px2rem(MOBILE_IMAGE_THUMBNAIL_SIZE)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(DESKTOP_IMAGE_THUMBNAIL_SIZE)};
    height: ${px2rem(DESKTOP_IMAGE_THUMBNAIL_SIZE)};
  }
`;

interface IProps {
  parentId: Moim.Id;
  images?: Moim.IImage[];
}

const MultiImage: React.FC<IProps> = ({ parentId, images }) => {
  const isMobile = useIsMobile();
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
  });
  const placeSize = React.useMemo(
    () =>
      isMobile ? MOBILE_IMAGE_THUMBNAIL_SIZE : DESKTOP_IMAGE_THUMBNAIL_SIZE,
    [isMobile],
  );

  if (!images || images.length === 0) return null;
  return (
    <Wrapper>
      <HorizontalScroll arrowPlacement="inner">
        {images.map((img, idx) => (
          <ImageCase key={`${parentId}_image_${idx}`}>
            <ImageHolder
              data-role={`brochure-thumbnail-${parentId}`}
              data-file-id={img.fileId}
              src={img.url}
              srcSet={img.srcSet}
              sizes={
                isMobile
                  ? `${MOBILE_IMAGE_THUMBNAIL_SIZE}px`
                  : `${DESKTOP_IMAGE_THUMBNAIL_SIZE}px`
              }
              fallBackSrc={img.fallbackSrc ?? img.url}
              blurHash={img.blurhash ?? img.blur_hash}
              overrideWrapperStyle={imageWrapperStyle}
              overrideIMGStyle={imageStyle}
              width={placeSize}
              height={placeSize}
              onClick={e => {
                e.currentTarget.dataset.brochureSelected = "true";
                openImageBrochure(img.url);
              }}
            />
          </ImageCase>
        ))}
      </HorizontalScroll>
    </Wrapper>
  );
};

export default React.memo(MultiImage);
