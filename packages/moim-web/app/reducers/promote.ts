import produce from "immer";
import { AllActions } from "app/actions";
import { PromoteTypes } from "app/actions/types";

export interface IReduxState {
  appDownloadPromote: {
    banner: Moim.Promote.IAppDownload | null;
    bottomSheet: Moim.Promote.IAppDownload | null;
  };
  activePopupBanner: Moim.Promote.IPopupBanner | null;
}

export const INITIAL_STATE: IReduxState = {
  appDownloadPromote: {
    banner:
      // eslint-disable-next-line no-underscore-dangle
      window.__bootData?.data.appPromotions?.find(
        (promote: any) =>
          promote.type === "banner" && promote.status === "active",
      ) ?? null,
    bottomSheet:
      // eslint-disable-next-line no-underscore-dangle
      window.__bootData?.data.appPromotions?.find(
        (promote: any) =>
          promote.type === "bottomSheet" && promote.status === "active",
      ) ?? null,
  },
  activePopupBanner: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case PromoteTypes.SET_APP_DOWNLOAD_PROMOTIONS: {
        draft.appDownloadPromote.banner =
          action.payload.promotions.find(
            promote => promote.type === "banner" && promote.status === "active",
          ) ?? null;
        draft.appDownloadPromote.bottomSheet =
          action.payload.promotions.find(
            promote =>
              promote.type === "bottomSheet" && promote.status === "active",
          ) ?? null;

        break;
      }
      case PromoteTypes.SET_POPUP_BANNER: {
        draft.activePopupBanner = action.payload.popupBanner;

        break;
      }
    }
  });
}
