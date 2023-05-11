import { createIntl, IntlShape } from "react-intl";
import { getMessagesFromCache } from "./index";

/*
 * Only use in SSR & Test
 */
export function getIntl(locale: string): IntlShape {
  const messages = getMessagesFromCache(locale);
  return createIntl({
    locale,
    messages,
  });
}
