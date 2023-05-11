import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

export default function useSellerTexts(key: Moim.Commerce.SellerTextSetKey) {
  const locale = useCurrentUserLocale();
  const hubSeller = useHubSeller();
  const text = hubSeller?.textSet[key];
  return text ? text[locale] : null;
}
