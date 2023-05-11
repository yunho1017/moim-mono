import * as History from "history";
import { createSelector } from "reselect";
import { IAppState } from "../rootReducer";
import { MoimAppHome } from "common/helpers/url/rules";
import { entitiesSelector } from "./index";
import { userDenormalizer, groupDenormalizer } from "../models";

export const getPreviousLocationSelector = createSelector(
  (state: IAppState) => state.app.history.locations,
  (state: IAppState) => state.app.history.currentLocationKey,
  (locationHistory, currentLocationKey) => {
    const history = locationHistory
      .filter((location): location is NonNullable<typeof location> =>
        Boolean(location),
      )
      .reverse();
    const currentHistoryIndex = history.findIndex(
      location => location.key === currentLocationKey,
    );
    return history
      .slice(currentHistoryIndex)
      .find(location => !location.state?.modal);
  },
);

export const getModalHistoryBackLocationSelector = createSelector(
  getPreviousLocationSelector,
  previousLocation =>
    previousLocation
      ? previousLocation
      : {
          pathname: new MoimAppHome().toString(),
        },
);

export const currentUserSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.app.currentUserId,
  (entities, currentUserId) =>
    currentUserId ? userDenormalizer(currentUserId, entities) : null,
);

export const currentUserSelectorV2 = createSelector(
  (state: IAppState) => state.entities.users,
  (state: IAppState) => state.app.currentUserId,
  (entities, currentUserId) => (currentUserId ? entities[currentUserId] : null),
);

export const currentGroupSelector = (state: IAppState) =>
  state.app.currentGroupId
    ? state.entities.groups[state.app.currentGroupId]
    : null;

export const currentHubGroupSelector = createSelector(
  entitiesSelector,
  (state: IAppState) => state.app.currentHubGroupId,
  (entities, currentHubGroupId) =>
    currentHubGroupId ? groupDenormalizer(currentHubGroupId, entities) : null,
);

function isModalFromLocation(location: History.Location<any>) {
  return Boolean(location.state && location.state.modal);
}

export const isModalSelector = createSelector(
  (state: IAppState) => state.router.location,
  location => Boolean(isModalFromLocation(location)),
);

export const blockedUserSelector = createSelector(
  (state: IAppState) => state.app.blockedUsers,
  (_state: IAppState, userId: string) => userId,
  (blockedUsers, targetUser) => blockedUsers.includes(targetUser),
);
