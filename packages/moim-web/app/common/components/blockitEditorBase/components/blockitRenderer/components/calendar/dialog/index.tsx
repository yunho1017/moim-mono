import * as React from "react";

import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import AppBar from "common/components/appBar";
import { ModalTitle, CloseButton } from "./styled";
import Component from "./component";

interface IProps {
  event: Moim.Blockit.ICalendarBlockEvent | undefined;
  onClose(): void;
}
export default function EventDetailDialog({ event, onClose }: IProps) {
  return (
    <FixedHeightBasicDialog open={Boolean(event)} onClose={onClose}>
      <CustomAppBarModalLayout
        hasAppBarBorder={false}
        appBar={
          <AppBar
            titleElement={<ModalTitle>Event detail</ModalTitle>}
            titleAlignment="Center"
            leftButton={<CloseButton onClick={onClose} />}
          />
        }
      >
        <Component event={event} />
      </CustomAppBarModalLayout>
    </FixedHeightBasicDialog>
  );
}
