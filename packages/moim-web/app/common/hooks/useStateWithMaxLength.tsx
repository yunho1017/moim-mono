import * as React from "react";
import useStateWithError from "common/hooks/useStateWithError";

const DEFAULT_MAX_LENGTH = 60;
const DEFAULT_MIN_LENGTH = 1;
export const ERROR_CODE = {
  START_WITH_WHITE_SPACE: "START_WITH_WHITE_SPACE",
  TOO_SHORT: "START_WITH_WHITE_SPACE",
  TOO_LONG: "TOO_LONG",
};

export default function useStateWithMaxLength({
  minLength = DEFAULT_MIN_LENGTH,
  maxLength = DEFAULT_MAX_LENGTH,
  defaultValue = "",
}: {
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}) {
  const [changed, setChanged] = React.useState<boolean>(false);
  const validateLength = React.useCallback(
    (value: string) => {
      if (value && value.match(/^\S/) === null) {
        return {
          code: ERROR_CODE.START_WITH_WHITE_SPACE,
        };
      } else if (value.length < minLength) {
        return {
          code: ERROR_CODE.TOO_SHORT,
        };
      } else if (value.length > maxLength) {
        return {
          code: ERROR_CODE.TOO_LONG,
        };
      }

      return true;
    },
    [minLength, maxLength],
  );

  const { state, setState, error, setError } = useStateWithError<string>(
    defaultValue,
    validateLength,
    {
      invalidateNotSet: false,
    },
  );

  const handleChange = React.useCallback(
    (username: string) => {
      setState(username);
      setChanged(true);
    },
    [setState],
  );

  return { state, error, setError, changed, handleChange };
}
