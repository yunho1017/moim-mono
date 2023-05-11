import * as React from "react";
import { useDebounce } from "react-use";
import { CancelToken } from "axios";
import MoimAPI from "common/api";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import { errorParseData } from "common/helpers/APIErrorParser";

export const REGEX_SPECIAL_CHARACTER = "[@#\\:'\"\\*`<>\\[\\]\\!]";
export type ErrorStatusCode =
  | "INVALID_USERNAME_LENGTH"
  | "DUPLICATED_USERNAME_IN_PARENT_GROUP"
  | "DUPLICATED_USERNAME"
  | "INVALID_USERNAME"
  | "FORBIDDEN_USERNAME"
  | "INVALID_PARAMETER";
interface IStatus {
  isCalled: boolean;
  success: boolean;
  error?: Moim.IErrorResponse;
}

const checkValidate = async (name: string, cancelToken?: CancelToken) => {
  let success = false;
  let error: Moim.IErrorResponse | undefined;

  if (name) {
    try {
      const result = await MoimAPI.user.checkValidateUsername(
        name,
        cancelToken,
      );
      success = result.data.success;
    } catch (err) {
      if (err instanceof Error) {
        const parsedError = errorParseData(err);
        success = false;
        error = parsedError;
      }
    }
  }

  return {
    success,
    error,
  };
};

export default function useUsernameValidation(defaultValue?: string) {
  const [changed, setChanged] = React.useState(false);
  const [state, setNameState] = React.useState(defaultValue ?? "");
  const [status, setStatus] = React.useState<IStatus>({
    isCalled: false,
    success: false,
  });

  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();

  const checkValidation = React.useCallback(
    async (username: string) => {
      setNameState(username);
      if (!username) {
        return;
      }
      setChanged(true);
      handleCancel();
      const result = await checkValidate(
        username,
        cancelTokenSource.current.token,
      );
      setStatus({
        ...result,
        isCalled: true,
      });
    },
    [cancelTokenSource, handleCancel],
  );

  useDebounce(checkValidate, 300);

  const error = React.useMemo(() => status.error, [status.error]);
  const setError = React.useCallback(
    err => {
      setStatus({ ...status, error: err });
    },
    [status],
  );

  return {
    changed,
    state,
    error,
    setError,
    handleChange: checkValidation,
  };
}
