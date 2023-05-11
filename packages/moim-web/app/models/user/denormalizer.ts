import { denormalize } from "../";
import { userEntity, userSingleItemEntity, userListEntity } from "./entity";

export const userDenormalizer = (
  userId: string,
  entities: Moim.Entity.INormalizedData,
) => denormalize<Moim.Id, Moim.User.IUser>(userId, userEntity, entities);

export const userSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.User.IUser>
  >(input, userSingleItemEntity, entities);

export const userListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.User.IUser>>(
    input,
    userListEntity,
    entities,
  );
