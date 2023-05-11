import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { entitiesSelector } from "app/selectors";
import { userDenormalizer } from "app/models";

export const inviteeListSelector = createSelector(
  entitiesSelector,
  (
    _state: IAppState,
    inviteeList: Moim.IPaginatedListResponse<Moim.Referral.IReferralInvitee>,
  ) => {
    return inviteeList;
  },
  (entities, inviteeList): Moim.IPaginatedListResponse<Moim.User.IUser> => {
    return {
      ...inviteeList,
      data: inviteeList.data.map(invitee =>
        userDenormalizer(invitee.userId, entities),
      ),
    };
  },
);
