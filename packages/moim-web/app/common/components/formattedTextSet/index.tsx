import * as React from "react";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

export default function FormattedTextSet({
  textSet,
}: {
  textSet: { [key: string]: string };
}) {
  const locale = useCurrentUserLocale();

  return <>{textSet[locale] ?? textSet[Object.keys(textSet)[0]]}</>;
}
