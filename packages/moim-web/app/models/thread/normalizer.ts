import { normalize } from "normalizr";
import {
  threadEntity,
  threadListEntity,
  threadSingleItemEntity,
} from "./entity";

export const threadNormalizer = (thread: Moim.Forum.IThread) =>
  normalize<Moim.Forum.IThread, Moim.Entity.INormalizedData, Moim.Id>(
    thread,
    threadEntity,
  );

export const threadSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Forum.IThread>,
) =>
  normalize<
    Moim.Forum.IThread,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, threadSingleItemEntity);

export const threadListNormalizer = <
  T extends Moim.IListResponse<Moim.Forum.IThread>
>(
  data: T,
) =>
  normalize<
    Moim.Forum.IThread,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, threadListEntity);
