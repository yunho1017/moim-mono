import * as React from "react";
import _ from "lodash";
import { countries } from "countries-list";
import { FormattedMessage, useIntl } from "react-intl";

import { SingleLineBoxInput } from "common/components/designSystem/boxInput";
import { ButtonWrapper, SendCodeButton, SendInputWrapper } from "../../styled";
import { selectionStyle } from "./styled";
import { StaticSelection } from "common/components/designSystem/selection";

import { useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCancelToken from "common/hooks/useCancelToken";
import { postPhoneNumber } from "app/actions/user";
import { browserLocaleCountry } from "app/intl";

import { IOption } from "common/components/designSystem/selection/type";

const ErrorMessage = React.memo(
  ({ error }: { error?: Moim.IErrorResponse }) => {
    if (!error) {
      return (
        <FormattedMessage id="mobile_phone_number_verification/guide_sent_sms" />
      );
    }

    switch (error.code) {
      case "ALREADY_CERTIFIED":
      case "DUPLICATE_PHONE_NUMBER":
        return (
          <FormattedMessage id="mobile_phone_number_verification/guide_used_sms" />
        );

      case "REQUEST_BEFORE_TIME_LIMIT":
        return (
          <FormattedMessage id="mobile_phone_number_verification/guide_resend_invalid" />
        );
      case "FAILED_SENDING_MESSAGE":
        return (
          <FormattedMessage id="mobile_phone_number_verification/guide_sent_sms_fail" />
        );
    }

    return <>{error.message}</>;
  },
);

interface IProps {
  defaultPhone?: Moim.User.IUserPhone;
  phoneValidationSucceed: boolean;
  groupId?: string;
  showVerifyInput(): void;
  resetVerifyTimer(): void;
}

export interface IRefHandler {
  getPhoneNumber(): Moim.User.IUserPhone | undefined;
}

const PhoneNumberInput = React.forwardRef<IRefHandler, IProps>(
  (
    {
      defaultPhone,
      phoneValidationSucceed,
      groupId,
      showVerifyInput,
      resetVerifyTimer,
    },
    ref,
  ) => {
    const intl = useIntl();
    const cancelToken = useCancelToken();
    const { dispatchPostPhoneNumber } = useActions({
      dispatchPostPhoneNumber: postPhoneNumber,
    });
    const [countryCodeKey, setCountryCodeKey] = React.useState<string | null>(
      null,
    );
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const [apiCalled, setApiCalled] = React.useState(false);
    const [error, setError] = React.useState<Moim.IErrorResponse | undefined>(
      undefined,
    );

    const [visibleResendButton, setVisibleResendButton] = React.useState(false);

    const currentGroup = useCurrentGroup();
    const useableCountryCodes = React.useMemo(() => {
      const objCountries = _.toPairs(countries);
      let highOrderIntl: string[] = [];

      if (currentGroup?.internationalizations) {
        highOrderIntl = currentGroup.internationalizations.map(
          i => i.regionCode,
        );
      } else {
        const lang = browserLocaleCountry();
        const target = Object.entries(objCountries).filter(
          ([, [key, { languages }]]) =>
            key.toUpperCase() === lang.toUpperCase() ||
            languages.includes(lang),
        );
        switch (lang) {
          case "ko": {
            highOrderIntl = ["KR"];
            break;
          }
          case "en": {
            highOrderIntl = ["US"];
            break;
          }
          default: {
            if (target.length > 0) {
              highOrderIntl = [target[0][1][0]];
            }
            break;
          }
        }
      }
      const tmpData = Object.entries(objCountries);
      const data = tmpData
        .sort(([, [key]], [, [key2]]) => {
          const tmpA = highOrderIntl.includes(key.toUpperCase());
          const tmpB = highOrderIntl.includes(key2.toUpperCase());

          return tmpA === tmpB ? 0 : tmpA ? -1 : 1;
        })
        .map(val => val[1]);

      return data.reduce<{
        [key: string]: { code: string; country: string; languages: string[] };
      }>((acc, [key, value]) => {
        acc[key] = {
          country: value.native,
          code: value.phone,
          languages: value.languages,
        };
        return acc;
      }, {});
    }, [currentGroup]);

    const countryOptions: IOption[] = React.useMemo(
      () =>
        Object.entries(useableCountryCodes).map(([, value]) => ({
          value: value.code,
          label: `+${value.code} (${value.country})`,
        })),
      [useableCountryCodes],
    );

    const helperTextStatus = React.useMemo(
      () => (Boolean(error) ? "Error" : "Inactive"),
      [error],
    );

    const helperText = React.useMemo(
      () => apiCalled && <ErrorMessage error={error} />,
      [apiCalled, error],
    );

    const handleChangeCountryCode = React.useCallback((code: Moim.Id) => {
      setCountryCodeKey(code);
    }, []);

    const handleSendCodeButton = React.useCallback(async () => {
      if (!countryCodeKey) {
        return;
      }

      const result = await dispatchPostPhoneNumber(
        {
          countryCode: countryCodeKey,
          subscriberNumber: phoneNumber,
        },
        cancelToken.current.token,
        groupId,
      );
      if (!apiCalled) {
        setApiCalled(true);
      }

      setError(result.error);
      if (result.success) {
        setVisibleResendButton(true);
        showVerifyInput();
        resetVerifyTimer();
      }
    }, [
      apiCalled,
      cancelToken,
      countryCodeKey,
      dispatchPostPhoneNumber,
      phoneNumber,
      resetVerifyTimer,
      showVerifyInput,
    ]);

    React.useEffect(() => {
      if (defaultPhone) {
        const defaultCountryCodeKey = Object.entries(useableCountryCodes).find(
          ([, value]) => value.code === defaultPhone?.countryCode,
        );
        if (!phoneNumber && defaultCountryCodeKey) {
          setPhoneNumber(defaultPhone.subscriberNumber);
          setCountryCodeKey(defaultCountryCodeKey[1].code);
        }
      } else {
        const lang = browserLocaleCountry();
        const target = Object.entries(useableCountryCodes).filter(
          ([key, { languages }]) =>
            key.toUpperCase() === lang.toUpperCase() ||
            languages.includes(lang),
        );

        switch (lang) {
          case "ko": {
            setCountryCodeKey(useableCountryCodes.KR.code);
            break;
          }
          case "en": {
            setCountryCodeKey(useableCountryCodes.US.code);
            break;
          }
          default: {
            if (target.length > 0) {
              setCountryCodeKey(target[0][1].code);
            }
            break;
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultPhone, useableCountryCodes]);

    const getPhoneNumber = React.useCallback(
      (): Moim.User.IUserPhone => ({
        countryCode: countryCodeKey ?? "",
        subscriberNumber: phoneNumber,
      }),
      [countryCodeKey, phoneNumber],
    );

    React.useImperativeHandle(ref, () => ({ getPhoneNumber }));

    return (
      <>
        <StaticSelection
          size="l"
          state="normal"
          selected={countryCodeKey}
          options={countryOptions}
          isMultiple={false}
          useSearch={true}
          placeholder={intl.formatMessage({
            id:
              "mobile_phone_number_verification/country_selection_placeholder",
          })}
          overrideStyle={selectionStyle}
          onChange={handleChangeCountryCode}
        />

        <SendInputWrapper>
          <SingleLineBoxInput
            size="Large"
            helperText={helperText}
            status={helperTextStatus}
            placeholder={intl.formatMessage({
              id:
                "mobile_phone_number_verification/phone_number_input_placeholder",
            })}
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          <ButtonWrapper>
            <SendCodeButton
              size="s"
              onClick={handleSendCodeButton}
              isActive={visibleResendButton}
              disabled={
                !phoneNumber || !countryCodeKey || phoneValidationSucceed
              }
            >
              <FormattedMessage
                id={
                  visibleResendButton
                    ? "mobile_phone_number_verification/button_resend_sms"
                    : "mobile_phone_number_verification/button_send_sms"
                }
              />
            </SendCodeButton>
          </ButtonWrapper>
        </SendInputWrapper>
      </>
    );
  },
);

export default PhoneNumberInput;
