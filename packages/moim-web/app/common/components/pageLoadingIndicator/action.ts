import { ActionUnion } from "app/actions/helpers";
import { ThunkResult } from "app/store";

export enum PageLoadingIndicatorTypes {
  SHOW = "PAGE_LOADING_INDICATOR.SHOW",
  DISMISS = "PAGE_LOADING_INDICATOR.DISMISS",
}

function createAction<T extends { type: PageLoadingIndicatorTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  show: () => createAction({ type: PageLoadingIndicatorTypes.SHOW }),
  dismiss: () => createAction({ type: PageLoadingIndicatorTypes.DISMISS }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function showPageLoadingIndicator(): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.show());
  };
}

export function dismissPageLoadingIndicator(): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.dismiss());
  };
}
