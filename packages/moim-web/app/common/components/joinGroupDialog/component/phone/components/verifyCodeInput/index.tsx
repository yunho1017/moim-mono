import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import debounce from "lodash/debounce";

import { SingleLineBoxInput } from "common/components/designSystem/boxInput";

import {
  ButtonWrapper,
  VerifyCodeButton,
  VerifyInputWrapper,
} from "../../styled";
import useCancelToken from "common/hooks/useCancelToken";
import { useActions } from "app/store";
import { verifyPhoneNumber } from "app/actions/user";
import MiniTimer from "./timer";

const ErrorMessage = React.memo(
  ({ error }: { error?: Moim.IErrorResponse }) => {
    if (!error) {
      return null;
    }

    switch (error.code) {
      case "VERITY_TIME_OUT":
        return (
          <FormattedMessage id="mobile_phone_number_verification/guide_expired_verification_code" />
        );
      case "AUTH_CODE_NOT_MATCH":
      case "PHONE_AUTH_NOT_FOUND":
        return (
          <FormattedMessage id="mobile_phone_number_verification/guide_invalid_verification_code" />
        );

      default:
        return <>{error.message}</>;
    }
  },
);

interface IProps {
  verifyEndTime?: number;
  error: Moim.IErrorResponse | undefined;
  phoneValidationSucceed: boolean;
  setError(error: Moim.IErrorResponse | undefined): void;
  setPhoneValidationSucceed(value: boolean): void;
  onVerifyTimeout(): void;
}
export default function VerifyCodeInput({
  verifyEndTime,
  error,
  setError,
  phoneValidationSucceed,
  setPhoneValidationSucceed,
  onVerifyTimeout,
}: IProps) {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const { dispatchVerifyPhoneNumber } = useActions({
    dispatchVerifyPhoneNumber: verifyPhoneNumber,
  });
  const [code, setCode] = React.useState("");

  const handleChange = React.useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleVerifyTimeout = React.useCallback(() => {
    setError({ code: "VERITY_TIME_OUT" });
    onVerifyTimeout();
  }, [onVerifyTimeout, setError]);

  const handleVerifyCodeButton = React.useCallback(
    debounce(async () => {
      if (phoneValidationSucceed) {
        return;
      }
      const result = await dispatchVerifyPhoneNumber(
        {
          authCode: code,
        },
        cancelToken.current.token,
      );
      setPhoneValidationSucceed(result.success);
      setError(result.error);
    }, 150),
    [
      cancelToken,
      code,
      dispatchVerifyPhoneNumber,
      phoneValidationSucceed,
      setError,
      setPhoneValidationSucceed,
    ],
  );

  const helperTextStatus = React.useMemo(
    () => (Boolean(error) ? "Error" : "Inactive"),
    [error],
  );

  const helperText = React.useMemo(
    () =>
      phoneValidationSucceed ? (
        <FormattedMessage id="mobile_phone_number_verification/button_verified" />
      ) : (
        <ErrorMessage error={error} />
      ),
    [error, phoneValidationSucceed],
  );

  return (
    <VerifyInputWrapper>
      <SingleLineBoxInput
        size="Large"
        value={code}
        status={helperTextStatus}
        helperText={helperText}
        placeholder={intl.formatMessage({
          id:
            "mobile_phone_number_verification/verfication_code_input_placeholder",
        })}
        suffix={{
          type: "text",
          text: (
            <MiniTimer
              phoneValidationSucceed={phoneValidationSucceed}
              endDateTime={verifyEndTime}
              onVerifyTimeout={handleVerifyTimeout}
            />
          ),
        }}
        onChange={handleChange}
      />

      <ButtonWrapper>
        <VerifyCodeButton
          size="s"
          onClick={handleVerifyCodeButton}
          disabled={!verifyEndTime || !code || phoneValidationSucceed}
        >
          <FormattedMessage id="mobile_phone_number_verification/button_verify" />
        </VerifyCodeButton>
      </ButtonWrapper>
    </VerifyInputWrapper>
  );
}
