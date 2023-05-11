import { schema } from "normalizr";
import { userEntity } from "app/models/user/entity";

export const fileDefinition = {
  user: userEntity,
};

export const fileEntity = new schema.Entity<Moim.Upload.IFile>(
  "files",
  fileDefinition,
);
export const fileSingleItemEntity = new schema.Object<Moim.Upload.IFile>({
  data: fileEntity,
});
export const fileListEntity = new schema.Object<Moim.Upload.IFile>({
  data: new schema.Array(fileEntity),
});

const fileItemEntity = new schema.Entity("blockits");
const blockKitFileEntity = new schema.Object({
  files: new schema.Array(fileItemEntity),
});

export const arrayFileBlockKitEntity = new schema.Array(blockKitFileEntity);
