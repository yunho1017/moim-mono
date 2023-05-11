import { RpcError } from "grpc-web";

import { Mention } from "@balmbees/moim-proto/build/js/client/notification_pb";
import { NotificationClient } from "@balmbees/moim-proto/build/js/client/notification_grpc_web_pb";
import { AppDispatch } from "../store";
import { isStage } from "common/helpers/envChecker";
import {
  handlerWithDispatch,
  setupRequest,
  CommonParams,
  getGRPCHost,
} from "./util";

import { showMentionNotification } from "app/actions/notification";
import { ActionCreators, reconnectGRPCBackOffice } from "app/actions/gRPC";

function reconnectStream(...args: CommonParams) {
  subscribeEventStream(...args);
}

function errorHandler(dispatch: AppDispatch, err: RpcError) {
  dispatch(
    ActionCreators.setGRPCErrorMessage({
      key: "notification",
      message: err.message,
    })
  );
  dispatch(reconnectGRPCBackOffice("notification", reconnectStream));
}

function dataHandler(dispatch: AppDispatch, response: Mention) {
  if (isStage()) {
    // eslint-disable-next-line no-console
    console.log(
      `Mention Arrived [${response.getDataList()}] | ${response.getPong()}`
    );
  }

  const pong = response.getPong();

  if (!pong) {
    const mentions = response
      .getDataList()
      .map((mention) => mention.toObject());
    dispatch(showMentionNotification(mentions));
  }
}

export default function subscribeEventStream(...args: CommonParams) {
  const client = new NotificationClient(getGRPCHost());
  const [getState, dispatch] = args;

  const request = setupRequest(getState());

  if (request) {
    const mention$ = client.getMentions(request);

    mention$.on("data", handlerWithDispatch(dispatch, dataHandler));
    mention$.on("error", handlerWithDispatch(dispatch, errorHandler));
  }
}
