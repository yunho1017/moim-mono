import { push } from "connected-react-router";
import * as qs from "query-string";
import popupWindow from "app/common/helpers/popupWindow";
import { postMessageParser } from "common/components/postMessageReceiver/helper";
import { AppDispatch } from "app/store";
import { isMobileAgent } from "common/helpers/browserDetect";
import {
  actionDispatchRoute,
  doBlockAction,
  fetchReferenceBlock,
  storeRedirectBlocks,
} from "app/actions/referenceBlock";

const STATIC_MEETING_BOT_ID = "moim-meeting";

export default async function openCallbackWindow(
  url: string,
  botId: Moim.Id,
  dispatch: AppDispatch,
  option?: {
    width?: number;
    height?: number;
    onClose?: Moim.Blockit.IOnCloseActionBehavior;
  },
) {
  return new Promise(resolve => {
    const newURL = (() => {
      const currentParams = qs.parse(location.search);
      const nl = new URL(url);
      if (currentParams.pr_tag && !nl.searchParams.has("pr_tag")) {
        nl.searchParams.append("pr_tag", currentParams.pr_tag as string);
      }

      return nl.toString();
    })();

    if (isMobileAgent() && botId.toLowerCase() !== STATIC_MEETING_BOT_ID) {
      const nl = new URL(newURL);
      if (nl.hostname !== location.hostname) {
        dispatch(storeRedirectBlocks());
        location.href = newURL;
      } else {
        dispatch(
          push({
            pathname: nl.pathname,
            search: nl.search,
          }),
        );
      }
    } else {
      const windowInst = popupWindow({
        id: url,
        width: option?.width ?? 520,
        height: option?.height ?? 710,
        disableCanPassLoading: true,
      });
      const handlePostMessage = (event: MessageEvent) => {
        const payload: {
          type: string; // crypto-popup-closed | plugin-callback
          data: { [key: string]: any };
        } | null = postMessageParser(event);
        if (payload && payload.type === "crypto-popup-closed") {
          resolve(null);
          return;
        }
        if (payload && payload.type === "plugin-callback" && payload.data) {
          const {
            actionType,
            payload: callbackPayload,
            ...rest
          } = payload.data;

          if (actionType && callbackPayload) {
            const data = JSON.parse(callbackPayload);
            const params = data.action.data;
            switch (actionType) {
              case "action": {
                dispatch(
                  doBlockAction({
                    botId,
                    data: {
                      ...params,
                      params: {
                        ...params.params,
                        ...rest,
                      },
                    },
                  }),
                );
                break;
              }

              case "replace": {
                dispatch(
                  fetchReferenceBlock({
                    botId,
                    data: {
                      ...params,
                      params: {
                        ...params.params,
                        ...rest,
                      },
                    },
                  }),
                );
                break;
              }
            }
          } else if (payload.data.data) {
            const pluginActions: Moim.Blockit.IBlockActionResponse[] =
              JSON.parse(payload.data.data) ?? [];
            pluginActions.forEach(res => {
              dispatch(actionDispatchRoute(res, botId));
            });
          }

          if (payload.data.status && payload.data.status === "close") {
            resolve(null);
            return;
          }
        }
      };

      window.addEventListener("message", handlePostMessage);
      windowInst.open();
      windowInst.setUrl(newURL);
      windowInst.setClose(() => {
        if (option?.onClose) {
          dispatch(
            doBlockAction({
              botId,
              data: {
                ...option.onClose,
              },
            }),
          );
        }
        resolve(null);
        window.removeEventListener("message", handlePostMessage);
      });
    }
  });
}
