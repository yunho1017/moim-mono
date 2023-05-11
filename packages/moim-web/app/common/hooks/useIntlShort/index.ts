import { useIntl } from "react-intl";

export function useIntlShort() {
  const intl = useIntl();

  return (
    key: string,
    values?: Record<string, string | number | Date | any>,
  ) => {
    if (!intl.messages[key]) {
      return key;
    }

    return intl.formatMessage({ id: key }, values);
  };
}

export function useIntlShortWithFallback() {
  const intl = useIntl();

  return (
    key: string,
    fallbackKey: string,
    values?: Record<string, string | number | Date>,
  ) => {
    if (intl.messages[key]) {
      return intl.formatMessage({ id: key }, values);
    }
    return intl.formatMessage({ id: fallbackKey }, values);
  };
}
