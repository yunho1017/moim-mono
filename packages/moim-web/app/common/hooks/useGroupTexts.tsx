import { useStoreState } from "app/store";
import { browserLocale } from "app/intl";
import useCurrentGroup from "app/common/hooks/useCurrentGroup";

export default function useGroupTexts(key: Moim.Group.GroupTextSetKey) {
  const defaultLocale = useStoreState(storeState => storeState.app.locale);
  const locale = browserLocale(defaultLocale ?? undefined);
  const currentGroup = useCurrentGroup();
  const text = currentGroup?.text_sets[key];
  return text ? text[locale] : null;
}

export function useCurrentUserLocale() {
  const defaultLocale = useStoreState(storeState => storeState.app.locale);
  const locale = browserLocale(defaultLocale ?? undefined);
  return locale;
}
