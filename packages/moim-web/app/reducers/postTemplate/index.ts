import { produce } from "immer";
import { PostTemplateTypes } from "app/actions/types";
import { AllActions } from "app/actions";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";

export interface IPostTemplateState {
  postTemplates: Moim.IPaginatedListResponse<Moim.Id>;
  postPostTemplateLoading: boolean;
  getPostTemplatesLoading: boolean;
  updatePostTemplateLoading: boolean;
  deletePostTemplateLoading: boolean;
}

export const INITIAL_STATE: IPostTemplateState = {
  postTemplates: {
    data: [],
    paging: {},
  },
  postPostTemplateLoading: false,
  getPostTemplatesLoading: true,
  updatePostTemplateLoading: false,
  deletePostTemplateLoading: false,
};
export function reducer(
  state: IPostTemplateState = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case PostTemplateTypes.START_POST_POST_TEAMPLATE: {
        draft.postPostTemplateLoading = true;
        break;
      }

      case PostTemplateTypes.SUCCEED_POST_POST_TEAMPLATE: {
        const { templateId } = action.payload;
        draft.postPostTemplateLoading = false;

        draft.postTemplates.data = [templateId, ...draft.postTemplates.data];
        break;
      }

      case PostTemplateTypes.FAILED_POST_POST_TEAMPLATE: {
        draft.postPostTemplateLoading = false;
        break;
      }

      case PostTemplateTypes.START_GET_POST_TEAMPLATE_LIST: {
        draft.getPostTemplatesLoading = true;
        break;
      }

      case PostTemplateTypes.SUCCEED_GET_POST_TEAMPLATE_LIST: {
        const { templates } = action.payload;
        draft.getPostTemplatesLoading = false;

        draft.postTemplates.data =
          mergeArrayUniq(draft.postTemplates.data, templates.data) ?? [];

        draft.postTemplates.paging = templates.paging;
        break;
      }

      case PostTemplateTypes.FAILED_GET_POST_TEAMPLATE_LIST: {
        draft.getPostTemplatesLoading = false;
        break;
      }

      case PostTemplateTypes.START_UPDATE_POST_TEAMPLATE: {
        draft.updatePostTemplateLoading = true;
        break;
      }

      case PostTemplateTypes.SUCCEED_UPDATE_POST_TEAMPLATE: {
        draft.updatePostTemplateLoading = false;
        break;
      }

      case PostTemplateTypes.FAILED_UPDATE_POST_TEAMPLATE: {
        draft.updatePostTemplateLoading = false;
        break;
      }

      case PostTemplateTypes.START_DELETE_POST_TEAMPLATE: {
        draft.deletePostTemplateLoading = true;
        break;
      }

      case PostTemplateTypes.SUCCEED_DELETE_POST_TEAMPLATE: {
        const { templateId } = action.payload;
        draft.deletePostTemplateLoading = false;

        draft.postTemplates.data = draft.postTemplates.data.filter(
          template => template !== templateId,
        );

        break;
      }

      case PostTemplateTypes.FAILED_DELETE_POST_TEAMPLATE: {
        draft.deletePostTemplateLoading = false;
        break;
      }
    }
  });
}
