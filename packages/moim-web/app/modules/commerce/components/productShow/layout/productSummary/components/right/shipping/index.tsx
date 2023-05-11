import React from "react";
import { Link } from "react-router-dom";

import CurrencyFormatter from "common/components/currencyFormatter";
import {
  ShippingFeeContainer,
  ShippingFee,
  DeliveryGroupLinkChip,
  ArrowIcon,
} from "./styled";
import DeliveryPolicyButton from "app/modules/commerce/components/carts/components/productGroup/components/deliveryPolicyButton";

import { useIntlShort } from "common/hooks/useIntlShort";
import { MoimURL } from "common/helpers/url";
import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";

function getMinMaxDeliveryFeeFromPriceList(
  priceList: { lt?: number; gte?: number; price: number }[],
) {
  const { max, min } = priceList.reduce<{
    min: number | undefined;
    max: number | undefined;
  }>(
    (result, current) => {
      const price = current.price;
      if (result.min === undefined || result.min > price) {
        result.min = price;
      }

      if (result.max === undefined || result.max < price) {
        result.max = price;
      }
      return result;
    },
    { min: undefined, max: undefined },
  );

  return { min: min ?? 0, max: max ?? 0 };
}

function getMinMaxDeliveryPolicies(
  deliveryPolicies: Moim.Commerce.DeliveryPolicy[],
  deliveryFee: number,
  currency: string,
) {
  if (deliveryPolicies?.find(policy => policy.type === "custom")) {
    return <FormattedMessage id="product_show_shipping_price_unknown" />;
  }

  const result = deliveryPolicies?.reduce<{
    min: number | undefined;
    max: number | undefined;
  }>(
    (result, current) => {
      const { min, max } =
        current.type === "priceList"
          ? getMinMaxDeliveryFeeFromPriceList(current.priceList)
          : { min: deliveryFee, max: deliveryFee };

      if (result.min === undefined || result.min > min) {
        result.min = min;
      }

      if (result.max === undefined || result.max < max) {
        result.max = max;
      }
      return result;
    },
    { min: undefined, max: undefined },
  );

  const maxValue = result.max ?? 0;
  const minValue = result.min ?? 0;

  if (maxValue === minValue) {
    return maxValue === 0 ? (
      <FormattedMessage id="shipping_free" />
    ) : (
      <CurrencyFormatter currency={currency} value={minValue ?? 0} />
    );
  }

  return (
    <span className="deliveryFeeRange">
      <span>
        <CurrencyFormatter currency={currency} value={minValue ?? 0} />
      </span>

      <span>
        <CurrencyFormatter currency={currency} value={maxValue ?? 0} />
      </span>
    </span>
  );
}

interface IProps {
  block: Moim.Component.ProductShow.IShipping;
  currency: string;
  deliveryGroupId?: Moim.Id;
  productDeliveryPolicies?: Moim.Commerce.DeliveryPolicy[];
  deliveryFee?: number;
  shippingRequired: boolean;
}

function Shipping({
  block,
  currency,
  deliveryGroupId,
  productDeliveryPolicies,
  deliveryFee: deliveryFeeProps,
  shippingRequired,
}: IProps) {
  const { deliveryPolicies } = useStoreState(state => ({
    deliveryPolicies: deliveryGroupId
      ? state.entities.commerce_delivery_group[deliveryGroupId]?.policies
      : productDeliveryPolicies,
  }));

  const intl = useIntlShort();

  return (
    <ShippingFeeContainer
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <span>
        {!shippingRequired
          ? intl("no_shipping_product")
          : intl("product_show_shipping_price_title")}
      </span>
      <ShippingFee>
        <ShippingFee>
          {Boolean(shippingRequired && deliveryPolicies) && (
            <span>
              {getMinMaxDeliveryPolicies(
                deliveryPolicies!,
                deliveryFeeProps ?? 0,
                currency,
              )}
            </span>
          )}
          {deliveryPolicies?.length ? (
            <DeliveryPolicyButton
              currency={currency}
              deliveryPolicies={deliveryPolicies}
            />
          ) : null}
        </ShippingFee>
        {deliveryGroupId && (
          <Link
            to={new MoimURL.CommerceDeliveryGroup({
              id: deliveryGroupId,
            }).toString()}
          >
            <DeliveryGroupLinkChip size="small" shape="round">
              {intl("product_show_shipping_price_view_shipping_group_page")}
              <ArrowIcon />
            </DeliveryGroupLinkChip>
          </Link>
        )}
      </ShippingFee>
    </ShippingFeeContainer>
  );
}
export default React.memo(Shipping);
