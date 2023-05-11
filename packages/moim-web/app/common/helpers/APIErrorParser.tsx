import axios, { AxiosError } from "axios";
import { isTest } from "./envChecker";

function isAxiosError(error: Error | unknown): error is AxiosError {
  return axios.isAxiosError(error) || isTest();
}
function errorParseData(
  rawError: Error | unknown,
): Moim.IErrorResponse | undefined {
  if (isAxiosError(rawError)) {
    const response = rawError.response;

    if (response) {
      const isVingleServerError = response.data && response.data.error;
      if (isVingleServerError) {
        return response.data.error;
      } else if (response.data.message) {
        return response.data;
      }
    }
  }
}

export { errorParseData };
