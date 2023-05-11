import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, PostTemplateTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Forum.IIPostTemplateNormalizedData = {};

export function reducer(
  state: Moim.Forum.IIPostTemplateNormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.postTemplates) {
          Object.entries(action.payload.postTemplates).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      case PostTemplateTypes.SUCCEED_DELETE_POST_TEAMPLATE: {
        delete draft[action.payload.templateId];
        break;
      }
    }
  });
}
