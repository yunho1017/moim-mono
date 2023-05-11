import * as React from "react";
import { useRouteMatch } from "react-router";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useActions, useStoreState } from "app/store";
import {
  getPositionMembersLoadingSelector,
  positionByIdSelector,
  positionMembersSelector,
} from "app/selectors/position";
import {
  getPositionMembers as getPositionMembersAction,
  ActionCreators as PositionActionCreators,
} from "app/actions/position";
import usePositionFormDialog from "common/hooks/usePositionFormDialog";
import { POSITION_DIALOG_PURPOSE } from "../../positionDialog/types";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const positionId = match.params.positionId;
  const currentMoim = useCurrentGroup();
  const { openForEdit: openPositionEditDialog } = usePositionFormDialog();
  const state = useStoreState(storeState => ({
    position: positionByIdSelector(storeState, positionId),
    members: positionMembersSelector(storeState, positionId),
    isLoadingMembers: getPositionMembersLoadingSelector(storeState, positionId),
  }));
  const actions = useActions({
    getPositionMembers: getPositionMembersAction,
    dispatchClearDeletePositionError:
      PositionActionCreators.clearDeletePositionError,
  });
  const [dialogPurpose, setDialogPurpose] = React.useState<
    POSITION_DIALOG_PURPOSE
  >();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(
    false,
  );

  return {
    ...state,
    ...actions,
    currentMoim,
    openPositionEditDialog,
    dialogPurpose,
    setDialogPurpose,
    isOpenDeleteDialog,
    setOpenDeleteDialog,
  };
}
