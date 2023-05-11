import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState, useActions } from "app/store";
// actions
import {
  ActionCreators as CommerceActionCreators,
  cancelPayment,
} from "app/actions/commerce";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import {
  Dialog,
  CloseButton,
} from "common/components/basicResponsiveDialog/styled";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";
import FreezeView from "common/components/freezeView";
import {
  MultilineBoxInput,
  SingleLineBoxInput,
} from "common/components/designSystem/boxInput";
import { StaticSelection } from "common/components/designSystem/selection";
import {
  Wrapper,
  Row,
  Field,
  Content,
  ButtonContainer,
  Divider,
  SelectionOverrideStyle,
  CancelButton,
  SubmitButton,
} from "./styled";

interface IProps {
  onAfterCancelSubmitAction?(paymentId: Moim.Id): void;
}

const PaymentCancelDialog: React.FC<IProps> = ({
  onAfterCancelSubmitAction,
}) => {
  const isMobile = useIsMobile();
  const intl = useIntl();
  const [isLoading, setLoadStatus] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState("");
  const [name, setName] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [bankCode, setBankCode] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();

  const {
    open,
    targetPaymentId,
    paymentMethodType,
    paymentStatus,
    bankOptions,
  } = useStoreState(state => ({
    ...state.commercePage.paymentCancelDialog,
    bankOptions: state.commerce.info.nicepayBankCodes.map(item => ({
      label: item.name,
      value: item.code,
    })),
  }));
  const { dispatchCancelPayment, close } = useActions({
    dispatchCancelPayment: cancelPayment,
    close: CommerceActionCreators.closeCancelPaymentDialog,
  });

  const needRefundBankInput = React.useMemo(
    () =>
      paymentMethodType === "VBANK" &&
      !(
        paymentStatus === "created" ||
        paymentStatus === "vbankPending" ||
        paymentStatus === "paymentError"
      ),
    [paymentMethodType, paymentStatus],
  );

  const handleClose = React.useCallback(() => {
    if (!isLoading) {
      close();
    }
  }, [close, isLoading]);

  const appBar = React.useMemo(
    () => (
      <AppBar
        titleAlignment="Center"
        ignoreMobileTitleAlignment={true}
        leftButton={<CloseButton onClick={handleClose} />}
        titleElement={<FormattedMessage id="payment_cancel_dialog/title" />}
      />
    ),
    [handleClose],
  );

  const handleBankOptionChange = React.useCallback((optionValue: string) => {
    setBankCode(optionValue);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (!cancelReason) {
      setError(intl.formatMessage({ id: "common_error_required_input_field" }));
      return;
    }
    setLoadStatus(true);

    if (!isLoading && targetPaymentId) {
      const refundBankMethod:
        | Moim.Commerce.IRefundBankMethod
        | undefined = needRefundBankInput
        ? {
            name,
            account,
            bankCode,
          }
        : undefined;
      dispatchCancelPayment(
        targetPaymentId,
        cancelReason,
        refundBankMethod,
        intl.formatMessage({ id: "payment_cancel_success_message" }),
      ).finally(() => {
        setLoadStatus(false);
        onAfterCancelSubmitAction?.(targetPaymentId);
        handleClose();
      });
    }
  }, [
    isLoading,
    targetPaymentId,
    needRefundBankInput,
    onAfterCancelSubmitAction,
    name,
    account,
    bankCode,
    dispatchCancelPayment,
    cancelReason,
    intl,
    handleClose,
  ]);

  const refundBank = React.useMemo(
    () =>
      needRefundBankInput ? (
        <>
          <Row>
            <Field>
              <FormattedMessage id="dialog_cancel_purchase_vitrual_banking_account_holder" />
            </Field>
            <Content>
              <SingleLineBoxInput
                size="Large"
                helperText=""
                value={name}
                onChange={setName}
              />
            </Content>
          </Row>

          <Row>
            <Field>
              <FormattedMessage id="dialog_cancel_purchase_vitrual_banking_bank_name" />
            </Field>
            <Content>
              <StaticSelection
                size="l"
                state="normal"
                placeholder={intl.formatMessage({
                  id: "dialog_cancel_purchase_vitrual_banking_bank_name",
                })}
                useSearch={true}
                isMultiple={false}
                selected={bankCode}
                options={bankOptions}
                overrideStyle={SelectionOverrideStyle}
                onChange={handleBankOptionChange}
                menuPortalTarget={document.body}
              />
            </Content>
          </Row>

          <Row>
            <Field>
              <FormattedMessage id="dialog_cancel_purchase_vitrual_banking_account_number" />
            </Field>
            <Content>
              <SingleLineBoxInput
                size="Large"
                helperText=""
                type="number"
                value={account}
                onChange={setAccount}
              />
            </Content>
          </Row>

          <Divider />
        </>
      ) : null,
    [
      account,
      bankCode,
      bankOptions,
      handleBankOptionChange,
      intl,
      name,
      needRefundBankInput,
    ],
  );

  React.useEffect(() => {
    if (!open) {
      setCancelReason("");
      setName("");
      setAccount("");
      setBankCode("");
    }
  }, [open]);

  return (
    <Dialog open={open} fullScreen={isMobile} onClose={handleClose}>
      <CustomAppBarModalLayout appBar={appBar} hasAppBarBorder={false}>
        <FreezeView isFreeze={open} delayedFreeze={50}>
          <Wrapper data-scroll-lock-scrollable>
            <Row>
              <Field>
                <FormattedMessage id="dialog_cancel_purchase_reason_input_title" />
              </Field>
              <Content>
                <MultilineBoxInput
                  status={error ? "Error" : undefined}
                  placeholder={intl.formatMessage({
                    id: "dialog_cancel_purchase_reason_input_placeholder",
                  })}
                  size="Large"
                  helperText={error ?? ""}
                  value={cancelReason}
                  onChange={setCancelReason}
                />
              </Content>
            </Row>

            <Divider />

            {refundBank}

            <ButtonContainer>
              <CancelButton disabled={isLoading} onClick={handleClose}>
                <FormattedMessage id="close_button" />
              </CancelButton>
              <SubmitButton
                disabled={isLoading}
                waiting={isLoading}
                onClick={handleSubmit}
              >
                <FormattedMessage id="button_cancel_purchase" />
              </SubmitButton>
            </ButtonContainer>
          </Wrapper>
        </FreezeView>
      </CustomAppBarModalLayout>
    </Dialog>
  );
};

export default PaymentCancelDialog;
