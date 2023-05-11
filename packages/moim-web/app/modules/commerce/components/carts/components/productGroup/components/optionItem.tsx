import * as React from "react";
import styled from "styled-components";

import { useActions, useStoreState } from "app/store";

import { ProductOptionItem } from "common/components/commerce/optionItem";
import { FormattedMessage } from "react-intl";
import { B4Regular } from "common/components/designSystem/typos";

import { VoteStatus } from "app/enums";
import { putProductVote } from "app/actions/commerce";
import { px2rem } from "common/helpers/rem";
import ButtonCaseTypeA from "common/components/commerce/optionItem/buttonCase/typeA";

const StyledOptionItem = styled(ProductOptionItem)`
  padding: ${px2rem(8)} 0 ${px2rem(2)};
  & + & {
    margin: ${px2rem(8)} 0 ${px2rem(2)};
  }
`;
const DisabledReasonWrapper = styled(B4Regular)`
  text-transform: uppercase;
  color: ${props => props.theme.color.red700};
`;

interface IProps {
  item: Moim.Commerce.ICartItemDatum;
  onChangeOptionItem(
    productId: string,
    productVariantId: string | undefined,
    updated: Partial<Moim.Commerce.ICartItemDatum> | null,
  ): void;
}

const OptionItem: React.FC<IProps> = ({ item, onChangeOptionItem }) => {
  const { product, productVariant } = useStoreState(state => ({
    product: state.entities.commerce_product[item.productId],
    productVariant: item.productVariantId
      ? state.entities.commerce_variants[item.productVariantId]
      : undefined,
  }));

  const { dispatchPutProductVote } = useActions({
    dispatchPutProductVote: putProductVote,
  });

  const handleClickFavorite = React.useCallback(() => {
    if (product?.vote?.type === VoteStatus.POSITIVE) {
      dispatchPutProductVote(
        item.productId,
        VoteStatus.POSITIVE,
        VoteStatus.NONE,
      );
    } else {
      dispatchPutProductVote(
        item.productId,
        VoteStatus.NONE,
        VoteStatus.POSITIVE,
      );
    }
  }, [dispatchPutProductVote, product?.vote?.type, item?.productId]);

  const handleChangeChecked = React.useCallback(
    (status: boolean, parcel: Moim.Commerce.IPurchaseReadyItem) => {
      onChangeOptionItem(parcel.productId, parcel.variantId, {
        checked: status,
      });
    },
    [onChangeOptionItem],
  );

  const handleChangeQty = React.useCallback(
    (value: number) => {
      onChangeOptionItem(item.productId, item.productVariantId, {
        quantity: value,
      });
    },
    [onChangeOptionItem, item.productId, item.productVariantId],
  );

  const handleClickDelete = React.useCallback(() => {
    onChangeOptionItem(item.productId, item.productVariantId, null);
  }, [onChangeOptionItem, item.productId, item.productVariantId]);

  const cartDisabledReason = React.useMemo(() => {
    if (!item.disabled) {
      return undefined;
    }

    switch (item.disabledReason) {
      case "INVALID_PRODUCT_VARIANT_ID": {
        return (
          <DisabledReasonWrapper>
            <FormattedMessage id="status_option_select_needed" />
          </DisabledReasonWrapper>
        );
      }

      case "INVALID_PRODUCT_STATUS":

      case "EXCEEDED_STOCK_COUNT":
      default:
        return undefined;
    }
  }, [item.disabled, item.disabledReason]);

  const disabled =
    item.disabled ||
    (productVariant ? !productVariant.buyable : false) ||
    (product ? !product.buyable : false);

  return (
    <StyledOptionItem
      checked={item.checked}
      useCheckBox={true}
      disabled={item.disabled}
      qty={item.quantity}
      productId={item.productId}
      productVariantId={item.productVariantId}
      onChangeChecked={handleChangeChecked}
    >
      {({ Title, Option, Price, Status, defaultValue }) => (
        <>
          <Title>{defaultValue.title}</Title>
          {defaultValue.option && <Option>{defaultValue.option}</Option>}
          <Price>{defaultValue.price}</Price>
          {defaultValue.point}
          <Status>{cartDisabledReason ?? defaultValue.status}</Status>

          <ButtonCaseTypeA
            disabled={disabled}
            isFavorite={product?.vote?.type === VoteStatus.POSITIVE}
            qty={item.quantity}
            maxQty={
              productVariant ? productVariant.stockCount : product.stockCount
            }
            onChangeQty={handleChangeQty}
            onClickDelete={handleClickDelete}
            onClickFavorite={handleClickFavorite}
          />
        </>
      )}
    </StyledOptionItem>
  );
};

export default React.memo(OptionItem);
