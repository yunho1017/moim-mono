import * as React from "react";
import { FormattedMessage } from "react-intl";

import GlobalPhoneInputForm from "common/components/globalPhoneInputForm";
import RequiredMark from "common/components/requiredMark";
import { BoxContainer, BoxInputWrapperStyle, Left, Right } from "../styled";
import { useIntlShort } from "common/hooks/useIntlShort";

interface IProps {
  countryCode: string | undefined;
  phone: string | undefined;
  onChange(updated: any): void;
}
const PhoneNumberInput: React.FC<IProps> = ({
  countryCode,
  phone,
  onChange,
}) => {
  const intl = useIntlShort();
  const handleChange = React.useCallback(
    (cCode: string | null, number: string) => {
      onChange({
        recipientPhoneInfo: {
          countryCode: cCode || undefined,
          nationalNumber: number,
        },
      });
    },
    [onChange, countryCode, phone],
  );

  return (
    <>
      <Left>
        <FormattedMessage id="add_address_phone_number_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <GlobalPhoneInputForm
            countryCode={countryCode}
            phone={phone}
            selectionPlaceholder={intl("add_address_country_code_placeholder")}
            inputPlaceholder={intl("add_address_phone_number_placeholder")}
            inputWrapperStyle={BoxInputWrapperStyle}
            onChange={handleChange}
          />
        </BoxContainer>
      </Right>
    </>
  );
};

export default PhoneNumberInput;
