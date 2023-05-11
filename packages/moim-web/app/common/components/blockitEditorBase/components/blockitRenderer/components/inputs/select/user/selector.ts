import { createSelector } from "reselect";
import { moimMembersSelector } from "app/selectors/moim";
import { IAppState } from "app/rootReducer";
import { entitiesSelector } from "app/selectors";
import { userDenormalizer } from "app/models";

export const userToOption = (user: Moim.User.IUser) => ({
  label: user.name,
  value: user.id,
  avatar: user.avatar_url,
});

export const selectMoimMemberOptions = createSelector(
  (state: IAppState) =>
    (moimMembersSelector(state) ?? { data: [], paging: {} }).data,
  moimMembers => moimMembers.map(userToOption),
);

export const selectDefaultOption = createSelector(
  entitiesSelector,
  (_: any, id: Moim.Id) => id,
  (entities, id) =>
    !id ? undefined : userToOption(userDenormalizer(id, entities)),
);
