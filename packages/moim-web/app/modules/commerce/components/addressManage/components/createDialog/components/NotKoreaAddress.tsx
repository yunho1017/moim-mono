import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import RequiredMark from "common/components/requiredMark";
import {
  BoxContainer,
  BoxInputWrapperStyle,
  Left,
  Right,
  ZipCodeBoxInputContainer,
} from "../styled";

interface IProps {
  zipCode: string | undefined;
  address: string | undefined;
  address2: string | undefined;
  city: string | undefined;
  state: string | undefined;
  onChange(updated: Partial<Moim.Commerce.ICommerceShippingAddress>): void;
}

const NotKoreaAddressInput: React.FC<IProps> = ({
  zipCode,
  address,
  address2,
  city,
  state,
  onChange,
}) => {
  const intl = useIntl();

  const handleChangeZipCode = React.useCallback(
    (value: string) => {
      onChange({
        zipCode: value,
      });
    },
    [onChange],
  );
  const handleChangeAddress = React.useCallback(
    (value: string) => {
      onChange({
        address: value,
      });
    },
    [onChange],
  );
  const handleChangeAddress2 = React.useCallback(
    (value: string) => {
      onChange({
        address2: value.replace(/[*~#@]/g, ""),
      });
    },
    [onChange],
  );
  const handleChangeCity = React.useCallback(
    (value: string) => {
      onChange({
        city: value,
      });
    },
    [onChange],
  );

  const handleChangeState = React.useCallback(
    (value: string) => {
      onChange({
        state: value,
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
          <BoxInput
            size="Small"
            value={address}
            placeholder={intl.formatMessage({
              id: "add_address_address_title",
            })}
            wrapperStyle={BoxInputWrapperStyle}
            onChange={handleChangeAddress}
          />
        </BoxContainer>

        <BoxContainer>
          <BoxInput
            size="Small"
            value={address2}
            placeholder={intl.formatMessage({
              id: "add_address_address_placeholder_address_2",
            })}
            wrapperStyle={BoxInputWrapperStyle}
            onChange={handleChangeAddress2}
          />
        </BoxContainer>
      </Right>

      <Left>
        <FormattedMessage id="add_address_city_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <ZipCodeBoxInputContainer>
            <BoxInput
              size="Small"
              value={city}
              wrapperStyle={BoxInputWrapperStyle}
              onChange={handleChangeCity}
            />
          </ZipCodeBoxInputContainer>
        </BoxContainer>
      </Right>

      <Left>
        <FormattedMessage id="add_address_state_title" />
      </Left>
      <Right>
        <BoxContainer>
          <ZipCodeBoxInputContainer>
            <BoxInput
              size="Small"
              value={state}
              wrapperStyle={BoxInputWrapperStyle}
              onChange={handleChangeState}
            />
          </ZipCodeBoxInputContainer>
        </BoxContainer>
      </Right>

      <Left>
        <FormattedMessage id="add_address_zip_code_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <ZipCodeBoxInputContainer>
            <BoxInput
              size="Small"
              type="number"
              value={zipCode}
              placeholder={intl.formatMessage({
                id: "add_address_address_placeholder_zip_code_no_search",
              })}
              wrapperStyle={BoxInputWrapperStyle}
              onChange={handleChangeZipCode}
            />
          </ZipCodeBoxInputContainer>
        </BoxContainer>
      </Right>
    </>
  );
};

export default NotKoreaAddressInput;
