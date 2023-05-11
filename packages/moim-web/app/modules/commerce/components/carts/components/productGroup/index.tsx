import * as React from "react";
import styled from "styled-components";

import { Spacer } from "common/components/designSystem/spacer";
import OptionItem from "./components/optionItem";
import ProductGroupBox, {
  ProductGroupBoxTitle,
} from "./components/productGroupBox";
import DeliveryGroupLinkButton from "./components/deliveryGroupLinkButton";
import { DefaultDivider } from "common/components/divider";

import { useStoreState } from "app/store";
import { getCartItemBuyableSelector } from "../../helpers";
import { CartHandlerContext } from "../../context";

const FooterButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 100%;
  }
`;
interface IProps {
  sellerId: string;
  currency: string;
  productGroup: Moim.Commerce.ICartProductGroup;
  price: number;
  shippingFee: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

const ProductGroup: React.FC<IProps> = ({
  sellerId,
  currency,
  productGroup,
  price,
  shippingFee,
  additionalFees,
}) => {
  const { items, type, id, deliveryGroupModel: deliveryGroup } = productGroup;
  const { onChangeProductGroup } = React.useContext(CartHandlerContext);
  const { isAllChecked, deliveryPolicies } = useStoreState(state => {
    const filtered = items.filter(i => getCartItemBuyableSelector(i, state));

    return {
      isAllChecked: filtered.length ? filtered.every(i => i.checked) : false,
      deliveryPolicies:
        type === "deliveryGroup"
          ? deliveryGroup?.policies
          : type === "deliveryAlone"
          ? state.entities.commerce_product[items[0]?.productId]
              ?.deliveryPolicies
          : undefined,
    };
  });

  const handleToggle: React.MouseEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onChangeProductGroup({ sellerId, type, id }, items =>
        items.map(item => ({
          ...item,
          checked: e.currentTarget.checked,
        })),
      );
    },
    [onChangeProductGroup, sellerId, type, id],
  );

  const handleChangeOptionItem = React.useCallback(
    (
      productId: string,
      productVariantId: string | undefined,
      updated: Partial<Moim.Commerce.ICartItemDatum> | null,
    ) => {
      onChangeProductGroup({ sellerId, type, id }, items =>
        items
          .map(item => {
            if (
              item.productId === productId &&
              item.productVariantId === productVariantId
            ) {
              return updated ? { ...item, ...updated } : null;
            }
            return item;
          })
          .filter((i): i is Moim.Commerce.ICartItemDatum => Boolean(i)),
      );
    },
    [onChangeProductGroup, sellerId, type, id],
  );
  const optionItemElements = React.useMemo(() => {
    return items.map(item => (
      <OptionItem
        key={`${item.productId}_${item.productVariantId}`}
        item={item}
        onChangeOptionItem={handleChangeOptionItem}
      />
    ));
  }, [items, handleChangeOptionItem]);

  const titleElement = React.useMemo(
    () => (
      <ProductGroupBoxTitle
        deliveryType={type}
        currency={currency}
        policies={deliveryGroup?.policies}
      />
    ),
    [type, deliveryGroup?.policies, currency],
  );

  const footerButtonElement = React.useMemo(() => {
    const deliveryGroupId =
      productGroup.type === "deliveryGroup" ? productGroup.id : undefined;

    if (deliveryGroupId) {
      return (
        <FooterButtonWrapper>
          <DefaultDivider />
          <Spacer value={12} />
          <DeliveryGroupLinkButton id={deliveryGroupId} />
          <Spacer value={12} />
        </FooterButtonWrapper>
      );
    }

    return null;
  }, [productGroup.type, productGroup.id]);

  return (
    <ProductGroupBox
      title={titleElement}
      currency={currency}
      price={price}
      shippingFee={shippingFee}
      deliveryType={type}
      deliveryPolicies={deliveryPolicies}
      additionalFees={additionalFees}
      footerButtonElement={footerButtonElement}
      isAllChecked={isAllChecked}
      onClickAllCheck={handleToggle}
    >
      {optionItemElements}
    </ProductGroupBox>
  );
};

export default ProductGroup;
