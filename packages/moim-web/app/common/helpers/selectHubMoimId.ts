import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";

export const selectHubMoimIdWithoutState = createSelector(
  (currentGroup: Moim.Group.INormalizedGroup | null) =>
    currentGroup
      ? currentGroup.parent
        ? currentGroup.parent
        : currentGroup.is_hub
        ? currentGroup.id
        : null
      : null,
  result => result,
);

const selectHubMoimId = (state: IAppState) => state.app.currentHubGroupId;

export default selectHubMoimId;
