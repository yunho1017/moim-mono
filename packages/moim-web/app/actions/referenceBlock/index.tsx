import * as qs from "query-string";
import { replace as replaceAction } from "connected-react-router";
import * as queryString from "query-string";
import { ReferenceBlockTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { ActionCreators as SecondaryViewActionCreators } from "../secondaryView";
import { ActionCreators as SnackbarActionCreators } from "../snackbar";
import ApplicationAPI, {
  IReplaceAPIData,
  IReplaceAPIParams,
  IActionAPIParams,
} from "common/api/application";
import { ActionCreators as ProfileActionCreators } from "app/actions/profile";
import {
  setStoreRedirectBlocks,
  setStoreRedirectRequest,
  getStoreRedirectBlocks,
  getStoreRedirectLastSeen,
  setStoreRedirectLastSeen,
  removeStoreRedirectRequest,
  removeStoreRedirectLastSeen,
  removeStoreRedirectBlocks,
  removeStoreRedirectMintRequest,
} from "./cookieHelper";
import openCallbackWindow from "common/helpers/pluginWindowCallback";
import * as BlockitModalReducer from "common/components/blockitModal/reducer";
import * as SecondaryViewReducer from "app/modules/secondaryView/reducer";
import { MoimURL } from "app/common/helpers/url";

function createAction<T extends { type: ReferenceBlockTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchReferenceBlock: (payload: IReplaceAPIParams) =>
    createAction({
      type: ReferenceBlockTypes.START_FETCH_REFERENCE_BLOCK,
      payload,
    }),
  succeedFetchReferenceBlock: () =>
    createAction({ type: ReferenceBlockTypes.SUCCEED_FETCH_REFERENCE_BLOCK }),
  failedFetchReferenceBlock: (payload: IReplaceAPIParams) =>
    createAction({
      type: ReferenceBlockTypes.FAILED_FETCH_REFERENCE_BLOCK,
      payload,
    }),

  startClickReferenceAction: () =>
    createAction({
      type: ReferenceBlockTypes.START_CLICK_REFERENCE_ACTION,
    }),
  succeedClickReferenceAction: () =>
    createAction({ type: ReferenceBlockTypes.SUCCEED_CLICK_REFERENCE_ACTION }),
  failedClickReferenceAction: () =>
    createAction({
      type: ReferenceBlockTypes.FAILED_CLICK_REFERENCE_ACTION,
    }),

  startFetchMoreListBlocks: (payload: IActionAPIParams) =>
    createAction({
      type: ReferenceBlockTypes.START_FETCH_MORE_LIST_BLOCKS,
      payload,
    }),
  succeedFetchMoreListBlocks: () =>
    createAction({ type: ReferenceBlockTypes.SUCCEED_FETCH_MORE_LIST_BLOCKS }),
  failedFetchMoreListBlocks: (payload: IActionAPIParams) =>
    createAction({
      type: ReferenceBlockTypes.FAILED_FETCH_MORE_LIST_BLOCKS,
      payload,
    }),

  appendListBlocks: (
    append: Omit<Moim.Blockit.IAppendActionResponse, "actionType">,
  ) =>
    createAction({
      type: ReferenceBlockTypes.APPEND_LIST_BLOCKS,
      payload: {
        append,
      },
    }),
  updateListBlock: (
    update: Omit<Moim.Blockit.IUpdateActionResponse, "actionType">,
  ) =>
    createAction({
      type: ReferenceBlockTypes.UPDATE_LIST_BLOCK,
      payload: { update },
    }),

  replaceReferenceBlock: (
    replace: Omit<Moim.Blockit.IReplaceActionResponse, "actionType">,
  ) =>
    createAction({
      type: ReferenceBlockTypes.REPLACE_REFERENCE_BLOCK,
      payload: {
        replace,
      },
    }),
  openBlockitModal: (
    payload: Omit<Moim.Blockit.IOpenModalActionResponse, "actionType">,
    botId?: Moim.Id,
  ) =>
    createAction({
      type: ReferenceBlockTypes.OPEN_BLOCKIT_MODAL,
      payload: {
        botId,
        ...payload,
      },
    }),
  closeBlockitModal: (
    payload?: Omit<Moim.Blockit.ICloseModalActionResponse, "actionType">,
  ) => createAction({ type: ReferenceBlockTypes.CLOSE_BLOCKIT_MODAL, payload }),
  showToast: (
    payload: Omit<Moim.Blockit.IShowToastActionResponse, "actionType">,
  ) => createAction({ type: ReferenceBlockTypes.SHOW_TOAST, payload }),

  storeRedirectBlocks: () =>
    createAction({ type: ReferenceBlockTypes.STORE_REDIRECT_BLOCKS }),

  setBlockitModalRef: (ref: HTMLElement | null) =>
    createAction({
      type: ReferenceBlockTypes.SET_BLOCKIT_MODAL_REF,
      payload: { ref },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function actionDispatchRoute(
  action: Moim.Blockit.IBlockActionResponse,
  botId: Moim.Id,
  isInPluginPanel?: boolean,
): ThunkPromiseResult {
  return async dispatch => {
    switch (action.actionType) {
      case "replace": {
        dispatch(ActionCreators.replaceReferenceBlock(action));
        break;
      }
      case "open-modal": {
        dispatch(ActionCreators.openBlockitModal(action, botId));
        dispatch(ProfileActionCreators.closeProfileDialog());
        break;
      }
      case "close-modal": {
        dispatch(ActionCreators.closeBlockitModal(action));
        break;
      }

      case "show-toast": {
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: JSON.stringify(action.actionData.toastMessage),
          }),
        );
        dispatch(ActionCreators.showToast(action));
        break;
      }

      case "new-window": {
        const { url, width, height, onClose } = action.actionData;

        let newUrl = url;
        const hostQuery = queryString.parse(location.search);
        if (Boolean(hostQuery.debug)) {
          const tmp = new URL(url);
          tmp.searchParams.append("debug", "1");
          newUrl = tmp.toString();
        }

        await openCallbackWindow(newUrl.toString(), botId, dispatch, {
          width,
          height,
          onClose,
        });
        break;
      }

      case "show-alert-dialog": {
        break;
      }

      case "append": {
        dispatch(ActionCreators.appendListBlocks(action));
        break;
      }

      case "update": {
        dispatch(ActionCreators.updateListBlock(action));
        break;
      }

      case "push-right-panel": {
        if (!isInPluginPanel) {
          dispatch(SecondaryViewActionCreators.closePluginSecondaryView());
        }
        dispatch(
          SecondaryViewActionCreators.openPluginSecondaryView(action, botId),
        );
        break;
      }
      case "close-right-panel": {
        dispatch(SecondaryViewActionCreators.closePluginSecondaryView(action));
        break;
      }
    }
  };
}

const reduceReplaceActionResponseFunc = (
  accAction: Moim.Blockit.IBlockActionResponse[],
  currentAction: Moim.Blockit.IBlockActionResponse,
) => {
  const targetAction = accAction[accAction.length - 1];
  if (
    targetAction &&
    currentAction.actionType === "replace" &&
    currentAction.actionType === targetAction.actionType
  ) {
    targetAction.actionData.push(...currentAction.actionData);
  } else {
    accAction.push(currentAction);
  }
  return accAction;
};

let lastBufferId: string = "";
export function fetchReferenceBlock(
  ...params: Parameters<
    typeof ApplicationAPI.prototype.getReplaceReferenceBlock
  >
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchReferenceBlock(params[0]));
    try {
      const response = Boolean(params[0].isReplaceHome)
        ? await apiSelector(
            getState(),
            dispatch,
          ).application.getReplaceHomeReferenceBlock(...params)
        : await apiSelector(
            getState(),
            dispatch,
          ).application.getReplaceReferenceBlock(...params);
      if (lastBufferId !== response.bufferId) {
        // NOTE: when isReplaceHome true, this conversion is manually changing for this pipeline logic
        const refActions: Moim.Blockit.IBlockActionResponse[] = Boolean(
          params[0].isReplaceHome,
        )
          ? ((response.data as any) as {
              blocks: Moim.Blockit.Blocks[];
            }[]).map(
              i =>
                ({
                  actionType: "replace",
                  actionData: [
                    {
                      blockId: params[0].data[0].blockId,
                      botId: params[0].botId,
                      blocks: i.blocks,
                    },
                  ],
                } as Moim.Blockit.IReplaceActionResponse),
            )
          : response.data;

        lastBufferId = response.bufferId;
        await Promise.all(
          refActions
            .reduce(
              reduceReplaceActionResponseFunc,
              [] as Moim.Blockit.IBlockActionResponse[],
            )
            .map(async res =>
              dispatch(actionDispatchRoute(res, params[0].botId)),
            ),
        );
        dispatch(ActionCreators.succeedFetchReferenceBlock());
      }
    } catch {
      dispatch(ActionCreators.failedFetchReferenceBlock(params[0]));
    }
  };
}

export function doBlockAction(
  params: IActionAPIParams,
  isInPluginPanel?: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startClickReferenceAction());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).application.doActionTrigger(params);

      await Promise.all(
        response.data
          .reduce(
            reduceReplaceActionResponseFunc,
            [] as Moim.Blockit.IBlockActionResponse[],
          )
          .map(async res =>
            dispatch(actionDispatchRoute(res, params.botId, isInPluginPanel)),
          ),
      );
      dispatch(ActionCreators.succeedClickReferenceAction());
    } catch {
      dispatch(ActionCreators.failedClickReferenceAction());
    }
  };
}

export function fetchMoreListBlocks(
  ...params: Parameters<typeof ApplicationAPI.prototype.doActionTrigger>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchMoreListBlocks(params[0]));
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).application.doActionTrigger(...params);

      await Promise.all(
        response.data
          .reduce(
            reduceReplaceActionResponseFunc,
            [] as Moim.Blockit.IBlockActionResponse[],
          )
          .map(async res =>
            dispatch(actionDispatchRoute(res, params[0].botId)),
          ),
      );
      dispatch(ActionCreators.succeedFetchMoreListBlocks());
    } catch {
      dispatch(ActionCreators.failedFetchMoreListBlocks(params[0]));
    }
  };
}

export function preFetchFromThreadList(
  threads: Moim.Forum.IThread[],
): ThunkPromiseResult {
  return async dispatch => {
    const refBlocks: { [key: string]: IReplaceAPIData[] } = {};

    threads.forEach(thrd => {
      if (thrd.previewBottom) {
        thrd.previewBottom.forEach(preview => {
          if (preview.type === "reference" && preview.botId) {
            if (!refBlocks[preview.botId]) {
              refBlocks[preview.botId] = [];
            }
            refBlocks[preview.botId].push({
              blockId: preview.blockId,
              replaceId: preview.replaceId,
              params: preview.params,
            });
          }
        });
      }
    });

    Object.entries(refBlocks).forEach(([botId, data]) => {
      dispatch(
        fetchReferenceBlock({
          botId,
          data,
        }),
      );
    });
  };
}

export function preFetchFromMessageList(
  messages: Moim.Conversations.INormalizedMessage[],
): ThunkPromiseResult {
  return async dispatch => {
    const refBlocks: { [key: string]: IReplaceAPIData[] } = {};

    messages.forEach(msg => {
      if (msg.blocks) {
        msg.blocks.forEach(preview => {
          if (preview.type === "reference" && preview.botId) {
            if (!refBlocks[preview.botId]) {
              refBlocks[preview.botId] = [];
            }
            refBlocks[preview.botId].push({
              blockId: preview.blockId,
              replaceId: preview.replaceId,
              params: preview.params,
            });
          }
        });
      }
    });

    Object.entries(refBlocks).forEach(([botId, data]) => {
      dispatch(
        fetchReferenceBlock({
          botId,
          data,
        }),
      );
    });
  };
}

function inputToBlock(
  inputs: Record<string, string | number>,
  blocks: Moim.Blockit.Blocks[],
): Moim.Blockit.Blocks[] {
  const hashKeys = Object.keys(inputs);

  return blocks.map(block => {
    switch (block.type) {
      case "form": {
        return {
          ...block,
          blocks: inputToBlock(inputs, block.blocks),
        };
      }
      case "input": {
        if (hashKeys.includes(block.name)) {
          return {
            ...block,
            element: {
              ...block.element,
              initialValue: inputs[block.name],
            },
          };
        }
        return block;
      }
      default: {
        return block;
      }
    }
  });
}

export function extractUserInputAndMergeToBlocks(
  element: HTMLElement | null,
  blocks: Moim.Blockit.Blocks[],
): Moim.Blockit.Blocks[] {
  if (!element) return blocks;

  const ui = [
    ...Array.from(element.getElementsByTagName("input")),
    ...Array.from(element.getElementsByTagName("textarea")),
  ];

  const inputHash: Record<string, string | number> = {};
  ui.forEach(elm => {
    inputHash[elm.name] = elm.value;
  });
  return inputToBlock(inputHash, blocks);
}

export function storeRedirectBlocks(): ThunkPromiseResult {
  return async (_, getState) => {
    const { blockitModal, secondaryViewPage } = getState();
    setStoreRedirectRequest(true);
    setStoreRedirectLastSeen();

    const storeTarget: Record<string, any> = {};
    // modalBlock open 확인
    if (blockitModal.open) {
      // save this store
      storeTarget.blockitModal = {
        ...blockitModal,
        blocks: extractUserInputAndMergeToBlocks(
          blockitModal.modalContentRef,
          blockitModal.blocks,
        ),
        modalContentRef: null,
      };
    }
    // push-right-panel 확인
    if (secondaryViewPage.pluginOpenStatus) {
      // save this store
      storeTarget.secondaryViewPage = {
        ...secondaryViewPage,
        pluginHistory: {
          ...secondaryViewPage.pluginHistory,
          [secondaryViewPage.pluginCurrentLocationHash]: {
            ...secondaryViewPage.pluginHistory[
              secondaryViewPage.pluginCurrentLocationHash
            ],
            blocks: extractUserInputAndMergeToBlocks(
              secondaryViewPage.pluginContentRef,
              secondaryViewPage.pluginHistory[
                secondaryViewPage.pluginCurrentLocationHash
              ].blocks,
            ),
          },
        },
      };
    }

    setStoreRedirectBlocks(storeTarget);
    return;
  };
}

export function restoreRedirectMint(): ThunkPromiseResult {
  return async dispatch => {
    const queryParams = qs.parse(location.search);
    let pluginActions: Moim.Blockit.IBlockActionResponse[] = [];
    if (
      document.referrer.includes("https://service.canlab.co") ||
      document.referrer.includes("https://community-service.moim.mobi") ||
      document.referrer.includes("https://signature.canpass.me")
    ) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === "data") {
          pluginActions = JSON.parse(value as string);
        }
      });
      await Promise.all(
        pluginActions
          .reduce(
            reduceReplaceActionResponseFunc,
            [] as Moim.Blockit.IBlockActionResponse[],
          )
          .map(async res => {
            return dispatch(actionDispatchRoute(res, ""));
          }),
      );
    }
    removeStoreRedirectMintRequest();
  };
}

export function restoreRedirectBlocks(): ThunkPromiseResult {
  return async dispatch => {
    const {
      blockitModal,
      secondaryViewPage,
    }: {
      blockitModal?: BlockitModalReducer.IReduxState;
      secondaryViewPage?: SecondaryViewReducer.IState;
    } = getStoreRedirectBlocks();
    const queryParams = qs.parse(location.search);
    let lastSeen = getStoreRedirectLastSeen();
    let botId: Moim.Id | undefined;
    let quickPluginActionDispatch = false;
    let pluginActions: Moim.Blockit.IBlockActionResponse[] = [];

    if (MoimURL.CoverPage.isSameExact(lastSeen)) {
      lastSeen = "/";
    }

    removeStoreRedirectRequest();
    removeStoreRedirectLastSeen();
    removeStoreRedirectBlocks();

    setTimeout(() => {
      dispatch(
        replaceAction({
          pathname: lastSeen,
          search: (queryParams.pr_tag as string) ?? undefined,
        }),
      );
    }, 100);

    if (blockitModal) {
      botId = blockitModal.botId;
      dispatch(
        ActionCreators.openBlockitModal(
          {
            actionData: {
              title: blockitModal.title,
              blocks: blockitModal.blocks,
              modalId: blockitModal.modalId,
              onClose: blockitModal.onCloseBehavior,
            },
          },
          blockitModal.botId,
        ),
      );
    }
    if (secondaryViewPage) {
      botId = secondaryViewPage.botId;
      dispatch(
        SecondaryViewActionCreators.restorePluginStore(secondaryViewPage),
      );
    }

    if (botId) {
      const parsedData: Record<string, any> = {
        actionType: undefined,
        actionId: "",
        params: {},
      };
      Object.entries(queryParams).forEach(([key, value]) => {
        switch (key) {
          case "actionType": {
            parsedData.actionType = value;
            break;
          }
          case "debug": {
            break;
          }
          case "payload": {
            const objPayload = JSON.parse(value as string);
            if (objPayload && objPayload.action?.data) {
              parsedData.actionId = objPayload.action.data.actionId;
              parsedData.params = {
                ...parsedData.params,
                ...objPayload.action.data.params,
              };
            }
            break;
          }
          case "data": {
            quickPluginActionDispatch = true;
            pluginActions = JSON.parse(value as string);
            break;
          }
          default: {
            parsedData.params[key] = value;
            break;
          }
        }
      });

      if (quickPluginActionDispatch) {
        await Promise.all(
          pluginActions
            .reduce(
              reduceReplaceActionResponseFunc,
              [] as Moim.Blockit.IBlockActionResponse[],
            )
            .map(async res => {
              if (botId) {
                return dispatch(actionDispatchRoute(res, botId));
              }
            }),
        );
      } else {
        switch (parsedData.actionType) {
          case "action": {
            dispatch(
              doBlockAction({
                botId,
                data: {
                  actionId: parsedData.actionId,
                  params: {
                    ...parsedData.params,
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
                  ...parsedData.params,
                  params: {
                    ...parsedData.params.params,
                  },
                },
              }),
            );
            break;
          }
        }
      }
    }
  };
}
