import * as React from "react";
import useHubSeller from "common/hooks/commerce/useHubSeller";

export default function useEnableCoupon() {
  const hubSeller = useHubSeller();

  const couponEnabled = React.useMemo(() => hubSeller?.config.couponEnabled, [
    hubSeller,
  ]);

  return couponEnabled;
}
