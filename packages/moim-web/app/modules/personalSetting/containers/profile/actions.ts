import { CancelToken } from "axios";
import { ThunkResult } from "app/store";
import { updateMyProfile } from "app/actions/me";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";

export function updateMyProfileWithHandlingResult(
  profile: Moim.User.IUpdatableInfo,
  cancelToken: CancelToken,
  onSuccess?: () => void,
  onFailure?: () => void,
): ThunkResult {
  return async dispatch => {
    const result = await dispatch(updateMyProfile(profile, cancelToken));

    if (result.success) {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          textKey: "save_success_toast_message",
        }),
      );
      onSuccess?.();
    } else {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: "save_failure_toast_message",
        }),
      );
      onFailure?.();
    }
  };
}
