import * as React from "react";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

export function useFormattedTextSet(textSet: { [key: string]: string }) {
  const locale = useCurrentUserLocale();

  return React.useMemo(
    () => textSet[locale] ?? textSet[Object.keys(textSet)[0]],
    [locale, textSet],
  );
}
