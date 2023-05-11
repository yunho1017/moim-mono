import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useStoreState } from "app/store";
import {
  getProductVariantById,
  getProductOptionItemsByVariantValues,
} from "app/selectors/commerce";
import ShavedText from "common/components/shavedText";
import { useCurrentUserLocale } from "app/common/hooks/useGroupTexts";
import BoxNumberInput from "common/components/designSystem/boxInput/preset/number";
import { PriceWithAdditionalFees } from "../productShow/layout/productSummary/components/right/price/additionalFee";
import {
  Wrapper,
  TitleContainer,
  ProductTitle,
  LeftStockSection,
  RemoveIcon,
  RemoveButton,
  Bottom,
  BottomLeftContainer,
  BottomRightContainer,
  PriceLabel,
  NumberBoxWrapperStyle,
} from "./styled";

import usePrevious from "app/common/hooks/usePrevious";
import useBlinkBehavior from "common/hooks/useBlinkBehavior";

interface IProps extends Moim.Commerce.IPurchaseReadyItem {
  showRemoveButton?: boolean;
  onChangeProperty(item: Moim.Commerce.IPurchaseReadyItem): void;
  onClickRemove?(item: Moim.Commerce.IPurchaseReadyItem): void;
}

const PurchaseReadyItem: React.FC<IProps> = ({
  productId,
  sellerId,
  variantId,
  qty,
  showRemoveButton,
  onChangeProperty,
  onClickRemove,
}) => {
  const prevQty = usePrevious(qty);
  const {
    status: userActionStatus,
    onSetAction: onUserAction,
  } = useBlinkBehavior();
  const {
    status: highlightStatus,
    onSetAction: onHighlight,
  } = useBlinkBehavior({ resolveTime: 3000 });
  const { product, targetVariant } = useStoreState(state => {
    const pdt = state.entities.commerce_product[productId];
    const variants = pdt?.productVariants
      ? pdt.productVariants.map(id => state.entities.commerce_variants[id])
      : [];
    const tV =
      pdt?.productVariants && variantId
        ? getProductVariantById(variants, variantId)
        : undefined;

    return { product: pdt, targetVariant: tV };
  });
  const locale = useCurrentUserLocale();

  const optionItems: Moim.Commerce.IProductOptionItem[] = React.useMemo(
    () =>
      product?.options && targetVariant
        ? getProductOptionItemsByVariantValues(
            product.options,
            targetVariant.values,
          )
        : [],

    [product, targetVariant],
  );

  const optionLabel = React.useMemo(() => {
    if (!product || !product.productVariants || !product.options) return;

    return optionItems
      .map(op => op.title[locale] ?? op.title[Object.keys(op.title)[0]])
      .join(" · ");
  }, [locale, optionItems, product]);

  const handleChangeQty = React.useCallback(
    (val: number) => {
      onUserAction();
      onChangeProperty({
        productId,
        sellerId,
        variantId,
        qty: val,
      });
    },
    [variantId, productId, sellerId, onUserAction, onChangeProperty],
  );

  const handleRemoveClick = React.useCallback(() => {
    onClickRemove?.({
      productId,
      sellerId,
      variantId,
      qty,
    });
  }, [onClickRemove, productId, qty, sellerId, variantId]);

  const leftCount = React.useMemo(() => {
    if (!optionLabel) return null;

    if (targetVariant) {
      if (targetVariant.stockCount !== undefined) {
        return (
          <LeftStockSection>
            <FormattedMessage
              id="product_variant/left_stock_count"
              values={{
                count: targetVariant.stockCount,
              }}
            />
          </LeftStockSection>
        );
      }
      return null;
    } else if (product?.stockCount !== undefined) {
      return (
        <LeftStockSection>
          <FormattedMessage
            id="product_variant/left_stock_count"
            values={{
              count: product.stockCount,
            }}
          />
        </LeftStockSection>
      );
    }

    return null;
  }, [optionLabel, product, targetVariant]);

  const totalAdditionalFees = React.useMemo(
    () =>
      targetVariant
        ? targetVariant.additionalFees?.map(fee => ({
            ...fee,
            amount: fee.amount * qty,
          }))
        : product.additionalFees?.map(fee => ({
            ...fee,
            amount: fee.amount * qty,
          })),
    [targetVariant, product.additionalFees, qty],
  );

  React.useEffect(() => {
    if (!userActionStatus && prevQty !== undefined && prevQty !== qty) {
      onHighlight();
    }
  }, [qty, prevQty, userActionStatus, onHighlight]);

  if (!product) return null;

  return (
    <Wrapper highlightEnable={highlightStatus}>
      <TitleContainer>
        <ProductTitle>
          <ShavedText
            value={optionLabel ? optionLabel : product.name}
            line={2}
          />
        </ProductTitle>
        {showRemoveButton && (
          <RemoveButton onClick={handleRemoveClick}>
            <RemoveIcon />
          </RemoveButton>
        )}
      </TitleContainer>
      {leftCount}
      <Bottom>
        <BottomLeftContainer>
          <BoxNumberInput
            size="Small"
            disabled={product.status !== "onSale"}
            value={qty}
            min={1}
            max={
              product.type === "subscription"
                ? 1
                : targetVariant?.stockCount || product.stockCount
            }
            wrapperStyle={NumberBoxWrapperStyle}
            onChange={handleChangeQty}
          />
        </BottomLeftContainer>
        <BottomRightContainer>
          <PriceLabel>
            <PriceWithAdditionalFees
              currency={product.currency}
              price={
                (targetVariant ? targetVariant.price : product.price) * qty
              }
              additionalFees={totalAdditionalFees}
            />
          </PriceLabel>
        </BottomRightContainer>
      </Bottom>
    </Wrapper>
  );
};

export default React.memo(PurchaseReadyItem);
