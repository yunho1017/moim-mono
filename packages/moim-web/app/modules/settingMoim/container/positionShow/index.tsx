import * as React from "react";
import PositionShow from "../../components/positionShow";
import { useHandlers, useProps, useEffects } from "./hooks";
import PositionDialog from "../positionDialog";
import PositionDeleteDialog from "../positionDeleteDialog";
import PositionShowHelmet from "../../components/positionShow/helmet";

function PositionShowContainer() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps);

  const {
    currentMoim,
    position,
    members,
    dialogPurpose,
    isLoadingMembers,
    isOpenDeleteDialog,
  } = hookProps;
  const {
    handleClickAppointButton,
    handleCloseDialog,
    handleClickDismissButton,
    handleClickEditButton,
    handleClickDeleteButton,
    handleCloseDeleteDialog,
    handleGetPositionMembers,
  } = hookHandlers;

  if (!currentMoim || !position) {
    return null;
  }

  return (
    <>
      <PositionShowHelmet
        positionTitle={position.name}
        positionDescription={position.description}
      />

      <PositionShow
        position={position}
        members={members}
        isLoadingMembers={isLoadingMembers}
        moimName={currentMoim.name}
        onGetPositionMembers={handleGetPositionMembers}
        onClickAppointButton={handleClickAppointButton}
        onClickDismissButton={handleClickDismissButton}
        onClickEditButton={handleClickEditButton}
        onClickDeleteButton={handleClickDeleteButton}
      />

      <PositionDialog
        open={Boolean(dialogPurpose)}
        purpose={dialogPurpose}
        positionId={position.id}
        onClose={handleCloseDialog}
      />

      <PositionDeleteDialog
        open={isOpenDeleteDialog}
        onClose={handleCloseDeleteDialog}
        positionId={position.id}
        positionName={position.name}
      />
    </>
  );
}

export default PositionShowContainer;
