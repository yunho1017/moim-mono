import * as React from "react";
import PurchaseItem from "../purchaseItem";
import { Divider } from "../../styled";
import {
  Wrapper,
  ListTitle,
  RightArrow,
  CustomField,
  SellerSkeleton,
} from "./styled";

import useRedirect from "common/hooks/useRedirect";
import { useStoreState } from "app/store";
import { browserLocale } from "app/intl";
import { MoimURL } from "common/helpers/url";

interface IProps {
  purchaseId?: Moim.Id;
  status: Moim.Commerce.PurchaseStatusType;
  currency: string;
  purchaseList: Moim.Commerce.IPurchaseDeliveryProductGroup[];
  renderCustomField?: boolean;
  signUrl?: string;
}

export default function PurchaseList({
  purchaseId,
  status,
  currency,
  purchaseList,
  renderCustomField,
  signUrl,
}: IProps) {
  const redirect = useRedirect();
  const { locale, seller } = useStoreState(state => ({
    locale: browserLocale(state.app.locale || undefined),
    seller: purchaseList[0]?.items[0]?.sellerId
      ? state.entities.commerce_seller[purchaseList[0]?.items[0]?.sellerId]
      : undefined,
  }));
  const handleClickSeller = React.useCallback(() => {
    if (seller) {
      redirect(
        new MoimURL.CommerceSellers({
          id: seller.id,
          section: "products",
        }).toString(),
      );
    }
  }, [redirect, seller]);

  const inner = React.useMemo(
    () =>
      purchaseList
        .reduce<Moim.Commerce.IPurchaseItem[]>(
          (result, current) => result.concat(current.items),
          [],
        )
        .map(item => {
          return (
            <>
              <Divider key={`spacer_${item.purchaseId}`} />
              <PurchaseItem
                key={`purchase_${item.purchaseId}`}
                purchaseId={purchaseId}
                status={status}
                currency={currency}
                purchaseItem={item}
                signUrl={signUrl}
              />
              {Boolean(
                renderCustomField &&
                  item.customFields &&
                  item.customFields.length > 0,
              ) && (
                <CustomField key={`custom_field_${item.purchaseId}`}>
                  {item.customFields?.map(field => (
                    <span
                      key={`custom_field_${item.purchaseId}_${field.key}`}
                    >{`${field.label?.[locale] ?? ""}: ${field.value}`}</span>
                  ))}
                </CustomField>
              )}
            </>
          );
        }),
    [purchaseId, purchaseList, status, currency, renderCustomField, locale],
  );

  return (
    <Wrapper>
      <ListTitle onClick={handleClickSeller}>
        {seller ? (
          <>
            <span>{seller.name}</span>
            <RightArrow />
          </>
        ) : (
          <SellerSkeleton />
        )}
      </ListTitle>

      {inner}
    </Wrapper>
  );
}
