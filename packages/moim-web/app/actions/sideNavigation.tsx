import { ActionUnion } from "./helpers";
import { SideNavigationTypes } from "app/actions/types";

function createAction<T extends { type: SideNavigationTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  expandSideNavigation: () =>
    createAction({
      type: SideNavigationTypes.EXPAND_SIDE_NAVIGATION,
    }),

  collapseSideNavigation: () =>
    createAction({
      type: SideNavigationTypes.COLLAPSE_SIDE_NAVIGATION,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
