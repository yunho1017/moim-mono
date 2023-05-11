import * as React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "./styled";
import ProductItemWrapper from "./components/wrapper/product";
import FundingItemWrapper from "./components/wrapper/funding";

import { useStoreState } from "app/store";
import { MoimURL } from "common/helpers/url";

interface IProps {
  productId: Moim.Id;
  block?: Moim.Component.ProductItem.IWrapper;
  onClickLikeButtonClick?(nextStatus: boolean): void;
  onSellerSelect?(product: Moim.Commerce.IProduct): void;
  onProductSelect?(product: Moim.Commerce.IProduct): void;
  onBuyNowSelect?(product: Moim.Commerce.IProduct): void;
  onAddToCartSelect?(product: Moim.Commerce.IProduct): void;
}

function ProductItemCell({
  productId,
  block,
  onClickLikeButtonClick,
  onProductSelect,
  onSellerSelect,
  onAddToCartSelect,
  onBuyNowSelect,
}: IProps) {
  const product = useStoreState(
    state => state.entities.commerce_product[productId],
  );

  const handleSellerSelect = React.useCallback(() => {
    onSellerSelect?.(product);
  }, [onSellerSelect, product]);

  const handleProductSelect = React.useCallback(() => {
    onProductSelect?.(product);
  }, [onProductSelect, product]);

  const handleBuyNowSelect = React.useCallback(() => {
    onBuyNowSelect?.(product);
  }, [onBuyNowSelect, product]);

  const handleAddToCartSelect = React.useCallback(() => {
    onAddToCartSelect?.(product);
  }, [onAddToCartSelect, product]);

  const inner = React.useMemo(() => {
    if (!product || !block) {
      return null;
    }
    switch (product.type) {
      case "fund":
        return (
          <FundingItemWrapper
            block={block as Moim.Component.ProductItem.IWrapper}
            product={product}
            onClickLikeButtonClick={onClickLikeButtonClick}
            onSellerSelect={handleSellerSelect}
            onAddToCartSelect={handleAddToCartSelect}
            onBuyNowSelect={handleBuyNowSelect}
          />
        );

      case "normal":
      default:
        return (
          <ProductItemWrapper
            block={block as Moim.Component.ProductItem.IWrapper}
            product={product}
            onClickLikeButtonClick={onClickLikeButtonClick}
            onSellerSelect={handleSellerSelect}
            onAddToCartSelect={handleAddToCartSelect}
            onBuyNowSelect={handleBuyNowSelect}
          />
        );
    }
  }, [product, block, onClickLikeButtonClick]);

  return (
    <Link
      to={new MoimURL.CommerceProductShow({ id: product.id }).toString()}
      onClick={handleProductSelect}
    >
      <Wrapper status={product.status}>{inner}</Wrapper>
    </Link>
  );
}
export default React.memo(ProductItemCell);
