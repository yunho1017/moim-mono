import { Selector } from "reselect";
import { useStoreState } from "app/store";
import { IAppState } from "app/rootReducer";

export default function useStoreReselect<R>(
  reSelector: Selector<IAppState, R>,
  equalityFn?: (left: R, right: R) => boolean,
) {
  return useStoreState(reSelector, equalityFn);
}
