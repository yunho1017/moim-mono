import * as React from "react";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { IProps as IRootProps } from "../..";
import SelectBase from "../base";
import { Wrapper, InputContainer, H6, NoSidePaddingStyle } from "../styled";

interface IProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputStaticSelectBlock;
}

const StaticSelect: React.FC<IProps> = ({
  name,
  label,
  element,
  wrapperStyle,
  margin,
  onChange,
}) => {
  const { options, placeholder, required, initialValue } = element;
  const defaultValue = React.useMemo(
    () => options.find(opt => opt.value === initialValue),
    [initialValue, options],
  );

  const handleChange: Moim.Blockit.IInputBlockChangeEvent = React.useCallback(
    (value, validate, e) => {
      // Note: rewrap for hasError check
      onChange?.(value, validate, e);
    },
    [onChange],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <SelectBase
          hasError={false}
          required={required}
          id={name}
          name={name}
          defaultOption={defaultValue}
          options={options}
          placeholder={placeholder}
          onChange={handleChange}
          wrapperStyle={NoSidePaddingStyle}
        />
      </InputContainer>
    </Wrapper>
  );
};

export default StaticSelect;
