import * as React from "react";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

export default function useGlobalPhonePrefixOption(
  meta: Moim.Forum.IProductReviewThreadMeta | undefined,
) {
  const locale = useCurrentUserLocale();
  return React.useMemo(() => {
    const optionLocaleKeys =
      Object.keys(meta?.purchaseItemSnap?.optionsLabel ?? {}) ?? [];
    if (
      !meta ||
      !meta.purchaseItemSnap?.optionsLabel ||
      optionLocaleKeys.length === 0
    ) {
      return undefined;
    }

    const res =
      meta.purchaseItemSnap.optionsLabel[locale as any] ??
      meta.purchaseItemSnap.optionsLabel[optionLocaleKeys[0] as any] ??
      meta.purchaseItemSnap.optionsLabel["en" as any];

    return Object.entries(res)
      .map(([, value]) => value)
      .join(" · ");
  }, [locale, meta]);
}
