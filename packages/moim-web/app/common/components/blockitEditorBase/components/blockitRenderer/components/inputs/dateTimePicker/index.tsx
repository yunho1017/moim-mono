import * as React from "react";
import { DatePicker } from "rsuite";
import { IProps as IRootProps } from "..";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Wrapper, H6, InputContainer } from "./styled";

interface IDateTimePickerProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputDateSelectBlock;
}

const DateTimePicker: React.FC<IDateTimePickerProps> = ({
  wrapperStyle,
  margin,
  element,
  name,
  label,
  onChange,
}) => {
  const { placeholder, initialValue, required, format } = element;
  const ref = React.useRef<HTMLInputElement>(null);
  const [tmpValue, setValue] = React.useState(0);
  const handleChange = React.useCallback(
    (value: Date, e: React.SyntheticEvent<HTMLElement>) => {
      setValue(value.getTime());
      onChange?.(
        value.getTime(),
        undefined,
        ref.current ?? (e.currentTarget as any),
      );
    },
    [onChange],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <DatePicker
          placeholder={placeholder}
          defaultValue={initialValue ? new Date(initialValue) : undefined}
          format={format ?? "YYYY-MM-DD HH:mm:ss"}
          block={true}
          onChange={handleChange}
        />
      </InputContainer>
      <input
        ref={ref}
        hidden={true}
        type="number"
        required={required}
        name={name}
        value={tmpValue}
      />
    </Wrapper>
  );
};

export default DateTimePicker;
