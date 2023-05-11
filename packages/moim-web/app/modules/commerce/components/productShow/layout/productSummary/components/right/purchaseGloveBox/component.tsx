import * as React from "react";
import { useIntl } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";

import AlertDialog from "common/components/alertDialog";
import ProductOptionInventoryElementBottomSheet, {
  IRefHandler as IBottomSheetRefHandler,
} from "./components/bottomSheet";
import Footer from "./components/footer";
import ProductOptionInventory from "./components/productOptionInventory";

import { VoteStatus } from "app/enums";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  product: Moim.Commerce.IProduct;
  onLikeClick(): void;
  onFavoriteClick(): void;
  onShareClick(): void;
  onAddCartClick(
    productId: Moim.Id,
    items: Moim.Commerce.IPurchaseReadyItem[],
  ): void;
  onBuyNowClick(
    productId: Moim.Id,
    items: Moim.Commerce.IPurchaseReadyItem[],
  ): void;
}
const ProductShowPurchaseGloveBoxComponent: React.FC<IProps> = ({
  product,
  onLikeClick,
  onFavoriteClick,
  onShareClick,
  onAddCartClick,
  onBuyNowClick,
}) => {
  const bottomSheetRef = React.useRef<IBottomSheetRefHandler>(null);
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [currentItems, setCurrentItems] = React.useState<
    Moim.Commerce.IPurchaseReadyItem[]
  >([]);

  const intl = useIntl();
  const isMobile = useIsMobile();

  const handleCloseAlert = React.useCallback(() => {
    setAlertMessage(null);
  }, []);

  const handleOpenAlert = React.useCallback(
    (messageKey: string) => {
      setAlertMessage(
        intl.formatMessage({
          id: messageKey,
        }),
      );
    },
    [intl],
  );

  const clickAddToCart = React.useCallback(() => {
    AnalyticsClass.getInstance().productBuyDialogCartSelect({
      productId: product.id,
    });

    if (!currentItems.length) {
      const messageKey = (() => {
        switch (product.type) {
          case "fund":
            return "funding_show/dialog_body_need_selected_option";
          case "subscription":
            return "subscription_show/alert_body_need_selected_option";
          default:
          case "normal":
            return "product_show/alert_body_need_selected_option";
        }
      })();
      handleOpenAlert(messageKey);
      return;
    }

    onAddCartClick(product.id, currentItems);
    bottomSheetRef.current?.close();
  }, [currentItems, onAddCartClick, product.id, product.type, handleOpenAlert]);

  const clickBuyNow = React.useCallback(() => {
    AnalyticsClass.getInstance().productBuyDialogBuySelect({
      productId: product.id,
    });

    if (!currentItems.length) {
      const messageKey = (() => {
        switch (product.type) {
          case "fund":
            return "funding_show/dialog_body_need_selected_option";
          case "subscription":
            return "subscription_show/alert_body_need_selected_option";
          default:
          case "normal":
            return "product_show/alert_body_need_selected_option";
        }
      })();
      handleOpenAlert(messageKey);
      return;
    }

    onBuyNowClick(product.id, currentItems);

    bottomSheetRef.current?.close();
  }, [currentItems, onBuyNowClick, product.id, product.type, handleOpenAlert]);

  const handleAddCartButtonClick = React.useCallback(() => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      clickAddToCart();
    }
  }, [clickAddToCart, isMobile]);

  const handleBuyNowButtonClick = React.useCallback(() => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      clickBuyNow();
    }
  }, [clickBuyNow, isMobile]);

  React.useEffect(() => {
    setCurrentItems([]);
  }, [product.id]);

  return (
    <>
      {isMobile ? (
        <ProductOptionInventoryElementBottomSheet
          ref={bottomSheetRef}
          title={product.name}
        >
          <ProductOptionInventory
            product={product}
            onProductSelected={setCurrentItems}
            onAddCartClick={clickAddToCart}
            onBuyNowClick={clickBuyNow}
          />
        </ProductOptionInventoryElementBottomSheet>
      ) : (
        <ProductOptionInventory
          product={product}
          onProductSelected={setCurrentItems}
          onAddCartClick={clickAddToCart}
          onBuyNowClick={clickBuyNow}
        />
      )}
      <Footer
        productType={product.type}
        productStatus={product.status}
        productStockCount={product.stockCount}
        isLiked={product.vote?.type === VoteStatus.POSITIVE}
        isFavorite={product.vote?.type === VoteStatus.POSITIVE}
        onLikeClick={onLikeClick}
        onFavoriteClick={onFavoriteClick}
        onShareClick={onShareClick}
        onAddCartClick={handleAddCartButtonClick}
        onBuyNowClick={handleBuyNowButtonClick}
      />
      <AlertDialog
        open={Boolean(alertMessage)}
        content={alertMessage}
        rightButtons={[
          {
            text: intl.formatMessage({ id: "ok_button" }),
            onClick: handleCloseAlert,
          },
        ]}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default React.memo(ProductShowPurchaseGloveBoxComponent);
