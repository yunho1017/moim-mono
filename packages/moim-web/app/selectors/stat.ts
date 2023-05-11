import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";
import { statDenormalizer } from "app/models/stat";
import { entitiesSelector } from ".";

export const moimStatSelector = (state: IAppState, id: string) =>
  statDenormalizer(id, state.entities);

export const currentGroupStatSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.app.currentGroupId,
  (entities, currentGroupId) =>
    currentGroupId ? statDenormalizer(currentGroupId, entities) : null,
);
