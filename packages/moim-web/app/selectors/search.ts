import { createSelector } from "reselect";
import { entitiesSelector } from ".";
import { userListDenormalizer } from "app/models";
import { IAppState } from "app/rootReducer";

export const searchedUsersSelector = createSelector(
  entitiesSelector,
  state => state.search.users,
  (entities, users) => userListDenormalizer(users, entities),
);

export const searchedUsersSelectorV2 = createSelector(
  (state: IAppState) => state.entities.users,
  state => state.search.users,
  (entities, users) => {
    const data = users.data.map(id => entities[id]).filter(i => Boolean(i));

    return {
      data,
      paging: users.paging,
    };
  },
);
