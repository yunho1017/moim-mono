import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import { MoimURL } from "common/helpers/url";
import { useActions } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";
import { ActionCreators as CommerceActionCreators } from "app/actions/commerce";
import PurchaseList from "../purchase";
import {
  Wrapper,
  PaymentTitle,
  PaymentNumber,
  DetailButton,
  RightArrow,
  CancelButton,
  textSkeletonStyle,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";
import PurchaseSkeleton from "../purchase/skeleton";
import { px2rem } from "common/helpers/rem";

interface IProps {
  payment?: Moim.Commerce.IPayment;
}

export default function Payment({ payment }: IProps) {
  const intl = useIntl();
  const { redirect } = useNativeSecondaryView();
  const detailTexts = useGroupTexts("my_shopping_orders_details_title");
  const numberTexts = useGroupTexts("my_shopping_orders_id_title");
  const { openCancelPaymentDialog } = useActions({
    openCancelPaymentDialog: CommerceActionCreators.openCancelPaymentDialog,
  });

  const handleClickDetailButton = React.useCallback(() => {
    if (payment?.id) {
      redirect(new MoimURL.CommercePaymentsShow({ id: payment.id }).toString());
    }
  }, [redirect, payment]);

  const handleClickCancelPayment = React.useCallback(() => {
    if (payment?.id) {
      openCancelPaymentDialog({
        type: "payment",
        targetPaymentId: payment.id,
        targetPurchaseItemIds: [],
        paymentMethodType: payment.payMethod,
        paymentStatus: payment.status,
      });
    }
  }, [openCancelPaymentDialog, payment]);

  if (!payment) {
    return (
      <Wrapper>
        <SkeletonBox
          width={px2rem(137)}
          height={px2rem(18)}
          overrideStyle={textSkeletonStyle}
        />
        <Spacer value={8} />
        <SkeletonBox
          width="100%"
          height={px2rem(32)}
          overrideStyle={textSkeletonStyle}
        />
        <Spacer value={16} />

        <PurchaseSkeleton />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PaymentTitle>
        <span>
          {moment(payment.createdAt).format(
            intl.formatMessage({ id: "datetime_format_full_time_date" }),
          )}
        </span>
        <DetailButton onClick={handleClickDetailButton}>
          {detailTexts ? (
            detailTexts.singular
          ) : (
            <FormattedMessage id="my_shopping/purchase_list/view_purchase_details" />
          )}
          <RightArrow />
        </DetailButton>
      </PaymentTitle>
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

      {payment?.cancellable && (
        <>
          <Spacer value={8} />
          <CancelButton onClick={handleClickCancelPayment}>
            <FormattedMessage id="button_cancel_purchase" />
          </CancelButton>
        </>
      )}

      <Spacer value={16} />
      {payment.purchases.map((purchase, index) => (
        <>
          {index > 0 && <Spacer key={`spacer_${index}`} value={12} />}
          <PurchaseList
            key={purchase.id}
            purchaseId={purchase.id}
            status={payment.status}
            currency={payment.currency}
            purchaseList={purchase.items}
            signUrl={payment.signUrl}
          />
        </>
      ))}
      <Spacer value={8} />
    </Wrapper>
  );
}
