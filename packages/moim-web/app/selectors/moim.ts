import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import {
  moimListDenormalizer,
  userListDenormalizer,
  groupListDenormalizer,
} from "../models";
import { entitiesSelector } from ".";

const selectMoimDataForHub = (state: IAppState) => state.hub.app.myGroups;

export const selectMyMoimListForHub = createSelector(
  selectMoimDataForHub,
  entitiesSelector,
  (data, entities) => moimListDenormalizer(data, entities),
);

export const moimMembersSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.group.members,
  (entities, members) => userListDenormalizer(members, entities),
);

export const moimMembersSelectorV2 = createSelector(
  (state: IAppState) => state.entities.users,
  (state: IAppState) => state.group.members,
  (entities, users) => {
    const data = Object.entries(entities)
      .filter(([, value]) => users.data.includes(value.id))
      .map(([, val]) => val);

    return {
      data,
      paging: users.paging,
    };
  },
);

export const getMemberLoadingLoadingSelector = (state: IAppState) =>
  Boolean(state.group.getMembersLoading);

export const myJoinedMoimSelector = createSelector(
  (state: IAppState) => state.group.myJoinedMoims,
  entitiesSelector,
  (data, entities) => groupListDenormalizer(data, entities),
);

export const selectMoimsById = createSelector(
  (state: IAppState, _: Moim.Id[]) => state.entities,
  (_: IAppState, ids: Moim.Id[]) => ids,
  (entities, ids): Moim.Group.IGroup[] => {
    const { groups, tags } = entities;
    const moims = ids.map(id => {
      const tmpGroup: Moim.Group.INormalizedGroup = {
        ...groups[id],
      };
      const tmpTags: Moim.Tag.ITag[] = [];
      if (tmpGroup.tags?.length) {
        tmpGroup.tags.forEach(tagId => {
          tmpTags.push(tags[tagId]);
        });
        (tmpGroup as Moim.Group.IGroup).tags = tmpTags;
      }
      return tmpGroup as Moim.Group.IGroup;
    });

    return moims;
  },
);

export const isUpdateMoimLoadingSelector = createSelector(
  (state: IAppState) => state.group.moimRename.loading,
  (state: IAppState) => state.group.moimSetDescription.loading,
  (state: IAppState) => state.group.moimUpdateIcon.loading,
  (renameLoading, setDescriptionLoading, updateIconLoading) =>
    renameLoading || setDescriptionLoading || updateIconLoading,
);

export const getUpdateMoimErrorSelector = createSelector(
  (state: IAppState) => state.group.moimRename.error,
  (state: IAppState) => state.group.moimSetDescription.error,
  (state: IAppState) => state.group.moimUpdateIcon.error,
  (renameError, setDescriptionError, updateIconError) =>
    renameError || setDescriptionError || updateIconError,
);

export const isCreateSubMoimSelector = (state: IAppState) =>
  state.group.isCreateSubMoimLoading;
