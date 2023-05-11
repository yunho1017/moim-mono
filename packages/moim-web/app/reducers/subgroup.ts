import { produce } from "immer";

import { AllActions } from "app/actions";
import { TagTypes, GroupTypes } from "app/actions/types";
import mergePaginatedResponse from "app/common/helpers/mergePaginatedResponse";

export const INITIAL_STATE: Moim.SubGroup.ISubGroupData = {
  currentTags: null,
  tags: { data: [], paging: {} },
  subgroups: { data: [], paging: {} },
  joinedSubMoims: { data: [], paging: {} },
  recommendMoims: { data: [], paging: {} },

  isSubGroupsLoading: true,
  joinedSubGroupsLoading: true,
  isRecommendMoimsLoading: true,
};

export function reducer(
  state: Moim.SubGroup.ISubGroupData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case TagTypes.CLEAR_SUBGROUPS: {
        draft.subgroups = { data: [], paging: {} };
        break;
      }

      case TagTypes.SUCCEEDED_GET_TAGS: {
        draft.tags = mergePaginatedResponse(draft.tags, action.payload.tags);
        break;
      }
      case TagTypes.SUCCEEDED_CREATE_TAG: {
        draft.tags.data.push(action.payload.tag);
        break;
      }

      case TagTypes.START_GET_SUBGROUPS_FROM_TAG:
      case TagTypes.START_GET_SUBGROUPS_FROM_TAGS: {
        draft.isSubGroupsLoading = true;
        break;
      }

      case TagTypes.FAILED_GET_SUBGROUPS_FROM_TAG:
      case TagTypes.FAILED_GET_SUBGROUPS_FROM_TAGS: {
        draft.isSubGroupsLoading = false;
        break;
      }

      case TagTypes.SUCCEEDED_GET_SUBGROUPS_FROM_TAG: {
        draft.isSubGroupsLoading = false;
        draft.subgroups = mergePaginatedResponse(
          draft.subgroups,
          action.payload.subgroups,
        );
        break;
      }

      case TagTypes.SUCCEEDED_GET_SUBGROUPS_FROM_TAGS: {
        draft.isSubGroupsLoading = false;
        draft.subgroups = mergePaginatedResponse(
          draft.subgroups,
          action.payload.subgroups,
        );
        break;
      }

      case GroupTypes.START_GET_JOINED_SUB_MOIMS: {
        draft.joinedSubGroupsLoading = true;
        break;
      }

      case GroupTypes.SUCCEED_GET_JOINED_SUB_MOIMS: {
        draft.joinedSubGroupsLoading = false;
        draft.joinedSubMoims = mergePaginatedResponse(
          draft.joinedSubMoims,
          action.payload.subMoims,
        );
        break;
      }

      case GroupTypes.FAILED_GET_JOINED_SUB_MOIMS: {
        draft.joinedSubGroupsLoading = false;
        break;
      }

      case GroupTypes.START_GET_RECOMMEND_MOIMS: {
        draft.isRecommendMoimsLoading = true;
        break;
      }

      case GroupTypes.FAILED_GET_RECOMMEND_MOIMS: {
        draft.isRecommendMoimsLoading = false;
        break;
      }

      case GroupTypes.SUCCEED_GET_RECOMMEND_MOIMS: {
        draft.isRecommendMoimsLoading = false;
        if (action.payload.isLoadMore) {
          draft.recommendMoims = mergePaginatedResponse(
            draft.recommendMoims,
            action.payload.moims,
          );
        } else {
          draft.recommendMoims = action.payload.moims;
        }
        break;
      }
    }
  });
}
