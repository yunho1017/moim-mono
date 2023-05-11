import { PopupBannerTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";

function createAction<T extends { type: PopupBannerTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: (payload: { banner: Moim.Promote.IPopupBanner }) =>
    createAction({
      type: PopupBannerTypes.OPEN,
      payload,
    }),

  close: () =>
    createAction({
      type: PopupBannerTypes.CLOSE,
    }),

  clear: () =>
    createAction({
      type: PopupBannerTypes.CLEAR,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function clickPopupBanner(
  bannerId: string,
  contentId: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    await apiSelector(getState(), dispatch).group.clickPopupBanner(
      bannerId,
      contentId,
    );
  };
}
