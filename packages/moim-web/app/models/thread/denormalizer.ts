import { denormalize } from "../";
import {
  threadEntity,
  threadListEntity,
  threadSingleItemEntity,
} from "./entity";

export const threadDenormalizer = (
  threadId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Forum.IDenormalizedThread>(
    threadId,
    threadEntity,
    entities,
  );

export const threadSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Forum.IDenormalizedThread>
  >(input, threadSingleItemEntity, entities);

export const threadListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Forum.IDenormalizedThread>>(
    input,
    threadListEntity,
    entities,
  );
