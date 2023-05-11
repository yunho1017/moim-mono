import * as React from "react";
import DaumPostcode, { AddressData } from "react-daum-postcode";
import { FormattedMessage, useIntl } from "react-intl";
// selector
// hooks
import useOpenState from "common/hooks/useOpenState";
// actions
// components
import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import RequiredMark from "common/components/requiredMark";
import {
  BoxContainer,
  BoxInputWrapperStyle,
  Left,
  OpenAddressSearchButton,
  Right,
  SearchBoxContainer,
  SearchIcon,
  ZipCodeBoxInputContainer,
  ZipCodeContainer,
} from "../styled";

interface IProps {
  zipCode: string | undefined;
  address: string | undefined;
  address2: string | undefined;
  onChange(updated: Partial<Moim.Commerce.ICommerceShippingAddress>): void;
}

const AddressInput: React.FC<IProps> = ({
  zipCode,
  address,
  address2,
  onChange,
}) => {
  const intl = useIntl();
  const address2Ref = React.useRef<BoxInput>(null);

  const {
    isOpen: isOpenAddressSearch,
    close: handleCloseAddressSearch,
    setIsOpen: setAddressSearchOpenStatus,
  } = useOpenState();

  const handleCompleteAddressFind = React.useCallback(
    (data: AddressData) => {
      onChange({
        zipCode: data.zonecode,
        address: data.address,
      });
      handleCloseAddressSearch();
      address2Ref.current?.focusInput();
    },
    [onChange, handleCloseAddressSearch],
  );

  const handleToggleAddressSearch = React.useCallback(() => {
    setAddressSearchOpenStatus(!isOpenAddressSearch);
  }, [isOpenAddressSearch, setAddressSearchOpenStatus]);

  const handleChangeAddress2 = React.useCallback(
    (value: string) => {
      onChange({
        address2: value.replace(/[*~#@]/g, ""),
      });
    },
    [onChange],
  );

  return (
    <>
      <Left>
        <FormattedMessage id="add_address_address_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <ZipCodeContainer>
            <ZipCodeBoxInputContainer>
              <BoxInput
                size="Small"
                type="number"
                value={zipCode}
                placeholder={intl.formatMessage({
                  id: "add_address_address_placeholder_zip_code",
                })}
                wrapperStyle={BoxInputWrapperStyle}
                readonly={true}
                onClick={handleToggleAddressSearch}
              />
            </ZipCodeBoxInputContainer>
            <OpenAddressSearchButton onClick={handleToggleAddressSearch}>
              <div className="text">
                <FormattedMessage id="button_search" />
              </div>
              <SearchIcon />
            </OpenAddressSearchButton>
          </ZipCodeContainer>
        </BoxContainer>
        {isOpenAddressSearch && (
          <BoxContainer>
            <SearchBoxContainer>
              <DaumPostcode
                style={{ height: "100%" }}
                onComplete={handleCompleteAddressFind}
              />
            </SearchBoxContainer>
          </BoxContainer>
        )}

        <BoxContainer>
          <BoxInput
            size="Small"
            value={address}
            placeholder={intl.formatMessage({
              id: "add_address_address_placeholder_address_1",
            })}
            readonly={true}
            wrapperStyle={BoxInputWrapperStyle}
            onClick={handleToggleAddressSearch}
          />
        </BoxContainer>

        <BoxContainer>
          <BoxInput
            size="Small"
            ref={address2Ref}
            value={address2}
            placeholder={intl.formatMessage({
              id: "add_address_address_placeholder_address_2",
            })}
            wrapperStyle={BoxInputWrapperStyle}
            onChange={handleChangeAddress2}
          />
        </BoxContainer>
      </Right>
    </>
  );
};

export default AddressInput;
