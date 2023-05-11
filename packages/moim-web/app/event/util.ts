import { AppDispatch } from "app/store";
import { IAppState } from "app/rootReducer";

import { User } from "@balmbees/moim-proto/build/js/client/common_pb";
import { subscribe } from ".";
import { isProd } from "common/helpers/envChecker";
import { PROD_HOST, STAGE_HOST } from "./contants";

export type CommonParams = Parameters<typeof subscribe>;

type OmitDispatchParameter<T> = T extends (
  dispatch: AppDispatch,
  ...args: infer P
) => void
  ? P
  : unknown[];

type OmitDispatchAndStateParameter<T> = OmitDispatchParameter<T> extends (
  getState: () => IAppState,
  ...args: infer P
) => void
  ? P
  : unknown[];

export function setupRequest(state: IAppState) {
  const { currentUserId, currentGroupId } = state.app;

  if (currentUserId && currentGroupId) {
    const request = new User();
    request.setGroup(currentGroupId);
    request.setUser(currentUserId);

    return request;
  }

  return null;
}

export function handlerWithDispatch<T>(
  dispatch: AppDispatch,
  handler: T extends (_dispatch: AppDispatch, ...args: any[]) => void
    ? T
    : (...args: any[]) => void,
) {
  return function(...args: OmitDispatchParameter<typeof handler>) {
    handler(dispatch, ...args);
  };
}

export function handlerWithDispatchAndState<T>(
  dispatch: AppDispatch,
  getState: () => IAppState,
  handler: T extends (
    _dispatch: AppDispatch,
    _getState: () => IAppState,
    ...args: any[]
  ) => void
    ? T
    : (...args: any[]) => void,
) {
  return function(...args: OmitDispatchAndStateParameter<typeof handler>) {
    handler(dispatch, getState, ...args);
  };
}

export function getGRPCHost() {
  return isProd() ? PROD_HOST : STAGE_HOST;
}
