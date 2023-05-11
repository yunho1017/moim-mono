import { RpcError } from "grpc-web";

import { UpdateClient } from "@balmbees/moim-proto/build/js/client/update_grpc_web_pb";
import { EntityItem } from "@balmbees/moim-proto/build/js/client/update_pb";
import { AppDispatch } from "../store";

import { isStage } from "common/helpers/envChecker";
import {
  handlerWithDispatch,
  setupRequest,
  CommonParams,
  getGRPCHost,
  handlerWithDispatchAndState,
} from "./util";

import { ActionCreators, reconnectGRPCBackOffice } from "app/actions/gRPC";
import updateEntities from "./utils/entityUpdateHandler";
import { IAppState } from "app/rootReducer";

function reconnectStream(...args: CommonParams) {
  subscribeEventStream(...args);
}

function errorHandler(dispatch: AppDispatch, err: RpcError) {
  dispatch(
    ActionCreators.setGRPCErrorMessage({
      key: "entity",
      message: err.message,
    })
  );
  dispatch(reconnectGRPCBackOffice("entity", reconnectStream));
}

function dataHandler(
  dispatch: AppDispatch,
  getState: () => IAppState,
  response: EntityItem
) {
  if (isStage()) {
    // eslint-disable-next-line no-console
    console.log(
      `Entities Arrived [${response.getDataList()}] | ${response.getPong()}`
    );
  }

  const pong = response.getPong();
  if (!pong) {
    updateEntities(dispatch, response.getDataList(), getState());
  }
}

export default function subscribeEventStream(...args: CommonParams) {
  const client = new UpdateClient(getGRPCHost());
  const [getState, dispatch] = args;

  const request = setupRequest(getState());

  if (request) {
    const update$ = client.getUpdatedEntities(request);

    update$.on(
      "data",
      handlerWithDispatchAndState(dispatch, getState, dataHandler)
    );
    update$.on("error", handlerWithDispatch(dispatch, errorHandler));
  }
}
