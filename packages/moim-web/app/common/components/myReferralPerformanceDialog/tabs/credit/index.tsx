import * as React from "react";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useActions, useStoreState } from "app/store";
import { getReferralCreditHistories } from "../../actions";
import CreditHistories from "../../components/creditHistories";

const Credit: React.FC = () => {
  const currentGroup = useCurrentGroup();
  const { isLoading, creditHistories, totalAmount } = useStoreState(state => ({
    isLoading: state.myReferralPerformanceDialog.credit.loading,
    creditHistories: state.myReferralPerformanceDialog.credit.histories,
    totalAmount: state.myReferralDialog.referralStat?.totalRewardAmount,
  }));
  const { dispatchGetReferralCreditHistories } = useActions({
    dispatchGetReferralCreditHistories: getReferralCreditHistories,
  });

  const handleLoadMore = React.useCallback(() => {
    if (currentGroup?.seller_id) {
      dispatchGetReferralCreditHistories(currentGroup.seller_id, {
        ...creditHistories.paging,
      });
    }
  }, [
    creditHistories.paging,
    currentGroup,
    dispatchGetReferralCreditHistories,
  ]);

  React.useEffect(() => {
    if (currentGroup?.seller_id) {
      dispatchGetReferralCreditHistories(currentGroup.seller_id, {});
    }
  }, []);

  return (
    <CreditHistories
      isLoading={isLoading}
      totalAmount={totalAmount ?? 0}
      histories={creditHistories}
      emptyTextKey="my_referral_my_performance_dialog_tab_credits_list_empty"
      onLoadMore={handleLoadMore}
    />
  );
};

export default Credit;
