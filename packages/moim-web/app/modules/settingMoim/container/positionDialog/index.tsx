import * as React from "react";
import { UserSelectDialogWithSearchHooks } from "app/modules/userSelectDialog";
import { useHandlers, useProps } from "./hooks";
import { POSITION_DIALOG_PURPOSE } from "./types";
import PositionDismissDialog from "./components/dismissDialog";

export interface IProps {
  open: boolean;
  purpose?: POSITION_DIALOG_PURPOSE;
  positionId: Moim.Id;
  onClose: () => void;
}

function PositionDialog(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    open,
    purpose,
    onClose,
    title,
    placeholder,
    nextButtonText,
    positionId,
    emptyText,
    positionMembers,
    isLoadingMembers,
  } = hookProps;
  const {
    handleNext,
    handleGetPositionMembers,
    appointSelectableUserFilter,
  } = hookHandlers;

  return purpose === POSITION_DIALOG_PURPOSE.DISMISS ? (
    <PositionDismissDialog
      open={open}
      subTitleKeys={["email"]}
      positionId={positionId}
      isMultipleSelect={true}
      title={title}
      placeholder={placeholder}
      nextButtonText={nextButtonText}
      emptyTextId={emptyText}
      onNext={handleNext}
      onClose={onClose}
      positionMembers={positionMembers}
      isPositionLoading={isLoadingMembers}
      handleGetPositionMembers={handleGetPositionMembers}
    />
  ) : (
    <UserSelectDialogWithSearchHooks
      open={open}
      title={title}
      placeholder={placeholder}
      nextButtonText={nextButtonText}
      isMultipleSelect={true}
      subTitleKeys={["email"]}
      onNext={handleNext}
      onClose={onClose}
      userFilter={appointSelectableUserFilter}
      emptyTextId={emptyText}
    />
  );
}

export default PositionDialog;
