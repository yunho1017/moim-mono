import uniq from "lodash/uniq";
import {
  DESCRIPTION_VALIDATION_ERROR_CODE,
  NAME_VALIDATION_ERROR_CODE,
} from "./constants";

const MAX_NAME_LENGTH = 30;
export const NOT_ALLOW_CHAR_IN_NAME_LIST = [
  "@",
  "#",
  ":",
  "'",
  '"',
  "*",
  "`",
  "*",
  "<",
  ">",
  "[",
  "]",
  "!",
];

const MAX_DESCRIPTION_LENGTH = 500;

export function validatePositionName(name: string) {
  if (name.length > MAX_NAME_LENGTH) {
    return {
      code: NAME_VALIDATION_ERROR_CODE.NAME_LENGTH_TOO_LONG,
    };
  }

  const regex = new RegExp(`[${NOT_ALLOW_CHAR_IN_NAME_LIST.join("\\")}]`, "g");
  const containNotAllowCharList = uniq(name.match(regex));

  if (containNotAllowCharList.length > 0) {
    return {
      code: NAME_VALIDATION_ERROR_CODE.CONTAIN_NOT_ALLOW_CHAR,
      metadata: {
        char: containNotAllowCharList.join(","),
      },
    };
  }

  return true;
}

export function validatePositionDescription(description: string) {
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      code: DESCRIPTION_VALIDATION_ERROR_CODE.DESCRIPTION_LENGTH_TOO_LONG,
    };
  }

  return true;
}
