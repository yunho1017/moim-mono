import axios, { CancelToken } from "axios";
import { push } from "connected-react-router";
import { MeTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult, ThunkResult } from "app/store";
import MeAPI from "common/api/me";
import { ActionCreators as AuthActionCreators } from "common/helpers/authentication/actions";
import { groupListNormalizer } from "app/models/group";
import { loadEntities } from "app/actions/entity";
import { errorParseData } from "common/helpers/APIErrorParser";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { MoimURL } from "common/helpers/url";
import SessionHandler from "app/common/helpers/sessionHandler";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import { CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP } from "app/common/constants/keys";
import { removeMoimTokenCookie } from "common/helpers/authentication";

function createAction<T extends { type: MeTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openEditMyProfile: () =>
    createAction({
      type: MeTypes.OPEN_EDIT_MY_PROFILE,
    }),
  closeEditMyProfile: () =>
    createAction({
      type: MeTypes.CLOSE_EDIT_MY_PROFILE,
    }),

  startChangeMyProfile: () =>
    createAction({
      type: MeTypes.START_CHANGE_MY_PROFILE,
    }),
  succeededChangeMyProfile: (newUserData: Moim.User.IUser) =>
    createAction({
      type: MeTypes.SUCCEEDED_CHANGE_MY_PROFILE,
      payload: {
        newUserData,
      },
    }),
  failedChangeMyProfile: () =>
    createAction({
      type: MeTypes.FAILED_CHANGE_MY_PROFILE,
    }),

  startUpdateAvatar: () =>
    createAction({
      type: MeTypes.START_UPDATE_AVATAR,
    }),
  succeededUpdateAvatar: () =>
    createAction({
      type: MeTypes.SUCCEEDED_UPDATE_AVATAR,
    }),
  failedUpdateAvatar: () =>
    createAction({
      type: MeTypes.FAILED_UPDATE_AVATAR,
    }),

  startGetMyJoinedMoim: () =>
    createAction({
      type: MeTypes.START_GET_MY_JOINED_MOIMS,
    }),
  succeededGetMyJoinedMoim: (
    myJoinedMoimList: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: MeTypes.SUCCEEDED_GET_MY_JOINED_MOIMS,
      payload: {
        myJoinedMoimList,
      },
    }),
  failedGetMyJoinedMoim: () =>
    createAction({
      type: MeTypes.FAILED_GET_MY_JOINED_MOIMS,
    }),

  addMyJoinedMoim: (moimId: Moim.Id) =>
    createAction({
      type: MeTypes.ADD_MY_JOINED_MOIM,
      payload: {
        moimId,
      },
    }),

  startLeaveMoim: () => createAction({ type: MeTypes.START_LEAVE_MOIM }),
  succeedLeaveMoim: () => createAction({ type: MeTypes.SUCCEED_LEAVE_MOIM }),
  failedLeaveMoim: (showAlertDialog?: boolean, failedMessage?: string) =>
    createAction({
      type: MeTypes.FAILED_LEAVE_MOIM,
      payload: { showAlertDialog, failedMessage },
    }),

  openFailedLeaveMoimAlert: (failedMessage?: string) =>
    createAction({
      type: MeTypes.OPEN_FAILED_LEAVE_MOIM_ALERT,
      payload: { failedMessage },
    }),
  closeFailedLeaveMoimAlert: () =>
    createAction({ type: MeTypes.CLOSE_FAILED_LEAVE_MOIM_ALERT }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function openProfileEditor(): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.openEditMyProfile());
  };
}

export function closeProfileEditor(): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.closeEditMyProfile());
  };
}

export function updateMyProfile(
  profile: Moim.User.IUpdatableInfo,
  cancelToken: CancelToken,
  groupId?: string,
): ThunkPromiseResult<{ success: boolean; error?: Moim.IErrorResponse }> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startChangeMyProfile());
      const result = (
        await apiSelector(getState(), dispatch, groupId).me.updateProfile(
          profile,
          cancelToken,
        )
      ).data;
      dispatch(ActionCreators.succeededChangeMyProfile(result));
      return { success: true };
    } catch (err) {
      dispatch(ActionCreators.failedChangeMyProfile());
      if (axios.isAxiosError(err)) {
        return { success: false, error: errorParseData(err) };
      }
      return { success: false };
    }
  };
}

export function updateCropAvatar(
  ...params: Parameters<typeof MeAPI.prototype.updateAvatarCrop>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    await apiSelector(getState(), dispatch).me.updateAvatarCrop(...params);
  };
}

export function getMyJoinedMoims(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetMyJoinedMoim());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).me.getJoinedGroups();
      const normalized = groupListNormalizer({
        ...result,
        data: result.data.reduce(
          (accResult, currentDatum) => [...accResult, currentDatum.group],
          [],
        ),
      });

      dispatch(loadEntities(normalized.entities));
      dispatch(ActionCreators.succeededGetMyJoinedMoim(normalized.result));
    } catch {
      dispatch(ActionCreators.failedGetMyJoinedMoim());
    }
  };
}

export function leaveMoim(
  successMessage: string,
  isChildMoim: boolean,
  failedAlertAsSnackBar?: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startLeaveMoim());
    try {
      const currentGroupId = getState().app.currentGroupId;
      await apiSelector(getState(), dispatch).me.leave();
      dispatch(ActionCreators.succeedLeaveMoim());

      dispatch(
        AuthActionCreators.currentUserChanged({
          user: null,
        }),
      );
      dispatch(AuthActionCreators.signOut());

      ExpiredInMemoryHelper.remove(CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP);
      if (!isChildMoim && currentGroupId) {
        removeMoimTokenCookie(currentGroupId);
      }

      if (successMessage) {
        SessionHandler.set("INITIAL_TOAST_MESSAGE", successMessage);
      }
      dispatch(push(new MoimURL.MoimAppHome().toString()));
      setTimeout(() => {
        location.reload();
      }, 100);
    } catch (err) {
      dispatch(ActionCreators.failedLeaveMoim(!failedAlertAsSnackBar));
      if (failedAlertAsSnackBar) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: "Failed To Leave",
          }),
        );
      }
    }
  };
}

export function getSearchHistories(
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<
  Moim.User.ISearchHistory
> | null> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).me.getSearchHistories(cancelToken);
      return result;
    } catch {
      return null;
    }
  };
}
export function deleteSearchHistories(
  payload: { isDeleteAll?: boolean; query?: string },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      await apiSelector(getState(), dispatch).me.deleteSearchHistories(
        payload,
        cancelToken,
      );
      // eslint-disable-next-line no-empty
    } catch {}
  };
}
