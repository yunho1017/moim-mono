import { createSelector } from "reselect";
import { entitiesSelector } from "app/selectors";
import { IAppState } from "app/rootReducer";
import { threadDenormalizer, threadListDenormalizer } from "app/models";

const selectDraftState = (state: IAppState) => state.draftState;

export const selectCurrentDraft = createSelector(
  entitiesSelector,
  selectDraftState,
  (entities, state) =>
    state.currentDraftId
      ? threadDenormalizer(state.currentDraftId, entities)
      : null,
);

export const selectDraftList = createSelector(
  entitiesSelector,
  selectDraftState,
  (entities, state) => {
    const data = threadListDenormalizer(state.drafts, entities) ?? {
      data: [],
      paging: {},
    };
    const orderedList = data.data.sort((x, y) => y.updated_at - x.updated_at);

    return {
      data: orderedList,
      paging: data.paging,
    };
  },
);
