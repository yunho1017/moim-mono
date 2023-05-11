import * as React from "react";
import { useActions, useStoreState } from "app/store";
import { FormattedMessage, useIntl } from "react-intl";
import { transferCoin } from "app/actions/community/coin";
// hooks
import useCurrentUser from "common/hooks/useCurrentUser";
import useSearchUsers from "common/hooks/useSearchUsers";
// components
import { MultilineBoxInput } from "common/components/designSystem/boxInput";
import {
  MemberSelection,
  StaticSelection,
} from "common/components/designSystem/selection";
import { H8Bold } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
import { CoinTransferDialog as Dialog } from "common/components/basicResponsiveDialog/styled";
import AppBar from "common/components/appBar";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import ConfirmDialog from "common/components/alertDialog/confirm";
import TransferCandyRedirectLoadingDialog from "app/modules/community/coin/components/transferCandyRedirectLoadingDialog";

// styled
import { NumberInput } from "common/components/designSystem/boxInput/styled";
import {
  CloseButton,
  Section,
  SectionTitle,
  SectionContent,
  SelectionStyle,
  DescriptionBoxStyle,
  TransferAmountInputWrapper,
  TransferButton,
  TransferDialogWrapper,
  transferDialogMemberSelectionWrapperStyle,
  transterDialogWrapperStyle,
  TransferDialogFooter,
  TransferDialogBody,
} from "./styled";
import useOpenState from "common/hooks/useOpenState";

interface IProps {
  coinId?: string;
  isOpen: boolean;
  disableCoinSelectField?: boolean;
  onClose(): void;
}

const CoinTransferDialog: React.FC<IProps> = ({
  coinId,
  isOpen,
  disableCoinSelectField = false,
  onClose,
}) => {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const coins = useStoreState(state => state.entities.community_coins);
  const callbackUrl = `${window.location.origin}/coins/${coinId}`;

  const [selectedUserId, setSelectedUser] = React.useState<string | null>(null);
  const [tokenId, setTokenId] = React.useState<string | null>(
    coinId ? coins[coinId].id : null,
  );
  const [amount, setAmount] = React.useState<number | undefined>(undefined);
  const [senderMessage, setTransfererMessage] = React.useState<
    string | undefined
  >(undefined);

  const receiver = useStoreState(state =>
    selectedUserId ? state.entities.users[selectedUserId] : undefined,
  );

  const { transferCoinAction } = useActions({
    transferCoinAction: transferCoin,
  });

  const {
    users,
    isLoading,
    handleSearchChange: onSearchChange,
  } = useSearchUsers();

  const {
    isOpen: isOpenTransferConfirmAlert,
    open: openTransferConfirmAlert,
    close: closeTransferConfirmAlert,
  } = useOpenState();
  const {
    isOpen: isOpenLoadingDialog,
    open: openLoadingDialog,
    close: closeLoadingDialog,
  } = useOpenState();

  const handleChangeTokenId = React.useCallback(async (_tokenId: string) => {
    setTokenId(_tokenId);
  }, []);

  const handleClickTransfer = React.useCallback(() => {
    if (tokenId && receiver && currentUser && amount) {
      openLoadingDialog();
      transferCoinAction(
        tokenId,
        callbackUrl,
        { userId: receiver.id, address: receiver.metamask },
        { userId: currentUser.id, address: currentUser.metamask },
        amount,
        senderMessage,
      ).then(result => {
        if (result?.location) window.location.href = result.location;
      });
    }
  }, [
    amount,
    callbackUrl,
    currentUser,
    openLoadingDialog,
    receiver,
    senderMessage,
    tokenId,
    transferCoinAction,
  ]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <CustomAppBarModalLayout
          appBar={
            <AppBar
              leftButton={<CloseButton onClick={onClose} />}
              alwaysShowAppBarTitle={true}
              titleElement={
                <H8Bold>
                  <FormattedMessage
                    id="send_candy_dialog_title"
                    values={{ candy_name: coinId ? coins[coinId].name : "" }}
                  />
                </H8Bold>
              }
              titleAlignment="Center"
              wrapperStyle={transterDialogWrapperStyle}
            />
          }
          hasAppBarBorder={false}
        >
          <TransferDialogWrapper>
            <TransferDialogBody>
              <Spacer value={9} />

              {!disableCoinSelectField && (
                <Section>
                  <SectionTitle>
                    <FormattedMessage id="send_candy_dialog_select_candy_title" />
                  </SectionTitle>
                  <SectionContent>
                    <StaticSelection
                      size="l"
                      state="normal"
                      selected={tokenId}
                      options={Object.entries(coins)
                        .filter(coin => coin[1].transferrable)
                        .map(item => ({
                          value: item[0],
                          label: item[1].name,
                        }))}
                      isMultiple={false}
                      useSearch={true}
                      placeholder={intl.formatMessage({
                        id: "send_candy_dialog_select_candy_placeholder",
                      })}
                      overrideStyle={SelectionStyle}
                      onChange={handleChangeTokenId}
                    />
                  </SectionContent>
                </Section>
              )}
              <Section>
                <SectionTitle>
                  <FormattedMessage id="send_candy_dialog_select_member_title" />
                </SectionTitle>
                <MemberSelection
                  overrideStyle={transferDialogMemberSelectionWrapperStyle}
                  size="l"
                  state="normal"
                  isMultiple={false}
                  selected={selectedUserId}
                  options={users.data
                    .filter(user => Boolean(user.metamask))
                    .map(item => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  onChange={value => setSelectedUser(value as string)}
                  placeholder={intl.formatMessage({
                    id: "send_candy_dialog_select_member_placeholder",
                  })}
                  useSearch={true}
                  isSearchLoading={isLoading}
                  onSearchChange={onSearchChange}
                />
              </Section>
              <Section>
                <SectionTitle>
                  <FormattedMessage id="send_candy_dialog_amount_title" />
                </SectionTitle>
                <SectionContent>
                  <TransferAmountInputWrapper>
                    <NumberInput
                      type="number"
                      placeholder={intl.formatMessage({
                        id: "send_candy_dialog_amount_placeholder",
                      })}
                      value={amount}
                      onChange={elem => setAmount(Number(elem.target.value))}
                    />
                  </TransferAmountInputWrapper>
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle>
                  <FormattedMessage id="send_candy_dialog_message_title" />
                </SectionTitle>
                <SectionContent>
                  <MultilineBoxInput
                    autoFocus={false}
                    wrapperStyle={DescriptionBoxStyle}
                    size="Large"
                    value={senderMessage}
                    placeholder={intl.formatMessage({
                      id: "send_candy_dialog_message_placeholder",
                    })}
                    suffix={{
                      type: "characters",
                      maxCount: 2000,
                    }}
                    helperText={
                      <FormattedMessage
                        id="send_candy_dialog_message_max_count_title"
                        values={{ maxCount: 2000 }}
                      />
                    }
                    onChange={value => setTransfererMessage(value)}
                  />
                </SectionContent>
              </Section>
            </TransferDialogBody>
            <TransferDialogFooter>
              <Section>
                <Spacer value={8} />
                <TransferButton
                  disabled={!tokenId || !receiver || !currentUser || !amount}
                  onClick={openTransferConfirmAlert}
                >
                  <FormattedMessage
                    id="button_send_candy_dialog_send_candy"
                    values={{ candy_name: coinId ? coins[coinId].name : "" }}
                  />
                </TransferButton>
              </Section>
            </TransferDialogFooter>
          </TransferDialogWrapper>
        </CustomAppBarModalLayout>
      </Dialog>
      <ConfirmDialog
        title={
          <FormattedMessage id="send_candy_dialog_confirm_send_candy_title" />
        }
        disableCheckButton={true}
        open={isOpenTransferConfirmAlert}
        content={
          <FormattedMessage
            id="send_candy_dialog_confirm_send_candy_body"
            values={{
              candy_name: coinId ? coins[coinId].name : "",
              amount,
              symbol: coinId ? coins[coinId].symbol : "",
              recipient_username: receiver ? receiver?.name : "",
            }}
          />
        }
        onClose={closeTransferConfirmAlert}
        negativeButtonProps={{
          text: <FormattedMessage id="cancel_button" />,
          onClick: closeTransferConfirmAlert,
        }}
        positiveButtonProps={{
          text: <FormattedMessage id="button_ok" />,
          onClick: handleClickTransfer,
        }}
        confirmMessage={undefined}
      />
      <TransferCandyRedirectLoadingDialog
        open={isOpenLoadingDialog}
        close={closeLoadingDialog}
      />
    </>
  );
};

export default CoinTransferDialog;
