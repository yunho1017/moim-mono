import * as React from "react";

import { FundingItemElementRenderer } from "../renderer";
import { Wrapper } from "./styled";

const FundingItemWrapper: React.FC<{
  className?: string;
  product: Moim.Commerce.IProduct;
  block: Moim.Component.ProductItem.IWrapper;
  onClickLikeButtonClick?(nextStatus: boolean): void;
  onSellerSelect?(): void;
  onBuyNowSelect?(): void;
  onAddToCartSelect?(): void;
}> = React.memo(
  ({
    className,
    product,
    block,
    onClickLikeButtonClick,
    onSellerSelect,
    onBuyNowSelect,
    onAddToCartSelect,
  }) => {
    const direction = block.direction ?? "column";
    return (
      <Wrapper
        className={className}
        direction={direction}
        horizontalAlign={block.horizontalAlign}
        verticalAlign={block.verticalAlign}
        gap={block.gap}
      >
        {block.children?.map((child, index) => (
          <FundingItemElementRenderer
            key={`product-element-${index}`}
            block={child}
            product={product}
            wrapperBlock={block}
            onClickLikeButtonClick={onClickLikeButtonClick}
            onSellerSelect={onSellerSelect}
            onBuyNowSelect={onBuyNowSelect}
            onAddToCartSelect={onAddToCartSelect}
          />
        ))}
      </Wrapper>
    );
  },
);

export default FundingItemWrapper;
