import { ActionUnion } from "app/actions/helpers";
import { PromoteTypes } from "./types";

function createAction<T extends { type: PromoteTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  setAppDownloadPromotions: (promotions: Moim.Promote.IAppDownload[]) =>
    createAction({
      type: PromoteTypes.SET_APP_DOWNLOAD_PROMOTIONS,
      payload: {
        promotions,
      },
    }),
  setActivePopupBanner: (popupBanner: Moim.Promote.IPopupBanner) =>
    createAction({
      type: PromoteTypes.SET_POPUP_BANNER,
      payload: {
        popupBanner,
      },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
