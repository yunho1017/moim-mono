import produce from "immer";

import { AllActions } from "app/actions";
import { HubAppStateTypes, GroupTypes } from "app/actions/types";

export interface IHubAppState {
  myGroups: Moim.IPaginatedListResponse<Moim.Id>;
  moimIcon?: Moim.Group.IGroupImagePreview;
}

export const INITIAL_STATE: IHubAppState = {
  myGroups: {
    data: [],
    paging: {},
  },
  moimIcon: undefined,
};

export const reducer = (_state = INITIAL_STATE, action: AllActions) =>
  produce(_state, draft => {
    switch (action.type) {
      case HubAppStateTypes.SUCCEEDED_FETCHING_MY_GROUP: {
        draft.myGroups = action.payload.groups;
        break;
      }

      case HubAppStateTypes.SUCCEEDED_FILE_UPLOAD: {
        draft.moimIcon = action.payload.icon;
        break;
      }

      case GroupTypes.CLEAR_MOIM_ICON: {
        draft.moimIcon = undefined;
        break;
      }
    }
  });
