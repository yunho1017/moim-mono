export type SupportedLanguageType = "en" | "ko";

export const SUPPORTED_LANGUAGES: SupportedLanguageType[] = ["en", "ko"];
export const DEFAULT_LANGUAGE: SupportedLanguageType = "en";

const cacheMessages: Map<string, { [key: string]: string }> = new Map();

/*
 * WARNING: Only use this function at test or ssr
 * Use this function after `await getMessages(locale)`
 * Because to use cache
 */
export function getMessagesFromCache(locale: string) {
  const messages = cacheMessages.get(locale);
  if (!messages) {
    throw new Error(
      "WARNING: Only use this function at test or ssr. Use this function after `await getMessages(locale)` Because to use cache."
    );
  }
  return messages;
}

export async function getMessages(
  locale: string
): Promise<{ [key: string]: string }> {
  const useLocale = SUPPORTED_LANGUAGES.includes(
    locale as SupportedLanguageType
  )
    ? locale
    : DEFAULT_LANGUAGE;

  if (!cacheMessages.has(useLocale)) {
    cacheMessages.set(
      useLocale,
      (
        await import(
          /* webpackChunkName: "[request]" */ `./assets/${useLocale}.json`
        )
      ).default
    );
  }
  return getMessagesFromCache(useLocale);
}

export function browserLocale(localeCode?: string): SupportedLanguageType {
  if (localeCode) {
    const locale = localeCode.split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(locale as SupportedLanguageType)) {
      return locale as SupportedLanguageType;
    } else {
      return DEFAULT_LANGUAGE;
    }
  }

  const isBrowser = !!window;

  if (isBrowser) {
    // browser side
    let locale =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language || (navigator as any).userLanguage;
    locale = locale.split("-")[0];
    if (SUPPORTED_LANGUAGES.indexOf(locale) < 0) {
      locale = DEFAULT_LANGUAGE;
    }
    return locale;
  } else {
    // server side
    return DEFAULT_LANGUAGE;
  }
}

export function browserLocaleCountry(localeCode?: string): string {
  if (localeCode) {
    const locale = localeCode.split("-");
    return locale.length > 1 ? locale[1] : locale[0];
  }

  const isBrowser = !!window;

  if (isBrowser) {
    // browser side
    let locale =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language || (navigator as any).userLanguage;
    locale = locale.split("-");

    return locale.length > 1 ? locale[1] : locale[0];
  } else {
    // server side
    return "KR";
  }
}
