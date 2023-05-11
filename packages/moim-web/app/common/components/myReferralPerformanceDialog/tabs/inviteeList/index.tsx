import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";

import MemberList from "common/components/memberList";
import Empty from "./empty";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import { getReferralInviteeList } from "../../actions";
import { inviteeListSelector } from "./selector";

const InviteeList: React.FC = () => {
  const cancelToken = useCancelToken();
  const { isLoading, userList, referralInviteeList } = useStoreState(state => {
    const referralInviteeList =
      state.myReferralPerformanceDialog.referralInviteeList;

    return {
      referralInviteeList,
      userList: inviteeListSelector(state, referralInviteeList),
      isLoading: state.myReferralPerformanceDialog.referralInviteeListLoading,
    };
  });
  const { dispatchGetReferralInviteeList } = useActions({
    dispatchGetReferralInviteeList: getReferralInviteeList,
  });

  const handleGetReferralInviteeList = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetReferralInviteeList(
        {
          ...paging,
          referralType: "signUp",
        },
        cancelToken.current.token,
      );
    },
    [referralInviteeList.paging, dispatchGetReferralInviteeList],
  );

  React.useEffect(() => {
    handleGetReferralInviteeList();
  }, []);

  const renderSubTitle = React.useCallback(
    (user: Moim.User.IUser) => {
      const invitee = referralInviteeList.data.find(
        _invitee => _invitee.userId === user.id,
      );

      if (invitee) {
        const createdAt = moment(invitee.createdAt).format("YYYY.MM.DD");
        return (
          <FormattedMessage id="date_signed_up" values={{ date: createdAt }} />
        );
      }

      return null;
    },
    [referralInviteeList],
  );

  return (
    <MemberList
      members={userList}
      isLoading={isLoading}
      onGetMembers={handleGetReferralInviteeList}
      subTitleKeys={{ type: "customRenderer", value: renderSubTitle }}
      subTitleShaveLine={1}
      hasTitle={false}
      emptyStateElement={<Empty />}
    />
  );
};

export default InviteeList;
