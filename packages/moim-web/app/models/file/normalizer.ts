import { normalize } from "normalizr";
import { fileEntity, fileSingleItemEntity, fileListEntity } from "./entity";

export const fileNormalizer = (file: Moim.Upload.IFile) =>
  normalize<Moim.Upload.IFile, Moim.Entity.INormalizedData, Moim.Id>(
    file,
    fileEntity,
  );

export const fileSingleItemNormalizer = (
  file: Moim.ISingleItemResponse<Moim.Upload.IFile>,
) =>
  normalize<
    Moim.Upload.IFile,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(file, fileSingleItemEntity);

export const fileListNormalizer = <
  T extends Moim.IListResponse<Moim.Upload.IFile>
>(
  file: T,
) =>
  normalize<
    Moim.Upload.IFile,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(file, fileListEntity);
