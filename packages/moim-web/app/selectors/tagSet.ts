import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";

export const getTagByIds = createSelector(
  (state: IAppState) => state.entities.tagset,
  (_: IAppState, ids: Moim.Id[]) => ids,
  (tagsetEntities, ids) =>
    ids.map(id => tagsetEntities[id] ?? undefined).filter(i => Boolean(i)),
);
