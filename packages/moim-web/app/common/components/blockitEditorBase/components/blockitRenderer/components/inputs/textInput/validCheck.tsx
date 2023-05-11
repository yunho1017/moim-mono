export const NUMBER_PATTERN = "\\d+";

export function textValidCheck(
  value: string,
  element: Moim.Blockit.IInputTextBlock,
) {
  const {
    validationExpression,
    validationErrorMessage,
    required,
    minLength,
    maxLength,
  } = element;
  const valueLength = value.length;

  if (required && valueLength === 0) {
    return "required";
  }

  if (minLength && valueLength < minLength) {
    return "minlength detect";
  }

  if (maxLength && valueLength > maxLength) {
    return "maxlength detect";
  }

  if (validationExpression) {
    const regexResult = new RegExp(validationExpression).test(value);
    if (!regexResult) {
      return validationErrorMessage;
    }
  }

  return undefined;
}

export function numberValidCheck(
  input: string,
  element: Moim.Blockit.IInputNumberBlock,
) {
  const {
    validationExpression,
    validationErrorMessage,
    required,
    minValue,
    maxValue,
    decimalPlaces,
  } = element;
  const valueLength = input.length;
  const value = parseFloat(input);
  const point = input.split(".")[1] ?? undefined;

  if (required && valueLength === 0) {
    return "required";
  }

  if (decimalPlaces && point && point.length > decimalPlaces) {
    return "wrong decimalPlaces detect";
  }

  if (minValue && value < minValue) {
    return "minValue detect";
  }

  if (maxValue && value > maxValue) {
    return "maxValue detect";
  }

  const numberPatterRegExp = new RegExp(NUMBER_PATTERN).test(input);
  if (!numberPatterRegExp) {
    return "wrong number detect";
  }

  if (validationExpression) {
    const regexResult = new RegExp(validationExpression).test(input);
    if (!regexResult) {
      return validationErrorMessage;
    }
  }

  return undefined;
}
