import { debounce } from "lodash";
import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import {
  Wrapper,
  BoxNumberInputWrapper,
  NumberInput,
  BoxInputNumberSideButton,
  HelperText,
  PlusIcon,
  MinusIcon,
} from "../styled";
import { BoxInputSizeType, InputStatusType } from "../type";

interface IProps {
  value?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  size?: BoxInputSizeType;
  helperText?: React.ReactNode;
  status?: InputStatusType;
  disabled?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  onChange?(value: number): void;
}

const BoxNumberInput: React.FC<IProps> = ({
  value = 0,
  min = 0,
  max,
  status: _status = "Inactive",
  size = "Small",
  disabled = false,
  helperText,
  placeholder,
  wrapperStyle,
  onChange,
}) => {
  const [status, setStatus] = React.useState(_status);

  const disableMinus = disabled || Boolean(min !== undefined && value === min);
  const disablePlus = disabled || Boolean(max !== undefined && value === max);

  const updateValue = React.useMemo(
    () =>
      debounce((val: number) => {
        if (!disabled) {
          onChange?.(val);
        }
      }, 100),
    [disabled, onChange]
  );
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (!disabled) {
          const val = parseInt(e.target.value, 10);

          if (val >= min && max !== undefined && val <= max) {
            updateValue(val);
          }
        }
      },
      [disabled, max, min, updateValue]
    );
  const handleFocusInput = React.useCallback(() => {
    if (!disabled && status === "Inactive") {
      setStatus("Focused");
    }
  }, [disabled, status]);
  const handleBlurInput = React.useCallback(() => {
    if (!disabled && status === "Focused") {
      setStatus("Inactive");
    }
  }, [disabled, status]);

  const handleClickMinus = React.useCallback(() => {
    const nextVal = value - 1;
    if (min !== undefined && nextVal < min) {
      return;
    }
    updateValue(nextVal);
  }, [min, value, updateValue]);

  const handleClickPlus = React.useCallback(() => {
    const nextVal = value + 1;
    if (max !== undefined && nextVal > max) {
      return;
    }

    updateValue(nextVal);
  }, [max, value, updateValue]);

  return (
    <Wrapper status={status}>
      <BoxNumberInputWrapper
        size={size}
        disabled={disabled || (disableMinus && disablePlus)}
        overrideStyle={wrapperStyle}
      >
        <BoxInputNumberSideButton
          disabled={disableMinus}
          onClick={handleClickMinus}
        >
          <MinusIcon disabled={disableMinus} />
        </BoxInputNumberSideButton>

        <NumberInput
          type="number"
          value={value}
          placeholder={placeholder}
          readOnly={disabled}
          min={min}
          max={max}
          disabled={disabled || (disableMinus && disablePlus)}
          onChange={handleChange}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
        />
        <BoxInputNumberSideButton
          disabled={disablePlus}
          onClick={handleClickPlus}
        >
          <PlusIcon disabled={disablePlus} />
        </BoxInputNumberSideButton>
      </BoxNumberInputWrapper>
      {helperText && <HelperText> {helperText}</HelperText>}
    </Wrapper>
  );
};

export default React.memo(BoxNumberInput);
