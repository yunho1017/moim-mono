import * as React from "react";
import { FormattedMessage } from "react-intl";
import { BoxContainer, BoxInputWrapperStyle, Left, Right } from "../styled";
import { MultilineBoxInput } from "common/components/designSystem/boxInput";

import useSellerTexts from "common/hooks/useSellerTexts";

interface IProps {
  memo: string | undefined;
  onChange(updated: Partial<Moim.Commerce.ICommerceShippingAddress>): void;
}

const MemoInput: React.FC<IProps> = ({ memo, onChange }) => {
  const deliveryMemoTitle = useSellerTexts("delivery_memo_title");
  const deliveryMemoPlaceholder = useSellerTexts("delivery_memo_placeholder");
  const handleChange = React.useCallback(
    (value: string) => {
      onChange({ memo: value });
    },
    [onChange],
  );
  return (
    <>
      <Left>
        {deliveryMemoTitle ? (
          deliveryMemoTitle.singular
        ) : (
          <FormattedMessage id="add_address_memo_title" />
        )}
      </Left>
      <Right>
        <BoxContainer>
          <MultilineBoxInput
            size="Small"
            value={memo}
            placeholder={deliveryMemoPlaceholder?.singular ?? ""}
            wrapperStyle={BoxInputWrapperStyle}
            onChange={handleChange}
          />
        </BoxContainer>
      </Right>
    </>
  );
};

export default MemoInput;
