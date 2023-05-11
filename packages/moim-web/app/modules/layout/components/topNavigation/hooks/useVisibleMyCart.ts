import * as React from "react";
import useHubSeller from "common/hooks/commerce/useHubSeller";

export default function useVisibleMyCart() {
  const hubSeller = useHubSeller();

  const visibleMyCart = React.useMemo(() => hubSeller?.config.cartEnabled, [
    hubSeller,
  ]);

  return visibleMyCart;
}
