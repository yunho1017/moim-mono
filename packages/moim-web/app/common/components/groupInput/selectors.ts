import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";
import GroupInputTypes from "./type";

export const selectImgBlocks = createSelector(
  (state: IAppState, ids: { id: Moim.Id; priority: number }[]) =>
    ids
      .filter(i => Boolean(i))
      .map(i => state.entities.files[i.id] as Moim.Upload.IFileInfo),
  fileEntities =>
    fileEntities.map(fileEntity => {
      if (fileEntity?.image_preview && fileEntity?.image_urls) {
        return {
          type: "image",
          status: fileEntity.status,
          fileId: fileEntity.id,
          ...fileEntity.image_preview,
          ...fileEntity.image_urls,
        } as GroupInputTypes.FileStatusImageBlock;
      }
      return undefined;
    }) as GroupInputTypes.FileStatusImageBlock[],
);
