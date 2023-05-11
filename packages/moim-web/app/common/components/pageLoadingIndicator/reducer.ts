import { AllActions } from "app/actions";
import { PageLoadingIndicatorTypes } from "./action";

export interface IState {
  visible: boolean;
}

export const INITIAL_STATE: IState = {
  visible: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions): IState {
  switch (action.type) {
    case PageLoadingIndicatorTypes.SHOW: {
      return {
        visible: true,
      };
    }

    case PageLoadingIndicatorTypes.DISMISS: {
      return {
        visible: false,
      };
    }

    default: {
      return state;
    }
  }
}
