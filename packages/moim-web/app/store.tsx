// vendor
import isEqual from "lodash/isEqual";
import * as React from "react";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  createStore,
  applyMiddleware,
  compose,
  Store,
} from "redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { History } from "history";
import { match as Match } from "react-router";
import thunk, {
  ThunkMiddleware,
  ThunkAction,
  ThunkDispatch,
} from "redux-thunk";
// action & reducer
import {
  IAppState,
  initialState as appInitialState,
  createAppReducers,
} from "./rootReducer";
import { MoimActions } from "./actions";
import * as EnvChecker from "common/helpers/envChecker";
// middleware
import logger from "redux-logger";
import {
  CallHistoryMethodAction,
  routerMiddleware,
} from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { apiSelector } from "common/api/helpers";
import moimDefaultAPI from "common/api";
import * as queryString from "querystring";

export interface IThunkExtraArguments {
  apiSelector: typeof apiSelector;
  defaultApi: typeof moimDefaultAPI;
}

export type ThunkResult<R = void> = ThunkAction<
  R,
  IAppState,
  IThunkExtraArguments,
  MoimActions | CallHistoryMethodAction
>;

export type ThunkPromiseResult<V = void> = ThunkResult<Promise<V>>;

export type AppDispatch = ThunkDispatch<
  IAppState,
  IThunkExtraArguments,
  MoimActions
>;
export interface IAppStore extends Store<IAppState, MoimActions> {
  dispatch: AppDispatch;
}

export interface ISSRLoadDataOption {
  match: Match<Moim.IMatchParams>;
  appStore: IAppStore;
  requestUrl: string;
}

function initialAppState() {
  // try {
  //   // eslint-disable-next-line no-underscore-dangle
  //   const serverData = (window as any).__INITIAL_STATE__ as IAppState;
  //   return serverData || undefined;
  // } catch (err) {
  //   return appInitialState;
  // }
  return appInitialState;
}

export function createAppStore(
  history: History,
  initialState?: Partial<IAppState>,
): IAppStore {
  const params = queryString.parse(location.search.replace("?", ""));

  // create redux store from initial state
  const storeMiddlewares = [
    (thunk.withExtraArgument<IThunkExtraArguments>({
      apiSelector,
      defaultApi: moimDefaultAPI,
    }) as unknown) as ThunkMiddleware<IAppState, MoimActions>,
    routerMiddleware(history),
  ];

  if (EnvChecker.isDev() || Boolean(params.debug)) {
    storeMiddlewares.push(logger);
  }

  const composer = EnvChecker.isDev() ? composeWithDevTools({}) : compose;
  const composeEnhancers = composer(applyMiddleware(...storeMiddlewares));
  const rootReducer = createAppReducers(history);

  return createStore(
    rootReducer,
    (initialState || initialAppState()) as any,
    composeEnhancers,
  );
}

export function useActions<M extends ActionCreatorsMapObject>(
  actions: M,
  deps: any[] = [],
) {
  const dispatch = useDispatch<AppDispatch>();
  return React.useMemo(
    () => bindActionCreators<M>(actions, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, dispatch] : [dispatch],
  );
}

export function useStoreState<H>(
  mapStateSelector: (state: IAppState) => H,
  equalityFn?: (left: H, right: H) => boolean,
): H {
  return useSelector(mapStateSelector, equalityFn ?? shallowEqual);
}

export function arrayEqual<T>(left: T[], right: T[]) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    return shallowEqual(left, right);
  }

  if (left.length !== right.length) {
    return false;
  }

  return left.every((i, idx) => isEqual(i, right[idx]));
}
