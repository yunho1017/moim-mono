import { denormalize } from "../";
import { groupEntity, groupListEntity, groupSingleItemEntity } from "./entity";

export const groupDenormalizer = (
  groupId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) => denormalize<Moim.Id, Moim.Group.IGroup>(groupId, groupEntity, entities);

export const groupSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Group.IGroup>
  >(input, groupSingleItemEntity, entities);

export const groupListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Group.IGroup>>(
    input,
    groupListEntity,
    entities,
  );
