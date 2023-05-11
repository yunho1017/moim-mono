import { normalize } from "normalizr";
import { groupEntity, groupListEntity, groupSingleItemEntity } from "./entity";

export const groupNormalizer = (group: Moim.Group.INormalizedGroup) =>
  normalize<Moim.Group.INormalizedGroup, Moim.Entity.INormalizedData, Moim.Id>(
    group,
    groupEntity,
  );

export const groupSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>,
) =>
  normalize<
    Moim.Group.INormalizedGroup,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, groupSingleItemEntity);

export const groupListNormalizer = <
  T extends Moim.IListResponse<Moim.Group.INormalizedGroup>
>(
  data: T,
) =>
  normalize<
    Moim.Group.INormalizedGroup,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, groupListEntity);
