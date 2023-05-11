import { useActions, useStoreState } from "app/store";
import { ActionCreators as PositionFormDialogActionCreators } from "app/actions/positionFormDialog";

function usePositionFormDialog() {
  const { mode, positionId, isOpen } = useStoreState(state => ({
    mode: state.positionFormDialog.mode,
    positionId: state.positionFormDialog.positionId,
    isOpen: state.positionFormDialog.isOpen,
  }));

  const { openForCreate, openForEdit, close } = useActions({
    openForCreate: PositionFormDialogActionCreators.openForCreate,
    openForEdit: PositionFormDialogActionCreators.openForEdit,
    close: PositionFormDialogActionCreators.close,
  });

  return {
    mode,
    isOpen,
    positionId,
    openForCreate,
    openForEdit,
    close,
  };
}

export default usePositionFormDialog;
