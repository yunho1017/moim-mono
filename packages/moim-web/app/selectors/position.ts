import { createSelector } from "reselect";
import { IAppState } from "../rootReducer";
import {
  positionListDenormalizer,
  positionSimpleListDenormalizer,
} from "../models/position";
import { entitiesSelector } from "./";
import { userListDenormalizer } from "../models/user";
import { userListSelector, userSelector, moimMemberListSelector } from "./user";
import { positionDenormalier } from "app/models/position/denormalizer";

export const positionStateSelector = (state: IAppState) => state.position;

export const positionsSelector = createSelector(
  positionStateSelector,
  entitiesSelector,
  (positionState, entities) =>
    positionListDenormalizer(positionState.positions, entities).data.sort(
      (a, b) => b.priority - a.priority,
    ),
);

export const positionMemberSelector = createSelector(
  (state: IAppState, positionId: Moim.Id) =>
    state.position.positionMemberMap[positionId],
  entitiesSelector,
  (members, entities) => userListDenormalizer(members, entities),
);

export const positionByIdSelector = createSelector(
  entitiesSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  (entities, positionId) =>
    positionId ? positionDenormalier(positionId, entities) : undefined,
);

export const positionMembersSelector = createSelector(
  positionStateSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  entitiesSelector,
  (
    positionState,
    positionId,
    entities,
  ): Moim.IPaginatedListResponse<Moim.User.IUser> => {
    const positionMemberData =
      positionState.positionMemberMap[positionId || ""];

    if (!positionMemberData) {
      return { data: [], paging: {} };
    }

    return userListDenormalizer(positionMemberData, entities);
  },
);

export const getPositionMembersLoadingSelector = createSelector(
  positionStateSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  (positionState, positionId) =>
    positionId
      ? Boolean(positionState.getPositionMembersLoading[positionId])
      : false,
);

export const getAppointableMembersSelector = createSelector(
  moimMemberListSelector,
  (_: IAppState, positionId: Moim.Id) => positionId,
  (users, positionId): Moim.IPaginatedListResponse<Moim.User.IUser> => ({
    ...users,
    data: users.data.filter(
      user => !user.positions.find(position => position.id === positionId),
    ),
  }),
);

export const getAppointMemberLoadingSelector = createSelector(
  positionStateSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  (positionState, positionId) =>
    positionId
      ? Boolean(positionState.appointPositionLoading[positionId])
      : false,
);

export const getPositionMemberSelector = createSelector(
  entitiesSelector,
  (state: IAppState, positionId: Moim.Id) =>
    state.position.positionMemberMap[positionId],
  (
    entities,
    positionMember,
  ): Moim.IPaginatedListResponse<Moim.User.IUser> | undefined =>
    userListDenormalizer(positionMember, entities),
);

export const getDismissableMembersSelector = createSelector(
  userListSelector,
  (_: IAppState, positionId: Moim.Id) => positionId,
  (users, positionId) =>
    users.filter(user =>
      user.positions.find(position => position.id === positionId),
    ),
);

export const getDismissMemberLoadingSelector = createSelector(
  positionStateSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  (positionState, positionId) =>
    positionId
      ? Boolean(positionState.dismissPositionLoading[positionId])
      : false,
);

export const getAppointDismissMemberLoading = createSelector(
  getAppointMemberLoadingSelector,
  getDismissMemberLoadingSelector,
  (appointMemberLoading, dismissMemberLoading) =>
    appointMemberLoading || dismissMemberLoading,
);

export const getEditPositionLoadingSelector = createSelector(
  positionStateSelector,
  (_: IAppState, positionId: Moim.Id | undefined) => positionId,
  (positionState, positionId) =>
    positionId
      ? Boolean(positionState.updatePositionLoading[positionId])
      : false,
);

export const lowPrioritySelector = createSelector(
  positionsSelector,
  positions => positions[positions.length - 1]?.priority || 0,
);

export const positionCreatorSelector = createSelector(
  state => state,
  positionByIdSelector,
  (state, position) =>
    position ? userSelector(state, position?.creator) : undefined,
);

export const positionsSelectorById = createSelector(
  entitiesSelector,
  (_: IAppState, inputs: Moim.Id[]) => inputs,
  (entities, positionsIds) =>
    positionSimpleListDenormalizer(positionsIds, entities)
      .filter(position => Boolean(position))
      .sort((a, b) => b.priority - a.priority),
);

export const nonePositionIdSelector = createSelector(
  entitiesSelector,
  (_: IAppState, inputs: Moim.Id[]) => inputs,
  (entities, positionsIds) =>
    positionsIds.filter(id => !entities.positions[id]),
);
