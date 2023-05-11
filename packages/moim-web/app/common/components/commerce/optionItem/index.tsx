import * as React from "react";
import { FormattedMessage } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { Checkbox } from "common/components/designSystem/inputs";
import { MoimURL } from "common/helpers/url";
import DefaultTitle from "./components/title";
import DefaultPrice from "./components/price";
import DefaultShippingFee from "./components/shippingFee";
import DefaultPoints from "./components/points";
import DefaultStatusLabel from "./components/status";
import {
  Wrapper,
  Image,
  FallbackImage,
  Information,
  Title,
  Option,
  Price,
  ShippingFee,
  Status,
  Container,
} from "./styled";

import { useStoreState } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useProductStatusLabel from "app/common/components/commerce/statusLabel/index";
import { getProductOptionItemsByVariantValues } from "app/selectors/commerce";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

export const ITEM_WRAPPER_CLASS_NAME = "ITEM_WRAPPER";

interface IProps {
  className?: string;
  disabled?: boolean;
  sellerId: Moim.Id;
  productId: Moim.Id;
  productType?: Moim.Commerce.PRODUCT_TYPE;
  status: Moim.Commerce.PRODUCT_STATUS;
  title: string;

  imageUrl?: {
    web: Moim.IImage[];
    mobile: Moim.IImage[];
  };
  qty: number;
  price: Moim.Commerce.IProductPrice;
  originPrice: Moim.Commerce.IProductPrice;
  creditAmount?: Moim.Commerce.IProductPrice;
  shippingFee?: Moim.Commerce.IProductPrice;
  rawPrice: number;
  rawOriginPrice: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
  option?: string;
  maxQty?: number;
  variantId?: Moim.Id;

  checked?: boolean;
  useCheckBox?: boolean;

  overrideWrapperStyle?: FlattenInterpolation<any>;
  overrideItemWrapperStyle?: FlattenInterpolation<any>;

  onChangeChecked?(
    status: boolean,
    parcel: Moim.Commerce.IPurchaseReadyItem,
  ): void;
  children({}: {
    Title: any;
    Option: any;
    Price: any;
    ShippingFee: any;
    Status: any;
    defaultValue: {
      title: React.ReactNode;
      option: React.ReactNode;
      shippingFee: React.ReactNode;
      point: React.ReactNode;
      price: React.ReactNode;
      status: React.ReactNode;
    };
  }): React.ReactNode;
}

const OptionItem: React.FC<IProps> = ({
  className,
  productId,
  sellerId,
  productType,
  status,
  variantId,
  title,
  option,
  price,
  originPrice,
  rawPrice,
  rawOriginPrice,
  creditAmount,
  shippingFee,
  additionalFees,
  imageUrl,
  qty,
  maxQty,
  checked,
  useCheckBox,
  disabled,

  children,
  onChangeChecked,
}) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();

  const { close } = useNativeSecondaryView();
  const {
    onSaleText,
    scheduledText,
    completedText,
    soldOutText,
  } = useProductStatusLabel(productType);

  const redirectToProductShow = React.useCallback(() => {
    const url = new MoimURL.CommerceProductShow({ id: productId }).toString();
    if (isMobile) {
      close();
    }
    redirect(url);
  }, [close, redirect, isMobile, productId]);

  const handleChangeCheckBox: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onChangeChecked?.(e.currentTarget.checked, {
        productId,
        sellerId,
        variantId,
        qty,
      });
    },
    [onChangeChecked, productId, sellerId, qty, variantId],
  );

  const imageElement = React.useMemo(() => {
    const image = isMobile
      ? imageUrl?.mobile?.[0] ?? imageUrl?.web?.[0]
      : imageUrl?.web?.[0] ?? imageUrl?.mobile?.[0];
    if (!image) return <FallbackImage />;

    return (
      <Image role="button" src={image.url} onClick={redirectToProductShow} />
    );
  }, [imageUrl, isMobile, redirectToProductShow]);

  const statusTextElement = React.useMemo(() => {
    switch (status) {
      case "onSale": {
        return maxQty ? (
          <FormattedMessage
            id="product_variant/left_stock_count"
            values={{ count: maxQty }}
          />
        ) : (
          onSaleText
        );
      }

      case "scheduled": {
        return scheduledText;
      }

      case "completed": {
        return completedText;
      }

      case "soldOut": {
        return soldOutText;
      }
    }
  }, [completedText, maxQty, onSaleText, scheduledText, soldOutText, status]);

  return (
    <Wrapper className={className}>
      {useCheckBox && (
        <Checkbox
          id={`${productId}_${variantId}`}
          checked={checked}
          onChange={handleChangeCheckBox}
          disabled={disabled}
        />
      )}

      <Container
        disabled={Boolean(disabled)}
        className={ITEM_WRAPPER_CLASS_NAME}
      >
        {imageElement}
        <Information>
          {children({
            Title,
            Option,
            Price,
            ShippingFee,
            Status,
            defaultValue: {
              title: (
                <div role="button" onClick={redirectToProductShow}>
                  <DefaultTitle value={title} />
                </div>
              ),
              option,
              price: (
                <DefaultPrice
                  price={price}
                  originPrice={originPrice}
                  rawPrice={rawPrice}
                  rawOriginPrice={rawOriginPrice}
                  additionalFees={additionalFees}
                />
              ),
              point: (
                <DefaultPoints
                  creditAmount={creditAmount}
                  disabled={Boolean(disabled)}
                />
              ),
              shippingFee: <DefaultShippingFee fee={shippingFee} />,
              status: (
                <DefaultStatusLabel status={status}>
                  {statusTextElement}
                </DefaultStatusLabel>
              ),
            },
          })}
        </Information>
      </Container>
    </Wrapper>
  );
};

export default OptionItem;

export const ProductOptionItem: React.FC<Pick<
  IProps,
  | "children"
  | "checked"
  | "useCheckBox"
  | "className"
  | "onChangeChecked"
  | "disabled"
  | "qty"
> & {
  productId: Moim.Id;
  productVariantId?: Moim.Id;
}> = ({
  children,
  checked,
  useCheckBox,
  className,
  onChangeChecked,
  disabled,
  qty,
  productId,
  productVariantId,
}) => {
  const locale = useCurrentUserLocale();
  const { product, productVariant } = useStoreState(state => ({
    product: state.entities.commerce_product[productId],
    productVariant: productVariantId
      ? state.entities.commerce_variants[productVariantId]
      : undefined,
  }));

  const status = React.useMemo(() => {
    if (productVariant && product?.status === "onSale") {
      if (productVariant.stockCount === 0 || product?.stockCount === 0) {
        return "soldOut";
      }
      return productVariant.status;
    }
    if (product?.stockCount === 0) return "soldOut";
    return product?.status;
  }, [productVariant, product?.status, product?.stockCount]);

  const optionPrice = productVariant
    ? productVariant.price_price
    : product?.price_price;
  const optionOriginPrice = productVariant
    ? productVariant.originalPrice_price
    : product?.originalPrice_price ?? optionPrice;
  const rawOptionPrice = productVariant ? productVariant.price : product?.price;
  const rawOptionOriginPrice = productVariant
    ? productVariant.originalPrice
    : product?.originalPrice ?? rawOptionPrice;

  if (!product) {
    return null;
  }

  return (
    <OptionItem
      className={className}
      productType={product.type}
      sellerId={product.sellerId}
      productId={productId}
      status={status}
      title={product.name}
      imageUrl={product.images}
      checked={checked}
      option={
        productVariant
          ? getProductOptionItemsByVariantValues(
              product.options ?? [],
              productVariant.values,
            )
              ?.map(
                op => op.title[locale] ?? op.title[Object.keys(op.title)[0]],
              )
              .join(" · ") ?? ""
          : undefined
      }
      qty={qty}
      maxQty={productVariant ? productVariant.stockCount : undefined}
      variantId={productVariantId}
      // NOTE: Temporary shippingFee lookup product shippingFee
      // shippingFee={variant?.shippingFee ?? product.shippingFee}
      shippingFee={product.shippingFee_price}
      price={optionPrice}
      originPrice={optionOriginPrice}
      rawPrice={rawOptionPrice}
      rawOriginPrice={rawOptionOriginPrice}
      creditAmount={
        productVariant
          ? !(
              productVariant.price === 0 &&
              productVariant.additionalFees?.length
            )
            ? productVariant.creditAmount_price
            : undefined
          : !(product.price === 0 && product.additionalFees?.length)
          ? product.creditAmount_price
          : undefined
      }
      additionalFees={
        productVariant ? productVariant.additionalFees : product.additionalFees
      }
      useCheckBox={useCheckBox}
      disabled={
        disabled ||
        (productVariant ? !productVariant.buyable : false) ||
        (product ? !product.buyable : false)
      }
      onChangeChecked={onChangeChecked}
    >
      {children}
    </OptionItem>
  );
};
