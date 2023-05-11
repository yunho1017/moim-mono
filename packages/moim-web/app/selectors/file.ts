import { createSelector } from "reselect";
import { entitiesSelector } from ".";
import { IAppState } from "app/rootReducer";
import { fileDenormalizer, fileListDenormalizer } from "app/models";

export const fileSelector = (state: IAppState, fileId: Moim.Id) =>
  createSelector(entitiesSelector, entities =>
    fileDenormalizer(fileId, entities),
  )(state);

export const fileListSelector = (state: IAppState, fileIds: Moim.Id[]) =>
  createSelector(
    entitiesSelector,
    entities => fileListDenormalizer({ data: fileIds }, entities)?.data,
  )(state);
