import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { useCallback } from "react";

export function useCommerceAnalyticsReport() {
  const reportBlockProductListProductSelect = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductSelect({
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListSellerSelect = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListSellerSelect({
        sellerId: product.sellerId,
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListProductBuyNow = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductBuyNow({
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListProductAddToCart = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductAddToCart({
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListPreviewProductSelect = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductSelect({
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListPreviewSellerSelect = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListSellerSelect({
        sellerId: product.sellerId,
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListPreviewProductBuyNow = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductBuyNow({
        productId: product.id,
      });
    },
    [],
  );

  const reportBlockProductListPreviewProductAddToCart = useCallback(
    (product: Moim.Commerce.IProduct) => {
      AnalyticsClass.getInstance().blockProductListProductAddToCart({
        productId: product.id,
      });
    },
    [],
  );

  const reportProductShowRelatedProductBuyNowSelect = useCallback(
    (productId: string, originProductId: string) => {
      AnalyticsClass.getInstance().productShowRelatedProductBuyNowSelect({
        relatedProductId: productId,
        productId: originProductId,
      });
    },
    [],
  );

  const reportProductShowRelatedProductAddToCartSelect = useCallback(
    (productId: string, originProductId: string) => {
      AnalyticsClass.getInstance().productShowRelatedProductAddToCartSelect({
        relatedProductId: productId,
        productId: originProductId,
      });
    },
    [],
  );

  const reportProductShowRelatedProductSelect = useCallback(
    (productId: string, originProductId: string) => {
      AnalyticsClass.getInstance().productShowRelatedProductSelect({
        relatedProductId: productId,
        productId: originProductId,
      });
    },
    [],
  );

  const reportProductShowRelatedProductSellerSelect = useCallback(
    (productId: string, originProductId: string, sellerId: string) => {
      AnalyticsClass.getInstance().productShowRelatedProductSellerSelect({
        relatedProductId: productId,
        productId: originProductId,
        sellerId,
      });
    },
    [],
  );

  return {
    reportBlockProductListProductSelect,
    reportBlockProductListSellerSelect,
    reportBlockProductListProductBuyNow,
    reportBlockProductListProductAddToCart,
    reportBlockProductListPreviewProductSelect,
    reportBlockProductListPreviewSellerSelect,
    reportBlockProductListPreviewProductBuyNow,
    reportBlockProductListPreviewProductAddToCart,
    reportProductShowRelatedProductBuyNowSelect,
    reportProductShowRelatedProductAddToCartSelect,
    reportProductShowRelatedProductSelect,
    reportProductShowRelatedProductSellerSelect,
  };
}
