import * as React from "react";
import { Checkbox } from "common/components/designSystem/inputs";
import { IProps as IRootProps } from "..";
import { Wrapper, InnerWrapper, Label } from "./styled";

interface ICheckBoxProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputCheckBoxBlock;
}

const CheckBoxBlock: React.FC<ICheckBoxProps> = ({
  wrapperStyle,
  margin,
  element,
  name,
  label,
  onChange,
}) => {
  const { initialChecked, required } = element;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const val = e.currentTarget.checked;
      onChange?.(val, undefined, e.currentTarget);
    },
    [onChange],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <InnerWrapper>
        <Checkbox
          id={name}
          name={name}
          required={required}
          onChange={handleChange}
          defaultChecked={initialChecked}
        />
        <Label htmlFor={name}>{label}</Label>
      </InnerWrapper>
    </Wrapper>
  );
};

export default CheckBoxBlock;
