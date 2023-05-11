import { denormalize } from "../";
import { fileEntity, fileSingleItemEntity, fileListEntity } from "./entity";

export const fileDenormalizer = (
  fileId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Upload.IDenormalizedFile>(
    fileId,
    fileEntity,
    entities,
  );

export const fileSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Upload.IDenormalizedFile>
  >(input, fileSingleItemEntity, entities);

export const fileListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Upload.IDenormalizedFile>>(
    input,
    fileListEntity,
    entities,
  );
