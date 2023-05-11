import { schema } from "normalizr";
import { groupEntity } from "../group";
import { userEntity } from "../user";

export const moimDefinition = {
  group: groupEntity,
  user: userEntity,
};

export const moimEntity = new schema.Entity<Moim.Group.IGroupWithUser>(
  "moims",
  moimDefinition,
  {
    idAttribute(moim: Moim.Group.IGroupWithUser) {
      return `${moim.group.id}_${moim.user.id}`;
    },
  },
);

export const moimSingleItemEntity = new schema.Object<
  Moim.Group.IGroupWithUser
>({
  data: moimEntity,
});

export const moimListEntity = new schema.Object<Moim.Group.IGroupWithUser>({
  data: new schema.Array(moimEntity),
});
