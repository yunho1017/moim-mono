import * as React from "react";
import { Divider } from "../../../myShopping/tabs/payments/styled";
import PurchaseItem from "../../../myShopping/tabs/payments/components/purchaseItem";
import { CustomField } from "../../../myShopping/tabs/payments/components/purchase/styled";
import ProductGroupBox, {
  ProductGroupBoxTitle,
} from "app/modules/commerce/components/carts/components/productGroup/components/productGroupBox";
import { browserLocale } from "app/intl";
import { useStoreState } from "app/store";

interface IProps {
  deliveryType: Moim.Commerce.DeliveryProductGroupType;
  status: Moim.Commerce.PurchaseStatusType;
  currency: string;
  purchaseItems: Moim.Commerce.IPurchaseItem[];
  price: number;
  deliveryFee: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

const ProductGroup: React.FC<IProps> = ({
  deliveryType,
  status,
  currency,
  purchaseItems,
  price,
  deliveryFee,
  additionalFees,
}) => {
  const { locale } = useStoreState(state => ({
    locale: browserLocale(state.app.locale || undefined),
  }));
  const deliveryPolicies = React.useMemo(
    () =>
      purchaseItems[0]?.deliveryGroup?.policy
        ? [purchaseItems[0]?.deliveryGroup?.policy]
        : undefined,
    [purchaseItems[0]?.deliveryGroup?.policy],
  );
  const titleElement = React.useMemo(
    () => (
      <ProductGroupBoxTitle
        deliveryType={deliveryType}
        currency={currency}
        policies={deliveryPolicies}
      />
    ),
    [deliveryType, currency, deliveryPolicies],
  );

  const purchaseItemListElement = React.useMemo(
    () =>
      purchaseItems.map((item, index) => {
        return (
          <>
            {index !== 0 && <Divider key={`spacer_${item.purchaseId}`} />}
            <PurchaseItem
              key={`purchase_${item.purchaseId}`}
              purchaseId={item.purchaseId}
              status={status}
              currency={currency}
              purchaseItem={item}
            />
            {Boolean(item.customFields && item.customFields.length > 0) && (
              <CustomField>
                {item.customFields?.map(field => (
                  <span key={field.key}>{`${field.label?.[locale] ?? ""}: ${
                    field.value
                  }`}</span>
                ))}
              </CustomField>
            )}
          </>
        );
      }),
    [purchaseItems, currency, status],
  );

  return (
    <ProductGroupBox
      title={titleElement}
      currency={currency}
      price={price}
      shippingFee={deliveryFee}
      deliveryType={deliveryType}
      additionalFees={additionalFees}
    >
      {purchaseItemListElement}
    </ProductGroupBox>
  );
};

export default ProductGroup;
