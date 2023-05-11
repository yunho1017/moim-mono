import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { tagListDenormalizer, tagDenormalizer } from "app/models/tag";
import { groupListDenormalizer } from "app/models/group";
import { recommendGroupSectionListDenormalizer } from "app/models/recommendGroupSection";
import { entitiesSelector } from ".";

export const tagSelector = (state: IAppState, tagId: Moim.Id) =>
  createSelector(entitiesSelector, entities =>
    tagDenormalizer(tagId, entities),
  )(state);

export const tagsSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.subgroupsData.tags,
  (entities, tags: Moim.IPaginatedListResponse<Moim.Id>) =>
    tagListDenormalizer(tags, entities),
);

export const subgroupSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.subgroupsData.subgroups,
  (entities, subgroups: Moim.IPaginatedListResponse<Moim.Id>) =>
    groupListDenormalizer(subgroups, entities),
);

export const joinedSubMoimListSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.subgroupsData.joinedSubMoims,
  (entities, subgroups: Moim.IPaginatedListResponse<Moim.Id>) => {
    const subMoims = groupListDenormalizer(subgroups, entities);
    return {
      ...subMoims,
      data: subMoims?.data.filter(moim => !moim.is_hub),
    };
  },
);

export const hubMoimSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.subgroupsData.joinedSubMoims,
  (entities, subgroups: Moim.IPaginatedListResponse<Moim.Id>) =>
    groupListDenormalizer(subgroups, entities)?.data.find(moim => moim.is_hub),
);

export const recommendMoimsSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.subgroupsData.recommendMoims,
  (entities, recommendMoims: Moim.IPaginatedListResponse<Moim.Id>) =>
    recommendGroupSectionListDenormalizer(recommendMoims, entities),
);
