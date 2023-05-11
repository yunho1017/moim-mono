import * as React from "react";
import { MoimURL } from "common/helpers/url";
import CouponsContainer from "./coupons";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { Redirect, Route, Switch } from "react-router";

const CreditRedirector: React.FC = () => {
  const currentGroup = useCurrentGroup();
  const hubSellerId = currentGroup?.seller_id;

  if (hubSellerId) {
    return (
      <Redirect to={new MoimURL.CoinShow({ coinId: hubSellerId }).toString()} />
    );
  }

  return <Redirect to={new MoimURL.CommerceMyBenefitCoupons().toString()} />;
};
const Benefits: React.FC = () => {
  return (
    <Switch>
      <Route
        key="benefit_coupons"
        path={[
          MoimURL.CommerceMyBenefitCoupons.pattern,
          MoimURL.CommerceMyBenefitCouponsFocus.pattern,
        ]}
      >
        <CouponsContainer />
      </Route>
      <Route
        key="benefit_credit_histories"
        path={[MoimURL.CommerceMyBenefitCredits_Legacy.pattern]}
      >
        <CreditRedirector />
      </Route>
    </Switch>
  );
};

export default Benefits;
