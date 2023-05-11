import * as React from "react";

import ProductOptionInventoryBase from "../../../../../../components/productOptionInventory";
import {
  ProductShowBuyNowButton,
  useBuyNowButtonVisible,
} from "./buttons/buyNow";
import {
  ProductShowAddCartButton,
  useAddCartButtonVisible,
} from "./buttons/addCart";
import { useStoreState } from "app/store";

interface IProps {
  product: Moim.Commerce.IProduct;
  onProductSelected(parcel: Moim.Commerce.IPurchaseReadyItem[]): void;
  onAddCartClick(): void;
  onBuyNowClick(): void;
}

const ProductOptionInventory: React.FC<IProps> = ({
  product,
  onProductSelected,
  onBuyNowClick,
  onAddCartClick,
}) => {
  const variants = useStoreState(state =>
    product.productVariants?.map(id => state.entities.commerce_variants[id]),
  );

  const productType = product.type;
  const sellerId = product.sellerId;
  const productStatus = product.status;
  const currency = product.currency;
  const options = product.options;
  const stockCount = product.stockCount;

  const buyNowButtonVisible = useBuyNowButtonVisible();
  const addCartButtonVisible = useAddCartButtonVisible();
  const mobileButtons = React.useMemo(
    () => (
      <>
        {addCartButtonVisible && (
          <ProductShowAddCartButton
            buttonStyle={buyNowButtonVisible ? "ghost" : "flat"}
            productType={productType}
            productStatus={productStatus}
            productStockCount={stockCount}
            onClick={onAddCartClick}
          />
        )}
        {buyNowButtonVisible && (
          <ProductShowBuyNowButton
            productType={productType}
            productStatus={productStatus}
            productStockCount={stockCount}
            onClick={onBuyNowClick}
          />
        )}
      </>
    ),
    [
      addCartButtonVisible,
      buyNowButtonVisible,

      productType,
      productStatus,
      stockCount,
      onBuyNowClick,
      onAddCartClick,
    ],
  );

  return (
    <ProductOptionInventoryBase
      productId={product.id}
      productType={productType}
      sellerId={sellerId}
      currency={currency}
      options={options}
      variants={variants}
      mobilePurchaseButtons={mobileButtons}
      onProductSelected={onProductSelected}
    />
  );
};

export default React.memo(ProductOptionInventory);
