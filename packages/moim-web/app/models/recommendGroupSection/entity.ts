import { schema } from "normalizr";
import { groupEntity } from "../group";

export const recommendGroupSectionDefinition = {
  childGroups: new schema.Array(groupEntity),
};

export const recommendGroupSectionEntity = new schema.Entity<
  Moim.Group.IGroupWithUser
>("recommendGroupSection", recommendGroupSectionDefinition, {
  processStrategy: value => ({
    ...value,
    childGroups: value.childGroupIds,
  }),
});

export const recommendGroupSectionEntitySingleItemEntity = new schema.Object<
  Moim.Group.IRecommendGroupSection
>({
  data: recommendGroupSectionEntity,
});

export const recommendGroupSectionListEntity = new schema.Object<
  Moim.Group.IRecommendGroupSection
>({
  data: new schema.Array(recommendGroupSectionEntity),
});
