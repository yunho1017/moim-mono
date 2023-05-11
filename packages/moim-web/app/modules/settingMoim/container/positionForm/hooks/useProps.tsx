import { useActions, useStoreState } from "app/store";
import usePositionFormDialog from "common/hooks/usePositionFormDialog";
import { createPosition, updatePositionInfo } from "app/actions/position";
import { positionByIdSelector } from "app/selectors/position";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const { positionId, mode, close } = usePositionFormDialog();
  const state = useStoreState(storeState => ({
    position: positionByIdSelector(storeState, positionId || ""),
  }));
  const actions = useActions({
    createPosition,
    editPosition: updatePositionInfo,
  });

  return {
    ...state,
    ...actions,
    mode,
    close,
  };
}
