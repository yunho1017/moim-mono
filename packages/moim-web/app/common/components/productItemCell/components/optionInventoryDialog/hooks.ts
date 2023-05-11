import { useCallback } from "react";

import { useActions } from "app/store";
import { ActionCreators } from "./actions";

export function useOpenProductOptionInventoryDialog(initialId?: string) {
  const { open } = useActions({ open: ActionCreators.open });

  return useCallback(
    (productId?: string) => {
      const id = productId ?? initialId;
      if (id) {
        open({ productId: id });
      }
    },
    [open, initialId],
  );
}
export function useCloseProductOptionInventoryDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return close;
}
