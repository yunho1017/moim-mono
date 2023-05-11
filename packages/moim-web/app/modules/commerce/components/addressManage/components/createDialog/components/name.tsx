import * as React from "react";
import { FormattedMessage } from "react-intl";
import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import RequiredMark from "common/components/requiredMark";
import { BoxContainer, BoxInputWrapperStyle, Left, Right } from "../styled";

import { useIntlShort } from "common/hooks/useIntlShort";

interface IProps {
  name: string | undefined;
  onChange(updated: Partial<Moim.Commerce.ICommerceShippingAddress>): void;
}

const NameInput: React.FC<IProps> = ({ name, onChange }) => {
  const intl = useIntlShort();
  const handleChange = React.useCallback(
    (value: string) => {
      onChange({ name: value });
    },
    [onChange],
  );
  return (
    <>
      <Left>
        <FormattedMessage id="add_address_name_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <BoxInput
            size="Small"
            value={name}
            placeholder={intl("add_address_name_placeholder")}
            wrapperStyle={BoxInputWrapperStyle}
            onChange={handleChange}
          />
        </BoxContainer>
      </Right>
    </>
  );
};

export default NameInput;
