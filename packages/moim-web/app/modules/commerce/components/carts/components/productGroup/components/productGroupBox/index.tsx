import * as React from "react";

import { Checkbox } from "common/components/designSystem/inputs";

import {
  ProductGroupContainer,
  ProductGroupTitleContainer,
  ProductGroupTitle,
  TotalPriceInformation,
  Divider,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import DeliveryPolicyButton from "../deliveryPolicyButton";
import { useIntlShort } from "common/hooks/useIntlShort";
import {
  NoDeliveryTotalPrice,
  ProductPrice,
  ShippingFee,
  TotalPrice,
} from "./price";

interface IProps {
  title: React.ReactNode;
  currency: string;
  price: number;
  shippingFee: number;
  deliveryType: Moim.Commerce.DeliveryProductGroupType;
  deliveryPolicies?: Moim.Commerce.DeliveryPolicy[];
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
  footerButtonElement?: React.ReactNode;
  isAllChecked?: boolean;
  onClickAllCheck?: React.MouseEventHandler<HTMLInputElement>;
}

const ProductGroupBox: React.FC<IProps> = ({
  title,
  currency,
  price,
  shippingFee,
  deliveryType,
  deliveryPolicies,
  additionalFees,
  footerButtonElement,
  isAllChecked,
  onClickAllCheck,

  children,
}) => {
  const intl = useIntlShort();

  const priceText = React.useMemo(() => {
    if (
      (deliveryPolicies &&
        deliveryPolicies.every(policy => policy.type === "custom")) ||
      deliveryType === "noDelivery"
    ) {
      return (
        <NoDeliveryTotalPrice
          currency={currency}
          price={price}
          additionalFees={additionalFees}
        />
      );
    }

    return (
      <>
        <ProductPrice
          currency={currency}
          price={price}
          additionalFees={additionalFees}
        />
        <span className="operator">+</span>
        <ShippingFee currency={currency} shippingFee={shippingFee} />
        <span className="operator">=</span>
        <TotalPrice
          currency={currency}
          price={price + shippingFee}
          additionalFees={additionalFees}
        />
      </>
    );
  }, [
    deliveryType,
    deliveryPolicies,
    price,
    shippingFee,
    currency,
    additionalFees,
  ]);

  const guideText = React.useMemo(() => {
    if (deliveryPolicies) {
      if (deliveryPolicies.length > 1) {
        return intl("cart_shipping_bundle_price_summary_shipping_option");
      }
      if (
        deliveryPolicies.length > 0 &&
        deliveryPolicies.every(policy => policy.type === "custom")
      ) {
        return intl("cart_shipping_bundle_price_summary_shipping_plugin");
      }
    }
    return null;
  }, [deliveryType, deliveryPolicies]);

  return (
    <ProductGroupContainer
      disableBodyPadding={Boolean(!isAllChecked && !onClickAllCheck)}
    >
      <div className="head">
        <Spacer value={8} />
        <ProductGroupTitleContainer>
          {(isAllChecked || onClickAllCheck) && (
            <Checkbox checked={isAllChecked} onChange={onClickAllCheck} />
          )}
          <ProductGroupTitle>{title}</ProductGroupTitle>
        </ProductGroupTitleContainer>
      </div>

      <Divider />

      <div className="body">{children}</div>

      <Divider />

      <div className="footer">
        <Spacer value={8} />
        <TotalPriceInformation>{priceText}</TotalPriceInformation>
        {guideText && (
          <TotalPriceInformation>{guideText}</TotalPriceInformation>
        )}

        <Spacer value={16} />

        {footerButtonElement}
      </div>
    </ProductGroupContainer>
  );
};

export default ProductGroupBox;

function getTitle(
  deliveryType: Moim.Commerce.DeliveryProductGroupType,
  intl: ReturnType<typeof useIntlShort>,
) {
  switch (deliveryType) {
    case "deliveryGroup":
      return intl("cart_shipping_bundle_title_group");
    case "deliveryAlone":
      return intl("cart_shipping_bundle_title_separate");
    case "noDelivery":
      return intl("cart_shipping_bundle_title_no_shipping");
  }
}
export const ProductGroupBoxTitle: React.FC<{
  deliveryType: Moim.Commerce.DeliveryProductGroupType;
  currency: string;
  policies?: Moim.Commerce.DeliveryPolicy[];
}> = ({ deliveryType, currency, policies }) => {
  const intl = useIntlShort();
  const titleElement = React.useMemo(() => {
    const text = getTitle(deliveryType, intl);
    return (
      <>
        {text}
        {policies && (
          <DeliveryPolicyButton
            currency={currency}
            deliveryPolicies={policies}
          />
        )}
      </>
    );
  }, [deliveryType, policies, currency]);

  return titleElement;
};
