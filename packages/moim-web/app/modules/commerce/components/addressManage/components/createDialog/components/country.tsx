import * as React from "react";
import _ from "lodash";
import styled from "styled-components";
import { countries, Country } from "countries-list";
import { FormattedMessage } from "react-intl";
import { BoxContainer, Left, Right } from "../styled";
import { StaticSelection } from "common/components/designSystem/selection";
import RequiredMark from "common/components/requiredMark";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import { IOption } from "common/components/designSystem/selection/type";
import { browserLocaleCountry } from "app/intl";

const StyledStaticSelection = styled(StaticSelection)`
  padding: 0;
`;
interface IProps {
  countryCode: string | undefined;
  onChange(updated: Partial<Moim.Commerce.ICommerceShippingAddress>): void;
}

const CountryInput: React.FC<IProps> = ({ countryCode, onChange }) => {
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
      Object.entries(useableCountryCodes).map(([key, value]) => ({
        value: key,
        label: `${key}-${value.country}`,
      })),
    [useableCountryCodes],
  );

  const handleChangeCountryCode = React.useCallback(
    (code: Moim.Id) => {
      onChange({ countryCode: code });
    },
    [onChange],
  );

  return (
    <>
      <Left>
        <FormattedMessage id="add_address_country_title" />
        <RequiredMark />
      </Left>
      <Right>
        <BoxContainer>
          <StyledStaticSelection
            size="l"
            state="normal"
            selected={countryCode ?? ""}
            options={countryOptions}
            isMultiple={false}
            useSearch={true}
            onChange={handleChangeCountryCode}
          />
        </BoxContainer>
      </Right>
    </>
  );
};

export default CountryInput;
