import * as React from "react";
import { FormattedMessage } from "react-intl";
import { TabItemComponent, Tab } from "common/components/tab";
import InviteeList from "./tabs/inviteeList";
import Credit from "./tabs/credit";
import { Inner, TabContentWrapper } from "./styled";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import {
  getReferralPromotion,
  getReferralStat,
} from "common/components/myReferralDialog/actions";

type TabType = "inviteeList" | "credit";
function getTabs(inviteeCounts: number) {
  return [
    {
      type: "inviteeList" as TabType,
      value: (
        <FormattedMessage
          id="my_referral_my_performance_dialog_tab_invitees"
          values={{ n: inviteeCounts }}
        />
      ),
    },
    {
      type: "credit" as TabType,
      value: (
        <FormattedMessage id="my_referral_my_performance_dialog_tab_credits" />
      ),
    },
  ];
}

interface IProps {
  useTab: boolean;
}
export default function MyReferralPerformance({ useTab }: IProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>("inviteeList");

  const { referralPromotion, referralStat } = useStoreState(state => ({
    referralPromotion: state.myReferralDialog.promotion,
    referralStat: state.myReferralDialog.referralStat,
  }));
  const { dispatchGetReferralPromotion, dispatchGetReferralStat } = useActions({
    dispatchGetReferralPromotion: getReferralPromotion,
    dispatchGetReferralStat: getReferralStat,
  });

  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();

  React.useEffect(() => {
    if (currentGroup?.id && currentGroup.active_referral_promotions?.signUp) {
      if (!referralPromotion) {
        dispatchGetReferralPromotion(
          currentGroup.active_referral_promotions.signUp,
          cancelToken.current.token,
        );
      }

      if (!referralStat) {
        dispatchGetReferralStat(
          { referralType: "signUp" },
          cancelToken.current.token,
        );
      }
    }
  }, [currentGroup?.id]);

  const tabs = React.useMemo(() => getTabs(referralStat?.actionsCount ?? 0), [
    referralStat?.actionsCount,
  ]);
  const inner = React.useMemo(() => {
    switch (activeTab) {
      case "inviteeList":
        return <InviteeList />;
      case "credit":
        return <Credit />;
    }
  }, [activeTab]);

  if (!currentGroup?.is_hub) {
    return null;
  }
  return (
    <Inner>
      {useTab ? (
        <Tab>
          {tabs.map(({ type, value }) => (
            <TabItemComponent<TabType>
              key={type}
              type={type}
              onClick={setActiveTab}
              active={type === activeTab}
            >
              {value}
            </TabItemComponent>
          ))}
        </Tab>
      ) : null}
      <TabContentWrapper>{inner}</TabContentWrapper>
    </Inner>
  );
}
