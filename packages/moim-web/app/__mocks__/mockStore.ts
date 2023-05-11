import thunk, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import createMockStore, { MockStore } from "redux-mock-store";
import { AllActions, MoimActions } from "app/actions";
import { IGroupAppState } from "app/rootReducer";
import { apiSelector } from "common/api/helpers";
import moimDefaultApi from "common/api";
import { initialState, IAppState } from "../rootReducer";
import deepMerge from "common/helpers/merge/deepMerge";

export interface IThunkMockState extends MockStore<IAppState, AllActions> {
  dispatch: ThunkDispatch<
    IAppState,
    {
      apiSelector: typeof apiSelector;
      defaultApi: typeof moimDefaultApi;
    },
    AllActions
  >;
}

export const generateMockStore = (
  state?: Partial<IAppState>,
): IThunkMockState => {
  const mockStore = createMockStore<IAppState>([
    (thunk.withExtraArgument({
      apiSelector,
      defaultApi: moimDefaultApi,
    }) as unknown) as ThunkMiddleware<IGroupAppState, MoimActions>,
  ]);
  const store = mockStore(deepMerge(initialState, state));
  store.clearActions();
  return store;
};
