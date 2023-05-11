import { schema } from "normalizr";
import { statEntity } from "../stat";
import { tagEntity } from "../tag";

export const groupDefinition = {
  stat: statEntity,
  tags: new schema.Array(tagEntity),
};

export const groupEntity = new schema.Entity("groups", groupDefinition, {
  processStrategy: value => ({
    ...value,
    stat: value.stat ?? {},
  }),
});

export const groupSingleItemEntity = new schema.Object<Moim.Group.IGroup>({
  data: groupEntity,
});

export const groupListEntity = new schema.Object<Moim.Group.IGroup>({
  data: new schema.Array(groupEntity),
});
