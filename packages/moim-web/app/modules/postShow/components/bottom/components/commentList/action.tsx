import { ForumCommentPageTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<T extends { type: ForumCommentPageTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  resetJustAdded: () =>
    createAction({
      type: ForumCommentPageTypes.RESET_JUST_ADDED,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
