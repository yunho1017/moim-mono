import { combineReducers } from "redux";
import * as AppStateReducer from "./app";

export interface IHubAppStore {
  app: AppStateReducer.IHubAppState;
}

export const initialState: IHubAppStore = {
  app: AppStateReducer.INITIAL_STATE,
};

export const hubReducers = combineReducers<IHubAppStore>({
  app: AppStateReducer.reducer,
});
