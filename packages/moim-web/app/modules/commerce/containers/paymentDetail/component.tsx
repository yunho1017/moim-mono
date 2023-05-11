import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import useGroupTexts from "common/hooks/useGroupTexts";

import { Spacer } from "common/components/designSystem/spacer";
import BuyerInformation from "./components/buyerInformation";
import PaymentInformation from "./components/paymentInformation";
import ShippingInformation from "./components/shippingInformation";
import RefundInformation from "./components/refundInformation";
import PaymentDetailSkeleton from "./skeleton";
import PurchaseList from "./components/purchaseList";
import {
  HeaderWrapper,
  TitleContainer,
  PaymentCancelButton,
  Title,
  PaymentNumber,
  InformationContainer,
  PurchaseListContainer,
} from "./styled";
import { DefaultBoldDivider } from "common/components/divider";

interface IProps {
  payment?: Moim.Commerce.IPayment;
  isLoading: boolean;
  onClickPaymentCancel(): void;
}

// TODO  확장성을 위해 purchases(seller 별 주문사항에 배송 정보가 들어가있음)
function getPurchase(payment?: Moim.Commerce.IPayment) {
  return payment?.purchases[0];
}

export default function PaymentDetailComponent({
  payment,
  isLoading,
  onClickPaymentCancel,
}: IProps) {
  const intl = useIntl();
  const numberTexts = useGroupTexts("my_shopping_orders_id_title");
  const address = React.useMemo(() => {
    const purchase = getPurchase(payment);

    if (!purchase) {
      return "";
    }

    return `(${purchase.zipcode ?? ""}) ${purchase.address ??
      ""} ${purchase.address2 ?? ""}`;
  }, [payment]);

  if (isLoading) {
    return <PaymentDetailSkeleton />;
  }

  if (!payment) {
    return null;
  }

  return (
    <>
      <Spacer value={4} />
      <HeaderWrapper>
        <TitleContainer>
          <Title>
            {moment(payment.createdAt).format(
              intl.formatMessage({ id: "datetime_format_full_time_date" }),
            )}
          </Title>
          <PaymentNumber>
            {numberTexts ? (
              `${numberTexts.singular} #${payment.id}`
            ) : (
              <FormattedMessage
                id="commerce/purchase_id"
                values={{ purchase_id: payment.id }}
              />
            )}
          </PaymentNumber>
        </TitleContainer>
        {payment.cancellable && (
          <PaymentCancelButton onClick={onClickPaymentCancel}>
            <FormattedMessage id="button_cancel_purchase" />
          </PaymentCancelButton>
        )}
      </HeaderWrapper>

      <Spacer value={4} />
      <InformationContainer>
        <PaymentInformation payment={payment} />
        <BuyerInformation
          name={payment.buyerName}
          phone={payment.buyerPhone}
          email={payment.buyerEmail}
        />
        {payment.purchases.some(purchase =>
          purchase.purchaseItems.some(purchaseItem =>
            Boolean(purchaseItem.shippingRequired),
          ),
        ) && (
          <ShippingInformation
            name={getPurchase(payment)?.recipientName ?? payment.buyerName}
            phone={getPurchase(payment)?.recipientPhone ?? payment.buyerPhone}
            adress={address}
            memo={getPurchase(payment)?.memo}
          />
        )}

        {payment.refunds?.map(refund => (
          <RefundInformation
            key={`refund_${refund.id}`}
            refund={refund}
            currency={payment.currency}
            refundedCardName={payment.detail?.cardName}
          />
        ))}
      </InformationContainer>
      <PurchaseListContainer>
        {payment.purchases.map(purchase => (
          <>
            <DefaultBoldDivider key={`divider_${purchase.id}`} />
            <Spacer value={16} />
            <PurchaseList key={purchase.id} purchase={purchase} />
            <Spacer value={16} />
          </>
        ))}
      </PurchaseListContainer>
    </>
  );
}
