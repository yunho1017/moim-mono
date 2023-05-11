import * as React from "react";
import ResponsiveDialog from "common/components/responsiveDialog";
import DQuestFormActionComponent from "./component";
import { DialogBase, MOBILE_MIN_HEIGHT } from "./styled";

interface IProps {
  open: boolean;
  questId?: Moim.Id;
  missionId?: Moim.Id;
  form?: Moim.DQuest.IMissionActionForm;
  onSubmit(questId: Moim.Id, missionId: Moim.Id, answer: any): void;
  onClose(): void;
}

const DQuestFormActionDialog: React.FC<IProps> = ({
  open,
  questId,
  missionId,
  form,
  onSubmit,
  onClose,
}) => {
  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = React.useCallback(
    (answer: any) => {
      if (!questId || !missionId) {
        return;
      }
      onSubmit(questId, missionId, answer);
      onClose();
    },
    [missionId, onClose, onSubmit, questId],
  );

  return (
    <ResponsiveDialog
      open={open}
      minHeight={MOBILE_MIN_HEIGHT}
      dialogBase={DialogBase}
      disableBottomSheetPortal={true}
      onCloseRequest={handleClose}
    >
      {form ? (
        <DQuestFormActionComponent
          form={form}
          onClickSubmit={handleSubmit}
          onClickClose={handleClose}
        />
      ) : (
        <div>WRONG PAYLOAD RECEIVED!!</div>
      )}
    </ResponsiveDialog>
  );
};

export default DQuestFormActionDialog;
