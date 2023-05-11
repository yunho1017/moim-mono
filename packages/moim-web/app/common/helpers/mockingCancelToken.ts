import axios, { AxiosError, CancelToken } from "axios";

export function makeErrorFromCancelToken(cancelToken: CancelToken) {
  const error = new Error() as AxiosError;
  if (cancelToken.reason) {
    const reason = JSON.parse(cancelToken.reason.message || "{}");
    error.code = reason.code;
    error.response = reason.response;
  }
  return error;
}

export function makeCancelTokenWithResponse(
  code: number,
  error: Moim.IErrorResponse,
) {
  const cancelToken = axios.CancelToken.source();
  cancelToken.cancel(
    JSON.stringify({
      code,
      response: {
        data: { error },
      },
    }),
  );
  return cancelToken.token;
}

export const MOCK_ERROR: Moim.IErrorResponse = {
  code: "MOCK_ERROR",
  message: "This is mocking error",
};
