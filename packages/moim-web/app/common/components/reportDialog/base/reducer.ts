// vendor
import { combineReducers } from "redux";

// Reducers
import * as User from "../presets/user/reducer";
import * as Post from "../presets/post/reducer";
export interface IGlobalReportDialogState {
  post: Post.IPostGlobalReportDialogState;
  user: User.IUserGlobalReportDialogState;
}

export const INITIAL_STATE: IGlobalReportDialogState = {
  post: Post.INITIAL_STATE,
  user: User.INITIAL_STATE,
};

export const reducer = combineReducers({
  post: Post.reducer,
  user: User.reducer,
});
