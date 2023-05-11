import { AllActions } from "app/actions";
import { GroupTypes, HubAppStateTypes } from "app/actions/types";
export interface IHubPageState {
  isMyGroupLoading: boolean;
  isDomainValidationLoading: boolean;
  isIconUploadLoading: boolean;
  isCreateMoimLoading: boolean;
}

export const INITIAL_STATE: IHubPageState = {
  isMyGroupLoading: false,
  isDomainValidationLoading: false,
  isIconUploadLoading: false,
  isCreateMoimLoading: false,
};

export function reducer(
  state = INITIAL_STATE,
  action: AllActions,
): IHubPageState {
  switch (action.type) {
    case HubAppStateTypes.START_FETCHING_MY_GROUP:
      return {
        ...state,
        isMyGroupLoading: true,
      };

    case HubAppStateTypes.SUCCEEDED_FETCHING_MY_GROUP:
    case HubAppStateTypes.FAILED_FETCHING_MY_GROUP:
      return {
        ...state,
        isMyGroupLoading: false,
      };

    case GroupTypes.START_VALIDATE_GROUP_DOMAIN: {
      return {
        ...state,
        isDomainValidationLoading: true,
      };
    }
    case GroupTypes.VALIDATE_GROUP_DOMAIN: {
      return {
        ...state,
        isDomainValidationLoading: false,
      };
    }
    case GroupTypes.START_CREATE_GROUP: {
      return {
        ...state,
        isCreateMoimLoading: true,
      };
    }
    case GroupTypes.SUCCEEDED_CREATE_GROUP:
    case GroupTypes.FAILED_CREATE_GROUP: {
      return {
        ...state,
        isCreateMoimLoading: false,
      };
    }

    case HubAppStateTypes.START_FILE_UPLOAD: {
      return {
        ...state,
        isIconUploadLoading: true,
      };
    }
    case HubAppStateTypes.SUCCEEDED_FILE_UPLOAD:
    case HubAppStateTypes.FAILED_FILE_UPLOAD: {
      return {
        ...state,
        isIconUploadLoading: false,
      };
    }

    default: {
      return state;
    }
  }
}
