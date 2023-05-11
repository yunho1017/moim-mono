import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "../action";

export default function usePositionApplyDialog() {
  const { open, initialPosition } = useStoreState(state => ({
    open: state.positionApplyDialog.isOpen,
    initialPosition: state.positionApplyDialog.position,
  }));
  const { openDialog, closeDialog } = useActions({
    openDialog: ActionCreators.open,
    closeDialog: ActionCreators.close,
  });

  return {
    open,
    initialPosition,
    openDialog,
    closeDialog,
  };
}
