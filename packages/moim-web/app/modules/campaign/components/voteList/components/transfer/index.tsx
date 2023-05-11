import * as React from "react";
import { FormattedMessage, useIntl, FormattedNumber } from "react-intl";
import { ThemeContext } from "styled-components";
import useOpenState from "common/hooks/useOpenState";
import CurrencyFormatter from "common/components/currencyFormatter";
import { SingleLineBoxInput } from "common/components/designSystem/boxInput";
import { StaticSelection } from "common/components/designSystem/selection";
import AlertDialog from "common/components/alertDialog";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Wrapper,
  Description,
  SectionTitle,
  SelectionOverrideStyle,
  InfoBox,
  AmountLabel,
  AmountValue,
  TokenValue,
  SubmitButton,
  Inner,
  Footer,
} from "./styled";

interface IProps {
  isLoading: boolean;
  currency: string;
  transferAmount: number;
  bankCodes: { name: string; code: string }[];
  token?: Moim.Campaign.IToken;
  onSubmit(payload: {
    bankCode: string;
    bankAccount: string;
    recipientName: string;
    senderInfo: string;
  }): void;
}

const TransferComponents: React.FC<IProps> = ({
  isLoading,
  currency,
  transferAmount,
  bankCodes,
  token,
  onSubmit,
}) => {
  const intl = useIntl();
  const theme = React.useContext(ThemeContext);
  const [recipientName, setRecipientName] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [bankCode, setBankCode] = React.useState("");
  const [senderInfo, setSenderInfo] = React.useState("(주)커뮤니티랩");
  const {
    isOpen: isConfirmAlertOpen,
    open: handleOpenConfirmAlert,
    close: handleCloseConfirmAlert,
  } = useOpenState();

  const bankOptions = React.useMemo(
    () => bankCodes.map(item => ({ label: item.name, value: item.code })),
    [bankCodes],
  );

  const selectedBankName = React.useMemo(() => {
    const filtered = bankCodes.filter(i => i.code === bankCode);
    if (filtered.length > 0) {
      return filtered[0].name;
    }
    return "- NONE -";
  }, [bankCode, bankCodes]);

  const handleBankOptionChange = React.useCallback((optionValue: string) => {
    setBankCode(optionValue);
  }, []);

  const handleSubmit = React.useCallback(() => {
    onSubmit({
      bankCode,
      bankAccount: account,
      recipientName,
      senderInfo,
    });
    handleCloseConfirmAlert();
  }, [
    account,
    bankCode,
    handleCloseConfirmAlert,
    onSubmit,
    recipientName,
    senderInfo,
  ]);

  const confirmAlertButtons = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="cancel_button" />,
        textColor: theme.colorV2.colorSet.grey600,
        onClick: handleCloseConfirmAlert,
      },
      {
        text: <FormattedMessage id="ok_button" />,

        onClick: handleSubmit,
      },
    ],
    [handleCloseConfirmAlert, handleSubmit, theme.colorV2.colorSet.grey600],
  );

  const enableCondition = React.useMemo(
    () => recipientName && account && bankCode && senderInfo,
    [recipientName, account, bankCode, senderInfo],
  );

  return (
    <>
      <Wrapper>
        <Inner>
          <Description>
            <FormattedMessage id="dialog_transfer_fund_description" />
          </Description>
          <InfoBox>
            <div className="box">
              <AmountLabel>
                <FormattedMessage id="dialog_transfer_fund_amount" />
              </AmountLabel>
              <AmountValue>
                <CurrencyFormatter currency={currency} value={transferAmount} />
              </AmountValue>
              <TokenValue>
                {token && (
                  <TokenValue>
                    <FormattedNumber value={transferAmount / token.price} />{" "}
                    {token.symbol}
                  </TokenValue>
                )}
              </TokenValue>
            </div>
          </InfoBox>
          <Spacer value={8} />
          <SectionTitle>
            <FormattedMessage id="dialog_transfer_fund_bank_name" />
          </SectionTitle>
          <StaticSelection
            size="l"
            state="normal"
            placeholder={intl.formatMessage({
              id: "dialog_transfer_fund_bank_name_placeholder",
            })}
            useSearch={true}
            isMultiple={false}
            menuPortalTarget={document.body}
            selected={bankCode}
            options={bankOptions}
            overrideStyle={SelectionOverrideStyle}
            onChange={handleBankOptionChange}
          />
          <Spacer value={16} />

          <SectionTitle>
            <FormattedMessage id="dialog_transfer_fund_bank_account_number" />
          </SectionTitle>
          <SingleLineBoxInput
            size="Large"
            type="number"
            placeholder={intl.formatMessage({
              id: "dialog_transfer_fund_bank_account_number_placeholder",
            })}
            value={account}
            onChange={setAccount}
          />
          <Spacer value={16} />

          <SectionTitle>
            <FormattedMessage id="dialog_transfer_fund_bank_account_holder" />
          </SectionTitle>
          <SingleLineBoxInput
            size="Large"
            type="text"
            placeholder={intl.formatMessage({
              id: "dialog_transfer_fund_bank_account_holder_placeholder",
            })}
            value={recipientName}
            onChange={setRecipientName}
          />
          <Spacer value={16} />

          <SectionTitle>
            <FormattedMessage id="dialog_transfer_fund_sender" />
          </SectionTitle>
          <SingleLineBoxInput
            size="Large"
            type="text"
            placeholder={intl.formatMessage({
              id: "dialog_transfer_fund_sender_placeholder",
            })}
            value={senderInfo}
            onChange={setSenderInfo}
          />
          <Spacer value={8} />
        </Inner>
        <Footer>
          <SubmitButton
            disabled={!enableCondition}
            waiting={isLoading}
            onClick={handleOpenConfirmAlert}
          >
            <FormattedMessage id="button_transfer" />
          </SubmitButton>
        </Footer>
      </Wrapper>
      <AlertDialog
        open={isConfirmAlertOpen}
        title={<FormattedMessage id="dialog_transfer_fund_summary_title" />}
        content={
          <FormattedMessage
            id="dialog_transfer_fund_summary_body"
            values={{
              bankName: selectedBankName,
              accountNumber: account,
              accountHolder: recipientName,
            }}
          />
        }
        rightButtons={confirmAlertButtons}
        onClose={handleCloseConfirmAlert}
      />
    </>
  );
};

export default TransferComponents;
