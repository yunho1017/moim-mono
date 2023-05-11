import * as React from "react";

import {
  Wrapper,
  ImageContainer,
  FallbackImageWrapper,
  ImageFallback,
  FluidButton,
  WishIcon,
} from "./styled";
import HeaderChips from "./components/chips";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import useIsMobile from "common/hooks/useIsMobile";
import { putProductVote } from "app/actions/commerce";
import { VoteStatus } from "app/enums";
import { SkeletonBox } from "common/components/skeleton";

interface IProps {
  className?: string;
  productId: string;
  productSets?: Moim.Commerce.ITimeSaleEntity[];
  isFavorite?: boolean;
  images?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  };
  block: Moim.Component.ProductItem.IImage;
  onClickLikeButtonClick?(nextStatus: boolean): void;
}

const Header = ({
  className,
  productId,
  isFavorite,
  images,
  productSets,
  onClickLikeButtonClick,
  block,
}: IProps) => {
  const [isError, setErrorStatus] = React.useState(false);
  const [isLoaded, setLoadStatus] = React.useState(false);
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const dispatchSignIn = useHandleSignIn();
  const { dispatchPutProductVote } = useActions({
    dispatchPutProductVote: putProductVote,
  });

  const handleClickFavoriteButton = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (!currentUser) {
        dispatchSignIn();
        return;
      }

      onClickLikeButtonClick?.(!isFavorite);
      if (isFavorite) {
        dispatchPutProductVote(productId, VoteStatus.POSITIVE, VoteStatus.NONE);
      } else {
        dispatchPutProductVote(productId, VoteStatus.NONE, VoteStatus.POSITIVE);
      }
    },
    [
      currentUser,
      dispatchPutProductVote,
      dispatchSignIn,
      isFavorite,
      onClickLikeButtonClick,
      productId,
    ],
  );

  const previewImageSource = React.useMemo(() => {
    if (!images) {
      return undefined;
    }
    if (isMobile) {
      return images.mobile;
    } else {
      return images.web.length > 0 ? images.web : images.mobile;
    }
  }, [images, isMobile]);

  const handleLoad = React.useCallback(() => {
    setLoadStatus(true);
  }, []);

  const handleError = React.useCallback(() => {
    setErrorStatus(true);
  }, []);

  return (
    <Wrapper className={className}>
      <ImageContainer ratio={block.ratio ?? "1:1"} radius={block.radius}>
        {!isLoaded && (
          <div className="loader">
            <SkeletonBox width="100%" height="100%" />
          </div>
        )}
        {!previewImageSource || previewImageSource.length === 0 ? (
          <FallbackImageWrapper>
            <ImageFallback />
          </FallbackImageWrapper>
        ) : (
          <img
            src={
              previewImageSource[0].url ??
              previewImageSource[0].src ??
              previewImageSource[0].fallbackSrc
            }
            srcSet={isError ? previewImageSource[0].srcSet : undefined}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        <HeaderChips productSets={productSets} productId={productId} />
        {block.showWishButton !== false && (
          <FluidButton
            isFavorite={isFavorite}
            onClick={handleClickFavoriteButton}
          >
            <WishIcon />
          </FluidButton>
        )}
      </ImageContainer>
    </Wrapper>
  );
};
export default React.memo(Header);
