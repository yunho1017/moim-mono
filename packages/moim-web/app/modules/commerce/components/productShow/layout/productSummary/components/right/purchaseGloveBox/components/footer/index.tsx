import * as React from "react";

import useIsMobile from "common/hooks/useIsMobile";

import {
  Wrapper,
  Inner,
  LikeFillIcon,
  LikeEmptyIcon,
  BlackWishIcon,
  WhiteStarIcon,
  LikeButton,
  FavoriteButton,
  ShareIcon,
  ShareButton,
} from "./styled";
import {
  ProductShowBuyNowButton,
  useBuyNowButtonVisible,
} from "../buttons/buyNow";
import {
  ProductShowAddCartButton,
  useAddCartButtonVisible,
  useMobileProductShowAddCartButtonVisible,
} from "../buttons/addCart";

const buttonSize = "l" as const;

interface IProps {
  productType: Moim.Commerce.PRODUCT_TYPE;
  productStatus: Moim.Commerce.PRODUCT_STATUS;
  productStockCount?: number;
  isLiked: boolean;
  isFavorite: boolean;
  onLikeClick(): void;
  onFavoriteClick(): void;
  onShareClick(): void;
  onAddCartClick(): void;
  onBuyNowClick(): void;
}

const Footer: React.FC<IProps> = ({
  productType,
  productStatus,
  productStockCount,
  isLiked,
  isFavorite,
  onLikeClick,
  onFavoriteClick,
  onShareClick,
  onAddCartClick,
  onBuyNowClick,
}) => {
  const isMobile = useIsMobile();

  const buyNowButtonVisible = useBuyNowButtonVisible();
  const desktopAddCartButtonVisible = useAddCartButtonVisible();
  const mobileAddCartButtonVisible = useMobileProductShowAddCartButtonVisible();
  const addCartButtonVisible = React.useMemo(
    () => (isMobile ? mobileAddCartButtonVisible : desktopAddCartButtonVisible),
    [isMobile, mobileAddCartButtonVisible, desktopAddCartButtonVisible],
  );

  return (
    <Wrapper>
      <Inner>
        <FavoriteButton
          size={buttonSize}
          isFavorite={isFavorite}
          onClick={onFavoriteClick}
        >
          {isFavorite ? <WhiteStarIcon /> : <BlackWishIcon />}
        </FavoriteButton>
        {false && (
          <LikeButton size={buttonSize} onClick={onLikeClick}>
            {isLiked ? <LikeFillIcon /> : <LikeEmptyIcon />}
          </LikeButton>
        )}
        {!isMobile && (
          <ShareButton size={buttonSize} onClick={onShareClick}>
            <ShareIcon />
          </ShareButton>
        )}

        {addCartButtonVisible && (
          <ProductShowAddCartButton
            buttonStyle={isMobile || buyNowButtonVisible ? "ghost" : "flat"}
            productType={productType}
            productStatus={productStatus}
            productStockCount={productStockCount}
            onClick={onAddCartClick}
          />
        )}
        {(isMobile || buyNowButtonVisible) && (
          <ProductShowBuyNowButton
            productType={productType}
            productStatus={productStatus}
            productStockCount={productStockCount}
            onClick={onBuyNowClick}
          />
        )}
      </Inner>
    </Wrapper>
  );
};

export default React.memo(Footer);
