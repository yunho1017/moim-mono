import * as React from "react";
import { TextInput } from "common/components/designSystem/inputs";
import { Wrapper, InputWithSuffix, Suffix } from "./styled";

export interface IProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "as" | "ref" | "type"> {
  suffix?: React.ReactNode;
}

const TextInputWithSuffix = React.forwardRef(
  (
    { suffix, placeholder, ...rest }: IProps,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    const size = placeholder ? placeholder.length : undefined;
    const Input = suffix ? InputWithSuffix : TextInput;
    return (
      <Wrapper>
        <Input size={size} placeholder={placeholder} {...rest} ref={ref} />
        {suffix && <Suffix>{suffix}</Suffix>}
      </Wrapper>
    );
  },
);

export default TextInputWithSuffix;
