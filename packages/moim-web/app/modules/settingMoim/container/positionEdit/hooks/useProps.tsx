import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import { positionsSelector } from "app/selectors/position";
import {
  upPositionPriority as upPositionPriorityAction,
  downPositionPriority as downPositionPriorityAction,
} from "app/actions/position";
import useModalRedirect from "common/hooks/useModalRedirect";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const cancelToken = useCancelToken();
  const state = useStoreState(storeState => ({
    positions: positionsSelector(storeState),
  }));
  const actions = useActions({
    upPositionPriority: upPositionPriorityAction,
    downPositionPriority: downPositionPriorityAction,
  });
  const redirect = useModalRedirect();
  return {
    ...state,
    ...actions,
    cancelToken,
    redirect,
  };
}
