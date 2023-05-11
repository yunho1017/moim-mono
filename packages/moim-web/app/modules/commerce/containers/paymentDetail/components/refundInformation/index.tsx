import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { Spacer } from "common/components/designSystem/spacer";
import { Title, Wrapper, Section } from "../common";
import { DefaultDivider } from "common/components/divider";
import CurrencyFormatter from "common/components/currencyFormatter";
import { PriceWithAdditionalFees } from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";
import RefundMethod from "./refundMethod";

const AdditionalFeeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RefundTotalPrice = styled(AdditionalFeeWrapper)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

interface IProps {
  currency: string;
  refund: Moim.Commerce.IRefund;
  refundedCardName?: string;
}

export default function RefundInformation({
  currency,
  refundedCardName,
  refund,
}: IProps) {
  const intl = useIntl();
  const isCancelled = refund.status === "cancelled";
  const fullDateTimeFormat = intl.formatMessage({
    id: "datetime_format_full_time_date",
  });

  const refundedCoinPrice = React.useMemo(
    () =>
      refund.refundedCoins?.reduce(
        (result, current) => result + current.price,
        0,
      ) ?? 0,
    [refund.refundedCoins],
  );
  const {
    refundedShippingFee,
    refundedProductPrice,
    refundedCoupon,
  } = React.useMemo(() => {
    let pPrice = 0;
    let pShipping = 0;
    let pCoupon = 0;

    refund.items.forEach(item => {
      pPrice += item.productPrice;
      pShipping += item.deliveryFee;
      pCoupon += item.couponDiscount;
    });

    return {
      refundedProductPrice: pPrice,
      refundedShippingFee: pShipping,
      refundedCoupon: pCoupon,
    };
  }, [refund.items]);

  return (
    <Wrapper>
      <Title>
        <FormattedMessage
          id={
            isCancelled
              ? "my_shopping_purchase_cancel_details_page_title"
              : "my_shopping_purchase_refund_details_page_title"
          }
        />
      </Title>
      <Section
        title={
          <FormattedMessage
            id={
              isCancelled
                ? "my_shopping_purchase_cancel_details_cancel_request_date"
                : "my_shopping_purchase_refund_details_refund_request_date"
            }
          />
          // 접수일
        }
        contents={moment(refund.createdAt).format(fullDateTimeFormat)}
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right" }}
      />
      <Section
        title={
          <FormattedMessage
            id={
              isCancelled
                ? "my_shopping_purchase_cancel_details_cancel_request_number"
                : "my_shopping_purchase_refund_details_refund_request_number"
            }
          />
          // 접수 번호
        }
        contents={refund.id}
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right" }}
      />
      <Section
        title={
          <FormattedMessage
            id={
              isCancelled
                ? "my_shopping_purchase_cancel_details_cancel_completion_date"
                : "my_shopping_purchase_refund_details_refund_completion_date"
            }
          />
        }
        contents={
          refund.refundedAt ? (
            moment(refund.refundedAt).format(fullDateTimeFormat)
          ) : (
            <FormattedMessage
              id={
                isCancelled
                  ? "status_cancel_in_progress"
                  : "status_refund_in_progress"
              }
            />
          )
        }
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right" }}
      />

      <Section
        title={
          <FormattedMessage
            id={
              isCancelled
                ? "my_shopping_purchase_cancel_details_cancel_reason"
                : "my_shopping_purchase_cancel_details_refund_reason"
            }
          />
        }
        contents={refund.reason}
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right" }}
      />

      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />

      <Section
        title={
          <FormattedMessage id="my_shopping_purchase_cancel_details_product_price" />
        }
        contents={
          <AdditionalFeeWrapper>
            <PriceWithAdditionalFees
              currency={currency}
              price={refundedProductPrice}
              additionalFees={refund.additionalFees}
            />
          </AdditionalFeeWrapper>
        }
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right" }}
      />
      {refundedShippingFee ? (
        <Section
          title={
            <FormattedMessage id="my_shopping_purchase_cancel_details_shipping_price" />
          }
          contents={
            <CurrencyFormatter
              currency={currency}
              value={refundedShippingFee}
            />
          }
          titleOption={{ maxWidth: 170 }}
          contentsOption={{ textAlign: "right" }}
        />
      ) : null}
      {refundedCoupon ? (
        <Section
          title={
            <FormattedMessage id="my_shopping_purchase_cancel_details_coupon_discount" />
          }
          contents={
            <CurrencyFormatter currency={currency} value={refundedCoupon} />
          }
          titleOption={{ maxWidth: 170 }}
          contentsOption={{ textAlign: "right" }}
        />
      ) : null}
      {/* 환불 받은 계좌정보 */}
      <RefundMethod
        currency={currency}
        refundedCardName={refundedCardName}
        refundedCoins={refund.refundedCoins}
        refundedAmount={refund.amount}
        refundBankMethod={refund.refundBankMethod}
        additionalFees={refund.additionalFees}
      />
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />

      <Section
        title={
          <FormattedMessage id="my_shopping_purchase_cancel_details_refund_price" />
        }
        contents={
          <RefundTotalPrice>
            <PriceWithAdditionalFees
              currency={currency}
              price={refund.amount + refundedCoinPrice}
              additionalFees={refund.additionalFees}
            />
          </RefundTotalPrice>
        }
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right", isBold: true }}
      />
    </Wrapper>
  );
}
