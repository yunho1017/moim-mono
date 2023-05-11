import * as React from "react";

import ProductOptionInventory from "app/modules/commerce/components/productShow/components/productOptionInventory";
import {
  MobileInventoryTitle,
  Divider,
  OptionsSelectorWrapper,
} from "./styled";
import {
  ProductShowBuyNowButton,
  useBuyNowButtonVisible,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/purchaseGloveBox/components/buttons/buyNow";
import {
  ProductShowAddCartButton,
  useAddCartButtonVisible,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/purchaseGloveBox/components/buttons/addCart";
import { useStoreState } from "app/store";
import useBuyNowAction from "common/hooks/commerce/useBuyNowAction";
import useCartActions from "common/hooks/commerce/useCartActions";
import useIsMobile from "common/hooks/useIsMobile";
import { useIntlShort } from "common/hooks/useIntlShort";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  product: Moim.Commerce.IProduct;
  isBottomSheetExpend: boolean;
  onClose(): void;
  setAlertMessage(message: string | undefined): void;
}

function ProductOptionInventoryDialogComponent({
  product,
  isBottomSheetExpend,
  onClose,
  setAlertMessage,
}: IProps) {
  const intl = useIntlShort();
  const buyNowAction = useBuyNowAction();
  const { addToCart } = useCartActions();
  const buyNowButtonVisible = useBuyNowButtonVisible();
  const addCartButtonVisible = useAddCartButtonVisible();
  const [selectedItems, setSelectedItems] = React.useState<
    Moim.Commerce.IPurchaseReadyItem[]
  >([]);

  const productVariants = useStoreState(state =>
    product && product.productVariants
      ? product.productVariants.map(id => state.entities.commerce_variants[id])
      : [],
  );

  const handleAddToCart = React.useCallback(() => {
    if (!selectedItems.length) {
      AnalyticsClass.getInstance().productBuyDialogCartSelect({
        productId: product.id,
      });
      setAlertMessage(intl("product_show/alert_body_need_selected_option"));
      return;
    }
    addToCart(product.id, selectedItems);
    onClose();
  }, [addToCart, onClose, intl, product.id, selectedItems]);

  const handleBuyNow = React.useCallback(() => {
    if (!selectedItems.length) {
      AnalyticsClass.getInstance().productBuyDialogCartSelect({
        productId: product.id,
      });
      setAlertMessage(intl("product_show/alert_body_need_selected_option"));
      return;
    }

    const itemsObj = selectedItems.reduce((acc, value) => {
      if (acc[value.sellerId]) {
        acc[value.sellerId].push({
          productId: value.productId,
          quantity: value.qty,
          productVariantId: value.variantId,
          checked: true,
          disabled: false,
        });
      } else {
        acc[value.sellerId] = [
          {
            productId: value.productId,
            quantity: value.qty,
            productVariantId: value.variantId,
            checked: true,
            disabled: false,
          },
        ];
      }

      return acc;
    }, {} as Record<string, Moim.Commerce.ICartItemDatum[]>);

    buyNowAction(
      Object.entries(itemsObj).map(([key, value]) => ({
        sellerId: key,
        items: [
          {
            type: product.shippingRequired
              ? product.deliveryGroupId
                ? "deliveryGroup"
                : "deliveryAlone"
              : "noDelivery",
            id: product.deliveryGroupId,
            items: value,
          },
        ],
      })),
    );
  }, [product, buyNowAction, intl, selectedItems]);

  const isMobile = useIsMobile();

  const mobileInventoryHeader = React.useMemo(() => {
    if (!isMobile) return null;

    return (
      <>
        <MobileInventoryTitle>{product.name}</MobileInventoryTitle>
        <Divider />
      </>
    );
  }, [isMobile, product.name]);

  const buttonsElement = React.useMemo(
    () => (
      <>
        {addCartButtonVisible && (
          <ProductShowAddCartButton
            productType={product.type}
            buttonStyle={buyNowButtonVisible ? "ghost" : "flat"}
            productStatus={product.status}
            productStockCount={product.stockCount}
            onClick={handleAddToCart}
          />
        )}
        {buyNowButtonVisible && (
          <ProductShowBuyNowButton
            productType={product.type}
            productStatus={product.status}
            productStockCount={product.stockCount}
            onClick={handleBuyNow}
          />
        )}
      </>
    ),
    [
      handleAddToCart,
      handleBuyNow,
      buyNowButtonVisible,
      addCartButtonVisible,
      product.type,
      product.status,
      product.stockCount,
    ],
  );

  return (
    <OptionsSelectorWrapper isBottomSheetExpend={isBottomSheetExpend}>
      {mobileInventoryHeader}
      <ProductOptionInventory
        productType={product.type}
        showMobileButtons={true}
        canFetchProductData={true}
        productId={product.id}
        sellerId={product.sellerId}
        currency={product.currency}
        options={product.options}
        variants={productVariants}
        mobilePurchaseButtons={buttonsElement}
        onProductSelected={setSelectedItems}
      />
    </OptionsSelectorWrapper>
  );
}

export default React.memo(ProductOptionInventoryDialogComponent);
