import { schema } from "normalizr";
import { groupEntity } from "../group";
import { positionSimpleListEntity } from "../position";

export const userDefinition = {
  group: groupEntity,
  positions: positionSimpleListEntity,
};

const generateMockUser = (userId: Moim.Id) => ({
  id: userId,
  group_id: "empty",
  name: userId,
  tz: "Asia/Seoul",
  is_deactivated: false,
  is_bot: false,
  positions: [],
  encrypted_email: "",
});

export const userEntity = new schema.Entity<Moim.User.IOriginalUserDatum>(
  "users",
  userDefinition,
  {
    idAttribute: "id",
    processStrategy(value: Moim.User.IOriginalUserDatum) {
      return {
        ...value,
        group: value.group_id,
        avatar: value.avatar_url,
      };
    },
    fallbackStrategy: (key: string) => generateMockUser(key),
  } as any,
);

export const userSingleItemEntity = new schema.Object<
  Moim.User.IOriginalUserDatum
>({
  data: userEntity,
});

export const userListEntity = new schema.Object<Moim.User.IOriginalUserDatum>({
  data: new schema.Array(userEntity),
});
