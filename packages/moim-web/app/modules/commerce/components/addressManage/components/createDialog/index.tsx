import * as React from "react";
import { FormattedMessage } from "react-intl";
// selector
import { getShippingAddressList } from "app/selectors/commerce";
// hooks
import { useActions, useStoreState } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import useCurrentGroup from "common/hooks/useCurrentGroup";
// actions
import {
  createShippingAddress,
  setAsDefaultShippingAddress,
  updateShippingAddress,
} from "app/actions/commerce";
// components
import ChipBase from "common/components/chips";
import { Checkbox } from "common/components/designSystem/inputs";
import AddressDeleteButton from "./components/deleteButton";
import AddressCreateDialogWrapper from "./components/dialogWrapper";
import MemoInput from "./components/memo";
import NameInput from "./components/name";
import PhoneNumberInput from "./components/phone";
import AddressInput from "./components/address";
import {
  ButtonContainer,
  CancelButton,
  DefaultAddressChipStyle,
  DefaultChipContainer,
  Divider,
  DoneButton,
  FormTable,
  Inner,
  SetDefaultContainer,
  Wrapper,
} from "./styled";
import CountryInput from "./components/country";
import NotKoreaAddressInput from "./components/NotKoreaAddress";

interface IProps {
  open: boolean;
  shippingAddressId?: string;
  onClose(): void;
}

const AddressCreateDialog: React.FC<IProps> = ({
  open,
  shippingAddressId,
  onClose,
}) => {
  const hubSeller = useHubSeller();
  const currentGroup = useCurrentGroup();
  const { selectedShippingAddress, originDefault } = useStoreState(state => ({
    selectedShippingAddress: shippingAddressId
      ? state.entities.commerce_shipping_address[shippingAddressId]
      : undefined,

    originDefault: Boolean(
      shippingAddressId &&
        getShippingAddressList(state)?.[0]?.id === shippingAddressId,
    ),
  }));

  const [updateData, setUpdateData] = React.useState<
    Partial<Moim.Commerce.ICommerceShippingAddress>
  >({});
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [loading, setLoadStatus] = React.useState(false);

  React.useEffect(() => {
    if (open && selectedShippingAddress) {
      setUpdateData(selectedShippingAddress);
      setIsDefault(originDefault);
    }

    if (!open) {
      setUpdateData({});
    }
  }, [open]);

  const { createAddress, updateAddress, setAsDefaultAddress } = useActions({
    createAddress: createShippingAddress,
    updateAddress: updateShippingAddress,
    setAsDefaultAddress: setAsDefaultShippingAddress,
  });

  const countryCode =
    updateData?.countryCode ??
    currentGroup?.internationalizations?.[0]?.regionCode;

  const saveEnabled = Boolean(
    updateData.name &&
      updateData.recipientPhoneInfo?.countryCode &&
      updateData.recipientPhoneInfo?.nationalNumber &&
      countryCode &&
      (countryCode === "KR"
        ? updateData.zipCode && updateData.address && updateData.address2
        : updateData.zipCode &&
          updateData.address &&
          updateData.address2 &&
          updateData.city),
  );

  const handleSetDefaultChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      setIsDefault(e.currentTarget.checked);
    },
    [],
  );

  const handleClickDone = React.useCallback(() => {
    if (!saveEnabled) {
      return;
    }
    if (shippingAddressId) {
      setLoadStatus(true);

      updateAddress(shippingAddressId, {
        recipientName: updateData.name,
        recipientPhone:
          updateData.recipientPhoneInfo?.countryCode &&
          updateData.recipientPhoneInfo?.nationalNumber
            ? {
                countryCode: updateData.recipientPhoneInfo?.countryCode,
                nationalNumber: updateData.recipientPhoneInfo?.nationalNumber,
              }
            : undefined,
        zipCode: updateData.zipCode,
        address: updateData.address,
        address2: updateData.address2,
        countryCode: countryCode,
        city: countryCode === "KR" ? null : updateData.city,
        state:
          countryCode === "KR" || !updateData.state ? null : updateData.state,
        memo: updateData.memo ? updateData.memo : null,
      })
        .then(async () => {
          if (originDefault !== isDefault) {
            await setAsDefaultAddress(shippingAddressId);
          }
          onClose();
        })
        .finally(() => {
          setLoadStatus(false);
        });
    } else {
      setLoadStatus(true);
      createAddress(
        {
          name: updateData.name ?? "",
          recipientName: updateData.name ?? "",
          recipientPhone: {
            countryCode: updateData.recipientPhoneInfo?.countryCode!,
            nationalNumber: updateData.recipientPhoneInfo?.nationalNumber!,
          },
          zipCode: updateData.zipCode!,
          address: updateData.address!,
          address2: updateData.address2 ?? "",
          countryCode: updateData.countryCode,
          city: countryCode === "KR" ? undefined : updateData.city,
          state:
            countryCode === "KR" || !updateData.state
              ? undefined
              : updateData.state,
          memo: updateData.memo,
        },
        isDefault,
      )
        .then(() => {
          onClose();
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  }, [
    saveEnabled,
    shippingAddressId,
    countryCode,
    updateData,
    originDefault,
    isDefault,
    createAddress,
    onClose,
    updateAddress,
    setAsDefaultAddress,
    hubSeller.deliveryInformation?.isAllowedAbroadShipping,
  ]);

  const handleChangeUpdateData = React.useCallback(
    (newUpdated: Partial<Moim.Commerce.ICommerceShippingAddress>) => {
      setUpdateData(state => ({ ...state, ...newUpdated }));
    },
    [],
  );

  return (
    <AddressCreateDialogWrapper isOpenDialog={open} onClose={onClose}>
      <Wrapper>
        <Inner>
          {originDefault && (
            <>
              <DefaultChipContainer>
                <ChipBase
                  size="medium"
                  shape="round"
                  overrideStyle={DefaultAddressChipStyle}
                >
                  <FormattedMessage id="badge_default_address" />
                </ChipBase>
              </DefaultChipContainer>
              <Divider />
            </>
          )}

          <FormTable>
            <NameInput
              name={updateData.name}
              onChange={handleChangeUpdateData}
            />

            {hubSeller.deliveryInformation?.isAllowedAbroadShipping ? (
              <CountryInput
                countryCode={updateData.countryCode}
                onChange={handleChangeUpdateData}
              />
            ) : null}
            {countryCode === "KR" ? (
              <AddressInput
                zipCode={updateData.zipCode}
                address={updateData.address}
                address2={updateData.address2}
                onChange={handleChangeUpdateData}
              />
            ) : (
              <NotKoreaAddressInput
                zipCode={updateData.zipCode}
                address={updateData.address}
                address2={updateData.address2}
                city={updateData.city}
                state={updateData.state}
                onChange={handleChangeUpdateData}
              />
            )}
            <PhoneNumberInput
              countryCode={updateData.recipientPhoneInfo?.countryCode}
              phone={updateData.recipientPhoneInfo?.nationalNumber}
              onChange={handleChangeUpdateData}
            />
            <MemoInput
              memo={updateData.memo}
              onChange={handleChangeUpdateData}
            />
          </FormTable>

          {!originDefault ? (
            <>
              <Divider />
              <SetDefaultContainer>
                <Checkbox
                  id="setIsDefault_checkbox"
                  checked={isDefault}
                  onChange={handleSetDefaultChange}
                />
                <label htmlFor="setIsDefault_checkbox">
                  <FormattedMessage id="add_address_set_as_default_title" />
                </label>
              </SetDefaultContainer>
            </>
          ) : null}
          {shippingAddressId ? (
            <AddressDeleteButton
              disabled={loading}
              shippingAddressId={shippingAddressId}
              onClose={onClose}
            />
          ) : null}
          <ButtonContainer>
            <CancelButton onClick={onClose} disabled={loading}>
              <FormattedMessage id="button_cancel" />
            </CancelButton>
            <DoneButton
              onClick={handleClickDone}
              waiting={loading}
              disabled={!saveEnabled}
            >
              <FormattedMessage id="button_save" />
            </DoneButton>
          </ButtonContainer>
        </Inner>
      </Wrapper>
    </AddressCreateDialogWrapper>
  );
};

export default AddressCreateDialog;
