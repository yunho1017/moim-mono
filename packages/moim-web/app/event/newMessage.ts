import { RpcError } from "grpc-web";
import { matchPath } from "react-router";

import { MessageClient } from "@balmbees/moim-proto/build/js/client/message_grpc_web_pb";
import { Item } from "@balmbees/moim-proto/build/js/client/message_pb";
import { AppDispatch } from "app/store";
import { IAppState } from "app/rootReducer";

import { isStage } from "common/helpers/envChecker";
import {
  handlerWithDispatch,
  handlerWithDispatchAndState,
  setupRequest,
  CommonParams,
  getGRPCHost,
} from "./util";
import { MoimURL } from "common/helpers/url";

import newMessageHandler from "./utils/newMessageHandler";
import { ActionCreators, reconnectGRPCBackOffice } from "app/actions/gRPC";
import { notCurrentChannelNewMessageHandler } from "app/actions/directMessage";
import {
  getCommentListWithUpdateCommentCount,
  getThreadList,
  openNewItemSnackbar,
} from "app/actions/forum";
import { ItemIdTypes } from "app/enums";
import { threadReplySortingOptionSelector } from "app/selectors/forum";

function reconnectStream(...args: CommonParams) {
  subscribeEventStream(...args);
}

function errorHandler(dispatch: AppDispatch, err: RpcError) {
  dispatch(
    ActionCreators.setGRPCErrorMessage({
      key: "message",
      message: err.message,
    })
  );
  dispatch(reconnectGRPCBackOffice("message", reconnectStream));
}

function dataHandler(
  dispatch: AppDispatch,
  getState: () => IAppState,
  response: Item
) {
  if (isStage()) {
    // eslint-disable-next-line no-console
    console.log(
      `Mention Arrived [${response.toObject()}] | ${response.getPong()}`
    );
  }

  const pong = response.getPong();

  if (!pong) {
    const state = getState();
    const channelId = response.getChannelid();
    const parentId = response.getParentid();
    const channelType = response.getChanneltype();
    const itemId = response.getItemid();
    const creator = response.getCreatedby();
    const currentMatchParams =
      matchPath<Moim.IMatchParams>(location.pathname, {
        path: [
          MoimURL.MeetingHome.pattern,
          MoimURL.DirectMessageShow.pattern,
          MoimURL.ConversationShow.pattern,
          MoimURL.FocusedShowForumThread.pattern,
          MoimURL.ShowForumThread.pattern,
          MoimURL.Forum.pattern,
        ],
      })?.params || {};
    const isMessageEvent = itemId.charAt(0) === ItemIdTypes.MESSAGE;
    const isCreateByCurrentUser = creator === state.app.currentUserId;
    // new thread snackbar auto focus갸 활성화 되면 false 를 지워주세요
    const isNewThreadEvent = false && itemId.charAt(0) === ItemIdTypes.THREAD;
    const isNewCommentEvent =
      itemId.charAt(0) === ItemIdTypes.COMMENT &&
      Object.values(currentMatchParams).includes(parentId);

    if (
      Object.values(currentMatchParams).includes(channelId) &&
      (isMessageEvent || isNewThreadEvent || isNewCommentEvent)
    ) {
      if (isMessageEvent) {
        newMessageHandler(
          dispatch,
          channelId,
          JSON.parse(response.getEntityjson())
        );
      } else if (isNewThreadEvent) {
        const currentPaging = state.thread.threadIds[channelId]?.paging;
        if (!currentPaging?.before) {
          dispatch(
            getThreadList(
              {
                channelId,
                before: itemId,
                inclusive: true,
              },
              undefined,
              "before"
            )
          );

          if (!isCreateByCurrentUser) {
            dispatch(openNewItemSnackbar("post", itemId));
          }
        }
      } else if (isNewCommentEvent) {
        const sortingOption = threadReplySortingOptionSelector(state, parentId);
        const currentPaging = state.thread.threadIds[parentId]?.paging;
        let pagingKey: keyof Moim.IPaging =
          sortingOption.order === "ASC" ? "after" : "before";

        if (sortingOption.sort === "voteScore") {
          pagingKey = "before";
        }

        if (!currentPaging?.[pagingKey]) {
          dispatch(
            getCommentListWithUpdateCommentCount(
              {
                channelId,
                threadId: parentId,
                order: sortingOption.order,
                sort: sortingOption.sort,
                inclusive: true,
                [pagingKey]: itemId,
              },
              undefined,
              pagingKey
            )
          );

          if (!isCreateByCurrentUser) {
            dispatch(openNewItemSnackbar("comment", itemId));
          }
        }
      }
    } else {
      dispatch(
        notCurrentChannelNewMessageHandler(
          channelType,
          channelId,
          parentId,
          itemId
        )
      );
    }
  }
}

export default function subscribeEventStream(...args: CommonParams) {
  const client = new MessageClient(getGRPCHost());
  const [getState, dispatch] = args;

  const request = setupRequest(getState());

  if (request) {
    const messages$ = client.getNewMessages(request);
    messages$.on(
      "data",
      handlerWithDispatchAndState(dispatch, getState, dataHandler)
    );
    messages$.on("error", handlerWithDispatch(dispatch, errorHandler));
  }
}
