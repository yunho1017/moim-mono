import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { userDenormalizer, userListDenormalizer } from "app/models";
import { entitiesSelector } from ".";

export const userListSelector = createSelector(
  entitiesSelector,
  entities =>
    userListDenormalizer({ data: Object.keys(entities.users) }, entities).data,
);

export const moimMemberListSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.group.members,
  (entities, members) => userListDenormalizer(members, entities),
);

export const userSelector = createSelector(
  entitiesSelector,
  (_state: IAppState, userId: Moim.Id) => userId,
  (entities, userId): Moim.User.IUser | undefined => {
    const userEntity = userDenormalizer(userId, entities);
    if (userEntity) {
      return {
        ...userEntity,
        positions: userEntity.positions.sort(
          (prev, next) => next.priority - prev.priority,
        ),
      };
    }

    return undefined;
  },
);

export const userSelector_new = createSelector(
  entitiesSelector,
  (_state: IAppState, userId: Moim.Id) => userId,
  (entities, userId): Moim.User.IUser | undefined => {
    const userEntity = userDenormalizer(userId, entities);
    if (userEntity) {
      return {
        ...userEntity,
        positions: userEntity.positions.sort(
          (prev, next) => next.priority - prev.priority,
        ),
      };
    }

    return undefined;
  },
);
