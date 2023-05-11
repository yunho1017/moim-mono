import * as React from "react";
import { IProps as IRootProps } from "..";
import { textValidCheck, numberValidCheck, NUMBER_PATTERN } from "./validCheck";

import {
  H6,
  Wrapper,
  InputContainer,
  InputBox,
  CountBox,
  DescriptionWrapper,
  NumberInputElement,
} from "./styled";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

interface ITextProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputTextBlock;
}

interface INumberProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputNumberBlock;
}

export const TextInput: React.FC<ITextProps> = ({
  name,
  label,
  description,
  element,
  wrapperStyle,
  margin,
  onChange,
}) => {
  const {
    required,
    placeholder,
    initialValue,
    validationExpression,
    validationErrorMessage,
    isMultiline,
    minLength,
    maxLength,
  } = element;
  const [hasFocus, setFocus] = React.useState(false);
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const desc = React.useMemo(() => {
    if (error) {
      return error;
    }
    if (description) {
      return description;
    }
    return "";
  }, [description, error]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback(
    e => {
      const value = e.currentTarget.value;
      if (validationExpression) {
        const regexResult = new RegExp(validationExpression).test(value);
        if (!regexResult) {
          setError(validationErrorMessage);
        } else {
          setError(undefined);
        }
      }

      setText(value);
      if (onChange) {
        e.persist();
        onChange(value, textValidCheck(value, element), e.currentTarget);
      }
    },
    [onChange, validationErrorMessage, element, validationExpression],
  );

  const handleInputFocus = React.useCallback(() => {
    setFocus(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  const inputElement = React.useMemo(() => {
    if (isMultiline) {
      return (
        <textarea
          id={name}
          name={name}
          data-invalid={Boolean(error)}
          required={required}
          placeholder={placeholder}
          defaultValue={initialValue}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        ></textarea>
      );
    } else {
      return (
        <input
          type="text"
          id={name}
          name={name}
          data-invalid={Boolean(error)}
          required={required}
          placeholder={placeholder}
          defaultValue={initialValue}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      );
    }
  }, [
    error,
    handleChange,
    handleInputBlur,
    handleInputFocus,
    initialValue,
    isMultiline,
    maxLength,
    minLength,
    name,
    placeholder,
    required,
  ]);

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <InputBox
          hasError={Boolean(error)}
          hasFocus={hasFocus}
          isMultiline={isMultiline}
        >
          {inputElement}
          {maxLength ? (
            <CountBox
              isMultiline={isMultiline}
            >{`${text.length}/${maxLength}`}</CountBox>
          ) : null}
        </InputBox>
      </InputContainer>
      {description || error ? (
        <DescriptionWrapper hasError={Boolean(error)}>
          <NativeEmojiSafeText value={desc} />
        </DescriptionWrapper>
      ) : null}
    </Wrapper>
  );
};

export const NumberInput: React.FC<INumberProps> = ({
  name,
  label,
  description,
  element,
  wrapperStyle,
  margin,
  onChange,
}) => {
  const {
    required,
    placeholder,
    initialValue,
    validationExpression,
    validationErrorMessage,
    minValue,
    maxValue,
    decimalPlaces = 20,
  } = element;
  const [hasFocus, setFocus] = React.useState(false);
  const [, setText] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const desc = React.useMemo(() => {
    if (error) {
      return error;
    }
    if (description) {
      return description;
    }
    return "";
  }, [description, error]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback(
    e => {
      const value = e.currentTarget.value;
      if (validationExpression) {
        const regexResult = new RegExp(validationExpression).test(value);
        if (!regexResult) {
          setError(validationErrorMessage);
        } else {
          setError(undefined);
        }
      }

      setText(value);
      if (onChange) {
        e.persist();
        onChange(value, numberValidCheck(value, element), e.currentTarget);
      }
    },
    [element, onChange, validationErrorMessage, validationExpression],
  );

  const handleInputFocus = React.useCallback(() => {
    setFocus(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  const decimalPointStep = React.useMemo(() => {
    if (!decimalPlaces) return undefined;
    const arr = new Array(decimalPlaces).fill(0);
    arr[decimalPlaces - 1] = 1;
    return `0.${arr.join("")}`;
  }, [decimalPlaces]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const numberPatternRegex = new RegExp(NUMBER_PATTERN).test(e.key);
      const result =
        e.keyCode === 8 || e.keyCode === 46 ? true : numberPatternRegex;
      if (!result) {
        e.preventDefault();
      }
    },
    [],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <InputBox hasError={Boolean(error)} hasFocus={hasFocus}>
          <NumberInputElement
            type="number"
            id={name}
            name={name}
            required={required}
            placeholder={placeholder}
            defaultValue={initialValue}
            data-invalid={Boolean(error)}
            min={minValue}
            max={maxValue}
            step={decimalPointStep}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </InputBox>
      </InputContainer>
      {description || error ? (
        <DescriptionWrapper hasError={Boolean(error)}>
          <NativeEmojiSafeText value={desc} />
        </DescriptionWrapper>
      ) : null}
    </Wrapper>
  );
};
