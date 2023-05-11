import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useActions, useStoreState } from "app/store";
import { manualPurchaseItemConfirm } from "app/actions/commerce";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import OptionItem from "common/components/commerce/optionItem";
import AlertDialog from "common/components/alertDialog";
import ButtonCasePayment, {
  IButton,
} from "common/components/commerce/optionItem/buttonCase/payment";
import {
  TitleContainer,
  Title,
  PriceWrapper,
  CustomStatus,
  StyledReviewReward,
} from "./styled";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import ConfirmDialog from "common/components/alertDialog/confirm";
import useOpenState from "app/common/hooks/useOpenState";
import { getSellerSelector } from "app/selectors/commerce";
import { currentGroupSelector } from "app/selectors/app";
import {
  useAddCartButton,
  useDeliveryTrackingButton,
  useManualPurchaseConfirmButton,
  useReviewWriteButton,
  useMyReviewButton,
  useFundingSignButton,
  useSellerCustomButton,
  useOpenReviewWriteDialog,
} from "./buttons";
import { usePaymentStatusDisplay } from "common/helpers/commerce";
import PurchaseItemSkeleton from "./skeleton";
import { BlockchainCurrencyTypes } from "app/enums/index";
import {
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";

interface IProps {
  purchaseId?: Moim.Id;
  status: Moim.Commerce.PurchaseStatusType;
  currency: string;
  purchaseItem: Moim.Commerce.IPurchaseItem;
  signUrl?: string;
}

export default function PurchaseItem({
  purchaseId,
  currency: currencyProps,
  status: statusProps,
  purchaseItem,
  signUrl,
}: IProps) {
  const {
    isOpen: isOpenPurchaseConfirmAlert,
    open: openPurchaseConfirmAlert,
    close: closePurchaseConfirmAlert,
  } = useOpenState();
  const {
    isOpen: isOpenSuccessConfirmPurchaseAlert,
    open: openSuccessConfirmPurchaseAlert,
    close: closeSuccessConfirmPurchaseAlert,
  } = useOpenState();

  const { location, redirect } = useNativeSecondaryView();
  const locale = useCurrentUserLocale();
  const openReviewWriteDialog = useOpenReviewWriteDialog(
    purchaseItem,
    purchaseId,
  );
  const { hubSeller, product } = useStoreState(state => ({
    hubSeller: getSellerSelector(
      state,
      currentGroupSelector(state)?.seller_id ?? "",
    ),
    product: state.entities.commerce_product[purchaseItem.productId],
  }));

  const { dispatchManualPurchaseItemConfirm } = useActions({
    dispatchManualPurchaseItemConfirm: manualPurchaseItemConfirm,
  });

  const currency = React.useMemo(() => product?.currency ?? currencyProps, [
    product?.currency,
    currencyProps,
  ]);

  const imageProps = React.useMemo(
    () =>
      purchaseItem.imageUrl
        ? {
            web: [{ url: purchaseItem.imageUrl }],
            mobile: [{ url: purchaseItem.imageUrl }],
          }
        : undefined,
    [purchaseItem.imageUrl],
  );

  const option = React.useMemo(() => {
    if (
      !purchaseItem.productVariantValue ||
      Object.keys(purchaseItem.productVariantValue).length === 0
    ) {
      return undefined;
    }

    const res =
      purchaseItem.productVariantValue[locale as any] ??
      purchaseItem.productVariantValue["en"] ??
      purchaseItem.productVariantValue[
        Object.keys(purchaseItem.productVariantValue)[0]
      ];

    return Object.entries(res)
      ?.map(([key, value]) => `${key}:${value}`)
      .join(" · ");
  }, [locale, purchaseItem.productVariantValue]);

  const manualPurchaseConfirm = React.useCallback(async () => {
    await dispatchManualPurchaseItemConfirm([purchaseItem.id]);
    closePurchaseConfirmAlert();
    openSuccessConfirmPurchaseAlert();
    setTimeout(() => {
      if (location) {
        redirect(location.pathname);
      }
    }, 300);
  }, [
    closePurchaseConfirmAlert,
    dispatchManualPurchaseItemConfirm,
    redirect,
    purchaseItem.id,
  ]);
  const handleClickReviewWriteButton = React.useCallback(async () => {
    closeSuccessConfirmPurchaseAlert();
    openReviewWriteDialog();
  }, [closeSuccessConfirmPurchaseAlert, openReviewWriteDialog]);

  const DeliveryTrackingButton = useDeliveryTrackingButton(
    purchaseItem.deliveryId,
  );
  const AddToCartButton = useAddCartButton(purchaseItem);
  const ReviewWriteButton = useReviewWriteButton(openReviewWriteDialog);
  const ManualPurchaseConfirmButton = useManualPurchaseConfirmButton(
    openPurchaseConfirmAlert,
  );
  const MyReviewButton = useMyReviewButton(
    purchaseItem.productId,
    purchaseItem.reviewId,
  );
  const FundingSignButton = useFundingSignButton(signUrl);
  const SellerUpdatesButton = useSellerCustomButton(purchaseItem.customButtons);
  const buttons = React.useMemo(() => {
    const _buttons: IButton[] = [];
    if (SellerUpdatesButton) {
      _buttons.push(SellerUpdatesButton);
    }
    switch (purchaseItem.status ?? statusProps) {
      case "paymentError": {
        break;
      }
      case "created":
      case "vbankPending":
      case "paid":
        break;
      case "deliveryDelayed":
      case "preparingForDelivery":
      case "waitingToBePickedUp":
        if (purchaseItem.deliveryId) {
          _buttons.push(DeliveryTrackingButton);
        }
        break;
      case "inTransit":
      case "deliveryCompleted":
        if (purchaseItem.deliveryId) {
          _buttons.push(DeliveryTrackingButton);
        }

        _buttons.push(ManualPurchaseConfirmButton);
        break;
      case "purchaseCompleted":
        _buttons.push(AddToCartButton);
        if (purchaseItem.shippingRequired && purchaseItem.deliveryId) {
          _buttons.push(DeliveryTrackingButton);
        }
        switch (purchaseItem.reviewable) {
          case "alreadyWritten": {
            _buttons.push(MyReviewButton);
            break;
          }
          case "canWrite": {
            _buttons.push(ReviewWriteButton);
            break;
          }
          default: {
            break;
          }
        }
        break;
      case "waitingForSign":
        _buttons.push(FundingSignButton);
        break;
      case "refundRequested":
      case "refunded":
        break;
    }

    return _buttons;
  }, [
    purchaseItem.status,
    purchaseItem.deliveryId,
    purchaseItem.shippingRequired,
    purchaseItem.reviewable,
    statusProps,
    ManualPurchaseConfirmButton,
    AddToCartButton,
    FundingSignButton,
    DeliveryTrackingButton,
    MyReviewButton,
    ReviewWriteButton,
    SellerUpdatesButton,
  ]);

  const customStatusElement = React.useMemo(() => {
    if (hubSeller?.customStatusDefinition && purchaseItem.customStatus) {
      return (
        <CustomStatus>
          {hubSeller.customStatusDefinition[purchaseItem.customStatus]?.[
            locale
          ] ?? null}
        </CustomStatus>
      );
    }
    return null;
  }, [hubSeller, purchaseItem, locale]);

  const title = usePaymentStatusDisplay(purchaseItem.status ?? statusProps, {
    shippingRequired: purchaseItem.shippingRequired,
    isBlockchainCurrency: Boolean(currency in BlockchainCurrencyTypes),
  });

  if (!product) {
    return <PurchaseItemSkeleton />;
  }
  return (
    <>
      <TitleContainer>
        {customStatusElement}
        <Title>{title}</Title>
      </TitleContainer>
      <OptionItem
        sellerId={purchaseItem.sellerId}
        productId={purchaseItem.productId}
        variantId={purchaseItem.productVariantId}
        productType={product?.type}
        status="onSale"
        title={purchaseItem.productName}
        imageUrl={imageProps}
        option={option}
        price={purchaseItem.price_price}
        originPrice={purchaseItem.price_price}
        rawPrice={purchaseItem.price}
        rawOriginPrice={purchaseItem.price}
        additionalFees={purchaseItem.additionalFees}
        qty={purchaseItem.quantity}
        useCheckBox={false}
      >
        {({ Title: OptionTitle, Option, Price, defaultValue }) => (
          <>
            <OptionTitle>{defaultValue.title}</OptionTitle>
            {defaultValue.option && <Option>{defaultValue.option}</Option>}
            <Price>
              <PriceWrapper>
                <PriceWithAdditionalFees
                  currency={currency}
                  price={purchaseItem.price}
                  AdditionalFeeComponent={AdditionalFeeWithPreview}
                  additionalFees={purchaseItem.additionalFees}
                >
                  {prices =>
                    (prices.length ?? 0) > 1 ? <>({prices})</> : prices
                  }
                </PriceWithAdditionalFees>
                <span className="quantity">
                  <FormattedMessage
                    id="commerce/quantity_short"
                    values={{ n: purchaseItem.quantity }}
                  />
                </span>
              </PriceWrapper>
            </Price>
            <ButtonCasePayment buttons={buttons} />
          </>
        )}
      </OptionItem>

      <ConfirmDialog
        confirmMessage=""
        disableCheckButton={true}
        open={isOpenPurchaseConfirmAlert}
        content={<FormattedMessage id="dialog_confirm_purchase_body" />}
        onClose={closePurchaseConfirmAlert}
        negativeButtonProps={{
          text: <FormattedMessage id="cancel_button" />,
          onClick: closePurchaseConfirmAlert,
        }}
        positiveButtonProps={{
          text: <FormattedMessage id="button_confirm_purchase" />,
          onClick: manualPurchaseConfirm,
        }}
      />
      <AlertDialog
        open={isOpenSuccessConfirmPurchaseAlert}
        title={<FormattedMessage id="dialog_success_confirm_purchase_title" />}
        content={<StyledReviewReward />}
        rightButtons={[
          {
            text: <FormattedMessage id="cancel_button" />,
            onClick: closePurchaseConfirmAlert,
          },
          {
            text: <FormattedMessage id="button_go_write_review" />,
            onClick: handleClickReviewWriteButton,
          },
        ]}
        onClose={closeSuccessConfirmPurchaseAlert}
      />
    </>
  );
}
