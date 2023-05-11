import * as React from "react";
import { Dialog } from "@material-ui/core";
import NoRightFullScreenDialog from "../";
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import AppBar from "common/components/appBar";
import { CloseButton, DialogWrapper } from "../styled";

interface IProps {
  open: boolean;
  onClose: () => void;
}

function NoRightDialogComponent({ open, onClose }: IProps) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen={true}>
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            titleElement=""
            leftButton={<CloseButton onClick={onClose} />}
          />
        }
        hasAppBarBorder={false}
      >
        <DialogWrapper>
          <NoRightFullScreenDialog />
        </DialogWrapper>
      </CustomAppBarModalLayout>
    </Dialog>
  );
}

export default NoRightDialogComponent;
