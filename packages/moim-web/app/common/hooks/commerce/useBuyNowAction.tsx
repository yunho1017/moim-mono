// Ref: https://vingle.atlassian.net/wiki/spaces/BT/pages/153550849/Payment+Web
import * as React from "react";
import { ActionCreators as CommerceActionCreators } from "app/actions/commerce";
import { useActions } from "app/store";

export default function useBuyNowAction() {
  const { openCheckoutRedirectDialog } = useActions({
    openCheckoutRedirectDialog:
      CommerceActionCreators.openCheckoutRedirectLoadingDialog,
  });

  const openDialog = React.useCallback(
    async (
      items: Moim.Commerce.ICartSellerItem[],
      isFromCart: boolean = false,
      userCoupons?: string[],
      usedCoins?: { coinId: string; amount: number }[],
    ) => {
      openCheckoutRedirectDialog(items, isFromCart, userCoupons, usedCoins);
    },
    [openCheckoutRedirectDialog],
  );

  return openDialog;
}
