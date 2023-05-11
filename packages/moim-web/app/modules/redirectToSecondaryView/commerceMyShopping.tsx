import * as React from "react";
import { Redirect } from "react-router";
import { IRouteComponentProps } from "app/routes/client";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { useStoreState } from "app/store";

const CommerceMyShoppingRedirector: React.FC<IRouteComponentProps> = ({
  match,
}) => {
  const { redirect } = useNativeSecondaryView();
  const hubSellerId = useStoreState(state =>
    state.app.currentGroupId
      ? state.entities.groups[state.app.currentGroupId]?.seller_id
      : undefined,
  );
  const redirectURL = React.useMemo(() => {
    if (MoimURL.CommercePaymentsShow.isSameExact(match.url)) {
      return new MoimURL.CommercePaymentsShow({
        id: match.params.id!,
      }).toString();
    } else if (MoimURL.CommercePaymentsList.isSameExact(match.url)) {
      return new MoimURL.CommercePaymentsList().toString();
    } else if (MoimURL.CommerceMyBenefit.isSameExact(match.url)) {
      if (
        MoimURL.CommerceMyBenefitCredits_Legacy.isSameExact(match.url) &&
        hubSellerId
      ) {
        return new MoimURL.CoinShow({ coinId: hubSellerId }).toString();
      }
      if (MoimURL.CommerceMyBenefitCoupons.isSameExact(match.url)) {
        return new MoimURL.CommerceMyBenefitCoupons().toString();
      }
      return new MoimURL.CommerceMyBenefit().toString();
    } else {
      return new MoimURL.CommerceMyShopping({
        tab: "payments",
      }).toString();
    }
  }, [match.params.id, hubSellerId, match.url]);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      redirect(redirectURL);
    }, 500);
  }, [redirect, redirectURL]);

  return <Redirect to="/" />;
};

export default CommerceMyShoppingRedirector;
