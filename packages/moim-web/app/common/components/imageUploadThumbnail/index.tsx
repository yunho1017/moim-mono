import * as React from "react";
import ImageHolder from "common/components/lazyBlurHashImage";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import {
  SIZE,
  Wrapper,
  RemoveButtonContainer,
  SmallRemoveButton,
  ImageWrapperStyle,
  ImageStyle,
} from "./styled";

interface IProps {
  id: Moim.Id;
  payload?: Moim.Blockit.ImageProps;
  isLoading?: boolean;
  onRemoveClick?(id: Moim.Id): void;
}

const ImageUploadThumbnail: React.FC<IProps> = ({
  id,
  payload,
  isLoading,
  onRemoveClick,
}) => {
  const handleRemoveClick = React.useCallback(() => {
    onRemoveClick?.(id);
  }, [id, onRemoveClick]);

  return (
    <Wrapper>
      {isLoading || !payload ? (
        <SkeletonBox width={px2rem(SIZE)} height={px2rem(SIZE)} />
      ) : (
        <ImageHolder
          src={payload.src}
          srcSet={payload.srcSet}
          blurHash={payload.blur_hash}
          fallBackSrc={payload.fallbackSrc ?? payload.src}
          width={payload.width}
          height={payload.height}
          overrideWrapperStyle={ImageWrapperStyle}
          overrideIMGStyle={ImageStyle}
        />
      )}
      {onRemoveClick && (
        <RemoveButtonContainer onClick={handleRemoveClick}>
          <SmallRemoveButton />
        </RemoveButtonContainer>
      )}
    </Wrapper>
  );
};

export default ImageUploadThumbnail;
