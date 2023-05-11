import { IAppState } from "app/rootReducer";

export const selectIsExpand = (state: IAppState) =>
  state.sideNavigation.isExpand;
