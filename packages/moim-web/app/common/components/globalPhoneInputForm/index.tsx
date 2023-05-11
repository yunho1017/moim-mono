import * as React from "react";
import _ from "lodash";
import { FlattenInterpolation } from "styled-components";
import { countries, Country } from "countries-list";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
// helpers
import { browserLocaleCountry } from "app/intl";
// components
import { StaticSelection } from "common/components/designSystem/selection";
import { IOption } from "common/components/designSystem/selection/type";
import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import { InputStatusType } from "common/components/designSystem/boxInput/type";
import { Wrapper, selectionStyle } from "./styled";

interface IProps {
  countryCode?: string;
  phone?: string;
  selectionPlaceholder?: string;
  selectionState?: "normal" | "error" | "disabled";
  inputPlaceholder?: string;
  inputWrapperStyle?: FlattenInterpolation<any>;
  inputHelperText?: React.ReactNode;
  inputStatus?: InputStatusType;
  onChange(countyCode: string | null, phone: string): void;
}

const GlobalPhoneInputForm: React.FC<IProps> = ({
  countryCode,
  phone,
  selectionState = "normal",
  selectionPlaceholder,
  inputPlaceholder,
  inputWrapperStyle,
  inputHelperText,
  inputStatus,
  onChange,
}) => {
  const [countryCodeKey, setCountryCodeKey] = React.useState<string | null>(
    null,
  );
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const currentGroup = useCurrentGroup();
  const useableCountryCodes = React.useMemo(() => {
    const objCountries = _.toPairs(countries);
    let highOrderIntl: string[] = [];

    const lang = browserLocaleCountry();
    const target = Object.entries(objCountries).filter(
      ([, [key, { languages }]]) =>
        key.toUpperCase() === lang.toUpperCase() || languages.includes(lang),
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

    if (currentGroup?.internationalizations) {
      highOrderIntl = _.uniq(
        highOrderIntl.concat(
          currentGroup.internationalizations.map(i => i.regionCode),
        ),
      );
    }

    const tmpData = Object.entries(objCountries);

    const data = [
      ...(highOrderIntl
        .map(code => tmpData.find(([, [key]]) => key === code))
        .filter(i => Boolean(i)) as [string, [string, Country]][]),
      ...(tmpData
        .filter(([, [key]]) => !highOrderIntl.includes(key))
        .filter(i => Boolean(i)) as [string, [string, Country]][]),
    ].map(val => val[1]);

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

  const handleChangeCountryCode = React.useCallback((code: Moim.Id) => {
    setCountryCodeKey(code);
  }, []);

  React.useEffect(() => {
    if (countryCode) {
      const defaultCountryCodeKey = Object.entries(useableCountryCodes).find(
        ([, value]) => value.code === countryCode,
      );
      if (!phoneNumber && phone && defaultCountryCodeKey) {
        setPhoneNumber(phone);
        setCountryCodeKey(defaultCountryCodeKey[1].code);
      }
    } else {
      const lang = browserLocaleCountry();
      const target = Object.entries(useableCountryCodes).filter(
        ([key, { languages }]) =>
          key.toUpperCase() === lang.toUpperCase() || languages.includes(lang),
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
  }, [useableCountryCodes, countryCode]);

  React.useEffect(() => {
    onChange(countryCodeKey, phoneNumber);
  }, [countryCodeKey, phoneNumber]);

  return (
    <Wrapper>
      <StaticSelection
        size="l"
        state={selectionState}
        selected={countryCodeKey}
        options={countryOptions}
        isMultiple={false}
        useSearch={true}
        placeholder={selectionPlaceholder}
        overrideStyle={selectionStyle}
        onChange={handleChangeCountryCode}
      />
      <BoxInput
        size="Large"
        type="number"
        value={phoneNumber}
        wrapperStyle={inputWrapperStyle}
        placeholder={inputPlaceholder}
        helperText={inputHelperText}
        status={inputStatus}
        onChange={setPhoneNumber}
      />
    </Wrapper>
  );
};

export default GlobalPhoneInputForm;
