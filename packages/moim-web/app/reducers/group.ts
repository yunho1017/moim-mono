// helper
import { AllActions } from "app/actions";
import produce from "immer";
import uniq from "lodash/uniq";
import { GroupTypes, MeTypes, UserTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";
import {
  generateDefaultPalette,
  generateDefaultElementTheme,
} from "app/theme/constants/palette";

const DEFAULT_THEME: Moim.Group.ITheme = {
  element: generateDefaultElementTheme(),
  palette: generateDefaultPalette(),
  darkPalette: generateDefaultPalette("DARK"),
};

export const INITIAL_STATE: Moim.Group.IGroupData = {
  status: null,
  members: { data: [], paging: {} },
  getMembersLoading: false,
  myJoinedMoims: { data: [], paging: {} },
  isGetMyJoinedMoimsLoading: false,
  isCreateMoimLoading: false,
  isCreateSubMoimLoading: false,
  moimRename: {
    id: undefined,
    loading: false,
    error: undefined,
  },
  moimSetDescription: {
    id: undefined,
    loading: false,
    error: undefined,
  },
  moimUpdateIcon: {
    id: undefined,
    loading: false,
    error: undefined,
  },
  theme: window.__bootData?.data?.theme ?? DEFAULT_THEME,
  parentTheme: undefined,
  cover: null,
  getMoimCoverLoading: false,
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case GroupTypes.FETCHED_GROUP_STATUS: {
        draft.status = action.payload.status;
        break;
      }

      case UserTypes.START_GET_USERS: {
        draft.getMembersLoading = true;
        break;
      }

      case UserTypes.SUCCEED_GET_USERS: {
        draft.members = mergePaginatedResponse(
          draft.members,
          action.payload.users,
        );
        draft.getMembersLoading = false;
        break;
      }

      case UserTypes.FAILED_GET_USERS: {
        draft.getMembersLoading = false;
        break;
      }

      case MeTypes.START_GET_MY_JOINED_MOIMS: {
        draft.isGetMyJoinedMoimsLoading = true;
        break;
      }

      case MeTypes.SUCCEEDED_GET_MY_JOINED_MOIMS: {
        draft.myJoinedMoims = action.payload.myJoinedMoimList;
        draft.isGetMyJoinedMoimsLoading = false;
        break;
      }

      case MeTypes.FAILED_GET_MY_JOINED_MOIMS: {
        draft.isGetMyJoinedMoimsLoading = false;
        break;
      }

      case MeTypes.ADD_MY_JOINED_MOIM: {
        draft.myJoinedMoims.data = uniq(
          draft.myJoinedMoims.data.concat([action.payload.moimId]),
        );
        break;
      }

      case GroupTypes.START_RENAME_MOIM: {
        draft.moimRename.id = action.payload.id;
        draft.moimRename.loading = true;
        draft.moimRename.error = undefined;
        break;
      }

      case GroupTypes.SUCCEED_RENAME_MOIM: {
        draft.moimRename.id = action.payload.id;
        draft.moimRename.loading = false;
        break;
      }

      case GroupTypes.FAILED_RENAME_MOIM: {
        draft.moimRename.id = action.payload.id;
        draft.moimRename.error = action.payload.error;
        draft.moimRename.loading = false;
        break;
      }

      case GroupTypes.START_SET_DESCRIPTION_MOIM: {
        draft.moimSetDescription.id = action.payload.id;
        draft.moimSetDescription.loading = true;
        draft.moimSetDescription.error = undefined;
        break;
      }

      case GroupTypes.SUCCEED_SET_DESCRIPTION_MOIM: {
        draft.moimSetDescription.id = action.payload.id;
        draft.moimSetDescription.loading = false;
        break;
      }

      case GroupTypes.FAILED_SET_DESCRIPTION_MOIM: {
        draft.moimSetDescription.id = action.payload.id;
        draft.moimSetDescription.error = action.payload.error;
        draft.moimSetDescription.loading = false;
        break;
      }

      case GroupTypes.START_UPDATE_GROUP_ICON: {
        draft.moimUpdateIcon.id = action.payload.id;
        draft.moimUpdateIcon.loading = true;
        draft.moimUpdateIcon.error = undefined;
        break;
      }

      case GroupTypes.SUCCEED_UPDATE_GROUP_ICON: {
        draft.moimUpdateIcon.loading = false;
        break;
      }

      case GroupTypes.FAILED_UPDATE_GROUP_ICON: {
        draft.moimUpdateIcon.loading = false;
        draft.moimUpdateIcon.error = action.payload.error;
        break;
      }

      case GroupTypes.SUCCEED_GET_MOIM_THEME: {
        draft.theme = action.payload.data;
        break;
      }

      case GroupTypes.SUCCEED_GET_PARENT_THEME: {
        draft.parentTheme = action.payload.data;
        break;
      }

      case GroupTypes.START_CREATE_GROUP: {
        return {
          ...state,
          isCreateMoimLoading: true,
        };
      }
      case GroupTypes.SUCCEEDED_CREATE_GROUP:
      case GroupTypes.FAILED_CREATE_GROUP: {
        return {
          ...state,
          isCreateMoimLoading: false,
        };
      }

      case GroupTypes.START_CREATE_SUB_GROUP: {
        return {
          ...state,
          isCreateSubMoimLoading: true,
        };
      }
      case GroupTypes.SUCCEEDED_CREATE_SUB_GROUP:
      case GroupTypes.FAILED_CREATE_SUB_GROUP: {
        return {
          ...state,
          isCreateSubMoimLoading: false,
        };
      }

      case GroupTypes.START_GET_MOIM_COVER: {
        draft.getMoimCoverLoading = true;
        break;
      }

      case GroupTypes.SUCCEED_GET_MOIM_COVER: {
        draft.cover = action.payload.data;
        draft.getMoimCoverLoading = false;
        break;
      }

      case GroupTypes.FAILED_GET_MOIM_COVER: {
        draft.getMoimCoverLoading = false;
        break;
      }
    }
  });
