import { AllActions } from "app/actions/index";
import produce from "immer";
import { CampaignProjectTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Campaign.IReduxState = {
  campaigns: {
    data: [],
    paging: {},
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CampaignProjectTypes.SUCCEED_GET_ALL_CAMPAIGNS: {
        draft.campaigns = action.payload;
        break;
      }

      case CampaignProjectTypes.SUCCEED_FETCH_CAMPAIGN: {
        if (!draft.campaigns.data.includes(action.payload.campaignId)) {
          draft.campaigns.data = draft.campaigns.data.concat(
            action.payload.campaignId,
          );
        }

        break;
      }
    }
  });
}
