import { createSelector } from "reselect";
import { MoimAPI } from ".";
import { IAppState } from "app/rootReducer";
import { AppDispatch } from "../../store";

export const apiSelector = createSelector(
  (state: IAppState, _: AppDispatch, groupId?: string) =>
    groupId ?? state.app.currentGroupId,
  (_: IAppState, dispatch: AppDispatch) => dispatch,
  (groupId, dispatch) => {
    const api = new MoimAPI(dispatch, groupId);
    return api;
  },
);
