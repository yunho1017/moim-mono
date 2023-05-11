import { ActionUnion } from "./helpers";
import { SecondaryViewTypes } from "app/actions/types";
import * as SecondaryViewReducer from "app/modules/secondaryView/reducer";

function createAction<T extends { type: SecondaryViewTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openNativeSecondaryView: () =>
    createAction({
      type: SecondaryViewTypes.NATIVE_OPEN,
    }),
  closeNativeSecondaryView: () =>
    createAction({
      type: SecondaryViewTypes.NATIVE_CLOSE,
    }),

  openPluginSecondaryView: (
    payload: Omit<Moim.Blockit.IPushRightPanelActionResponse, "actionType">,
    botId?: Moim.Id,
  ) =>
    createAction({
      type: SecondaryViewTypes.PLUGIN_OPEN,
      payload: {
        botId,
        ...payload,
      },
    }),
  closePluginSecondaryView: (
    payload?: Omit<Moim.Blockit.ICloseRightPanelActionResponse, "actionType">,
  ) =>
    createAction({
      type: SecondaryViewTypes.PLUGIN_CLOSE,
      payload,
    }),
  backPluginSecondaryView: () =>
    createAction({
      type: SecondaryViewTypes.PLUGIN_BACK,
    }),

  openNativeSecondaryViewFromProfile: (payload: boolean) =>
    createAction({
      type: SecondaryViewTypes.NATIVE_OPEN_FROM_PROFILE,
      payload,
    }),

  restorePluginStore: (storedState: SecondaryViewReducer.IState) =>
    createAction({
      type: SecondaryViewTypes.PLUGIN_REDIRECTION_RESTORE,
      payload: { storedState },
    }),
  setPluginContentRef: (ref: HTMLElement | null) =>
    createAction({
      type: SecondaryViewTypes.SET_PLUGIN_CONTENT_REF,
      payload: { ref },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
