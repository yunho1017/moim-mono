import * as React from "react";
import { useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";

import { getProductDataWithoutView } from "app/actions/commerce";

import { DefaultLoader } from "common/components/loading";
import {
  LoadingWrapper,
  Wrapper,
  BodyContainer,
  ItemListWrapper,
  OptionsSelectContainer,
  MobilePurchaseButtonContainer,
} from "./styled";
import PriceInfo from "./components/priceInfo";
import SelectedProducts from "./components/selectedProducts";
import ProductOptions from "./components/options";

export interface IProps {
  productId: Moim.Id;
  sellerId: Moim.Id;
  currency: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  canFetchProductData?: boolean;

  options?: Moim.Commerce.IProductOption[];
  variants?: Moim.Commerce.IProductVariant[];
  showMobileButtons?: boolean;
  mobilePurchaseButtons?: React.ReactNode;
  onProductSelected(item: Moim.Commerce.IPurchaseReadyItem[]): void;
}

const ProductOptionInventory: React.FC<IProps> = ({
  productId,
  productType,
  sellerId,
  currency,
  options,
  variants,
  mobilePurchaseButtons,
  showMobileButtons,
  canFetchProductData,
  onProductSelected,
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = React.useState<boolean | undefined>();
  const [selectedProduct, setSelectedProduct] = React.useState<
    Moim.Commerce.IPurchaseReadyItem[]
  >([]);

  const { dispatchFetchProductData } = useActions({
    dispatchFetchProductData: getProductDataWithoutView,
  });

  const optionElements = React.useMemo(
    () => (
      <ProductOptions
        productId={productId}
        sellerId={sellerId}
        currency={currency}
        productType={productType}
        options={options}
        variants={variants}
        setSelectedProduct={setSelectedProduct}
      />
    ),
    [
      productId,
      sellerId,
      currency,
      productType,
      options,
      variants,
      setSelectedProduct,
    ],
  );
  const selectedProductElement = React.useMemo(
    () => (
      <SelectedProducts
        showRemoveButton={Boolean(options && options.length > 0)}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    ),
    [setSelectedProduct, options, selectedProduct],
  );

  React.useEffect(() => {
    if (options === undefined || options.length === 0) {
      setSelectedProduct([
        {
          productId,
          sellerId,
          qty: 1,
        },
      ]);
    } else {
      setSelectedProduct([]);
    }
  }, [productId]);

  React.useEffect(() => {
    onProductSelected(selectedProduct);
  }, [onProductSelected, selectedProduct]);

  React.useEffect(() => {
    if (canFetchProductData && isLoading === undefined) {
      setIsLoading(true);
      dispatchFetchProductData(productId).finally(() => {
        setIsLoading(false);
      });
    }
  }, [canFetchProductData, productId]);

  if (canFetchProductData && (isLoading || isLoading === undefined)) {
    return (
      <LoadingWrapper>
        <DefaultLoader />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper isSingleItem={!options || options.length === 0}>
      <BodyContainer>
        {isMobile ? (
          <ItemListWrapper data-scroll-lock-scrollable>
            {(options?.length ?? []) > 0 ? (
              <OptionsSelectContainer>{optionElements}</OptionsSelectContainer>
            ) : null}

            {selectedProduct.length > 0 && selectedProductElement}
          </ItemListWrapper>
        ) : (
          <>
            {(options?.length ?? []) > 0 ? (
              <OptionsSelectContainer>{optionElements}</OptionsSelectContainer>
            ) : null}
            {selectedProduct.length > 0 && (
              <ItemListWrapper data-scroll-lock-scrollable>
                {selectedProductElement}
              </ItemListWrapper>
            )}
          </>
        )}
      </BodyContainer>
      <PriceInfo productId={productId} selectedProduct={selectedProduct} />
      {(isMobile || Boolean(showMobileButtons)) && mobilePurchaseButtons ? (
        <MobilePurchaseButtonContainer>
          {mobilePurchaseButtons}
        </MobilePurchaseButtonContainer>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(ProductOptionInventory);
