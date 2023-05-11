import { RpcError } from "grpc-web";

import { Stat } from "@balmbees/moim-proto/build/js/client/notification_pb";
import { NotificationClient } from "@balmbees/moim-proto/build/js/client/notification_grpc_web_pb";
import { AppDispatch } from "../store";

import { isStage } from "common/helpers/envChecker";
import {
  handlerWithDispatch,
  setupRequest,
  CommonParams,
  getGRPCHost,
} from "./util";

import { ActionCreators, reconnectGRPCBackOffice } from "app/actions/gRPC";
import { updateChannelStat } from "app/actions/channel";

function reconnectStream(...args: CommonParams) {
  subscribeEventStream(...args);
}

function errorHandler(dispatch: AppDispatch, err: RpcError) {
  dispatch(
    ActionCreators.setGRPCErrorMessage({
      key: "stat",
      message: err.message,
    })
  );
  dispatch(reconnectGRPCBackOffice("stat", reconnectStream));
}

function dataHandler(dispatch: AppDispatch, response: Stat) {
  if (isStage()) {
    // eslint-disable-next-line no-console
    console.log(
      `Stats Arrived [${response.getDataList()}] | ${response.getPong()}`
    );
  }

  const pong = response.getPong();

  if (!pong) {
    dispatch(updateChannelStat(response.getDataList()));
  }
}

export default function subscribeEventStream(...args: CommonParams) {
  const client = new NotificationClient(getGRPCHost());
  const [getState, dispatch] = args;

  const request = setupRequest(getState());

  if (request) {
    const stats$ = client.getStats(request);

    stats$.on("data", handlerWithDispatch(dispatch, dataHandler));
    stats$.on("error", handlerWithDispatch(dispatch, errorHandler));
  }
}
