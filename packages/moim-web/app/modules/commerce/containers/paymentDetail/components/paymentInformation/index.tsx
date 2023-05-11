import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import useGroupTexts from "common/hooks/useGroupTexts";

import { Spacer } from "common/components/designSystem/spacer";
import { Title, Wrapper, Section } from "../common";
import { DefaultDivider } from "common/components/divider";
import { PriceWithAdditionalFees } from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";
import AdditionalFeeSection from "./additionalFeeSection";
import CurrencyFormatter from "common/components/currencyFormatter";
import { B4Regular } from "common/components/designSystem/typos";
import { usePaymentStatusDisplay } from "common/helpers/commerce";
import { BlockchainCurrencyTypes } from "app/enums/index";
import UsedCoinSection from "./usedCoinSection";

const PaymentMethodInformation = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
const PaymentVBankMethodInformation = styled(B4Regular)<{
  isVBankPending?: boolean;
}>`
  color: ${props =>
    props.isVBankPending
      ? props.theme.color.red700
      : props.theme.colorV2.colorSet.grey600};
`;

const PriceWithAdditionalFeesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface IProps {
  payment: Moim.Commerce.IPayment;
}

export default function PaymentInformation({ payment }: IProps) {
  const isFundPayment = React.useMemo(
    () => payment.purchases[0]?.purchaseItems[0]?.product?.type === "fund",
    [payment.purchases],
  );
  const paymentStatusText = usePaymentStatusDisplay(payment.status);

  const sectionTitleTexts = useGroupTexts(
    "my_shopping_orders_details_payment_title",
  );
  const totalProductTexts = useGroupTexts(
    "my_shopping_orders_total_product_title",
  );
  const productPrice = React.useMemo(
    () =>
      payment.purchases.reduce(
        (result, current) => result + current.totalPrice, // Note: totalPrice originalPrice 가 아닌 할인이 먹여진 price의 토탈.
        0,
      ),
    [payment],
  );
  const shippingFee = React.useMemo(
    () =>
      payment.purchases.reduce(
        (result, current) => result + current.deliveryFee,
        0,
      ),
    [payment],
  );

  const creditAmount = React.useMemo(
    () =>
      payment.purchases.reduce(
        (result, current) =>
          result +
          current.purchaseItems.reduce(
            (result2, current2) => result2 + (current2.creditAmount ?? 0),
            0,
          ),
        0,
      ),
    [payment],
  );

  const paymentMethodTitle = React.useMemo(() => {
    switch (payment.payMethod) {
      case "CARD":
        return <FormattedMessage id="commerce/purchases/payment_method_card" />;
      case "VBANK":
        return (
          <FormattedMessage id="commerce/purchases/payment_method_virtual_banking" />
        );
      case "BANK_TRANSFER":
        return <FormattedMessage id="payment_method_bank_transfer" />;
      case "PAYPAL":
        return "";
      default:
        return payment.currency in BlockchainCurrencyTypes ? (
          <FormattedMessage
            id={
              payment.status === "vbankPending"
                ? "commerce_purchases_payment_method_cryptocurrency_unconfirmed"
                : "commerce_purchases_payment_method_cryptocurrency_confirmed"
            }
          />
        ) : (
          ""
        );
    }
  }, [payment.currency, payment.payMethod, payment.status]);

  const paymentMethodInformation = React.useMemo(() => {
    switch (payment.payMethod) {
      case "CARD":
        return (
          <Section
            title={""}
            contents={
              <PaymentMethodInformation>
                {`${payment.detail?.cardName ?? ""} ${
                  payment.detail?.cardNum ? `(${payment.detail?.cardNum})` : ""
                }`}
              </PaymentMethodInformation>
            }
            contentsOption={{ textAlign: "right" }}
          />
        );

      case "VBANK":
      case "BANK_TRANSFER":
        return (
          <Section
            title={
              <PaymentVBankMethodInformation>
                ({payment.vbankName}) {payment.vbankNum}
              </PaymentVBankMethodInformation>
            }
            contents={
              <PaymentVBankMethodInformation
                isVBankPending={payment.status === "vbankPending"}
              >
                {paymentStatusText}
              </PaymentVBankMethodInformation>
            }
            titleOption={{ maxWidth: 170 }}
            contentsOption={{ textAlign: "right" }}
          />
        );

      case "PAYPAL":
        return "";
      default:
        return "";
    }
  }, [
    payment.payMethod,
    payment.status,
    payment.vbankName,
    payment.vbankNum,
    payment.detail,
  ]);

  const shippingRequired = React.useMemo(
    () =>
      payment.purchases.some(purchase =>
        purchase.purchaseItems.some(item => item.shippingRequired),
      ),
    [payment],
  );
  return (
    <Wrapper>
      <Title>
        {sectionTitleTexts ? (
          sectionTitleTexts.singular
        ) : (
          <FormattedMessage id="my_shopping/purchase_details/order_payments_title" />
        )}
      </Title>
      <Section
        title={
          totalProductTexts ? (
            totalProductTexts.singular
          ) : (
            <FormattedMessage id="my_shopping/purchase_details/total_product_price" />
          )
        }
        contents={
          <PriceWithAdditionalFeesWrapper>
            <PriceWithAdditionalFees
              currency={payment.currency}
              price={productPrice}
              additionalFees={payment.additionalFees}
            />
          </PriceWithAdditionalFeesWrapper>
        }
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right", isBold: true }}
      />
      {shippingRequired ? (
        <Section
          title={
            <FormattedMessage id="my_shopping/purchase_details/total_shipping_price" />
          }
          contents={
            <CurrencyFormatter
              prefix="+"
              currency={payment.currency}
              value={shippingFee}
            />
          }
          titleOption={{ maxWidth: 170 }}
          contentsOption={{ textAlign: "right" }}
        />
      ) : null}
      {!isFundPayment && payment.userCoupons?.length ? (
        <Section
          title={
            <FormattedMessage id="my_shopping/purchase_details/coupon_discount" />
          }
          contents={
            <CurrencyFormatter
              prefix="-"
              currency={payment.currency}
              value={payment.couponDiscount}
            />
          }
          titleOption={{ maxWidth: 170 }}
          contentsOption={{ textAlign: "right" }}
        />
      ) : null}
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />

      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/total_payment" />
        }
        contents={
          <PriceWithAdditionalFeesWrapper>
            <PriceWithAdditionalFees
              currency={payment.currency}
              price={payment.amount + payment.usedCredit}
              additionalFees={payment.additionalFees}
            />
          </PriceWithAdditionalFeesWrapper>
        }
        titleOption={{ maxWidth: 170 }}
        contentsOption={{ textAlign: "right", isBold: true }}
      />

      {!isFundPayment && (
        <>
          {payment.usedCoins?.map(usedCoin => (
            <UsedCoinSection
              key={`${usedCoin.coinId}_${usedCoin.amount}`}
              coinId={usedCoin.coinId}
              amount={usedCoin.amount}
              price={usedCoin.price}
            />
          ))}

          {payment.additionalFees
            ?.filter(fee => fee.type === "coin" && fee.resourceId)
            .map(fee => (
              <AdditionalFeeSection
                key={`${fee.resourceId}_${fee.amount}`}
                additionalFee={fee}
              />
            ))}
        </>
      )}

      {payment.amount ? (
        <Section
          title={paymentMethodTitle}
          contents={
            <CurrencyFormatter
              currency={payment.currency}
              value={payment.amount}
            />
          }
          titleOption={{ maxWidth: 170 }}
          contentsOption={{ textAlign: "right" }}
        />
      ) : null}

      {paymentMethodInformation}

      {!isFundPayment && creditAmount ? (
        <>
          <Spacer value={8} />
          <DefaultDivider />
          <Spacer value={8} />

          <Section
            title={
              <FormattedMessage id="my_shopping/purchase_details/total_credit" />
            }
            contents={
              <CurrencyFormatter
                currency={payment.currency}
                value={creditAmount}
              />
            }
            titleOption={{ maxWidth: 170 }}
            contentsOption={{ textAlign: "right", isBold: true }}
          />
        </>
      ) : null}
    </Wrapper>
  );
}
