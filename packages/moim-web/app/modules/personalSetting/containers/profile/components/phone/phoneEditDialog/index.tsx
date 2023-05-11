import * as React from "react";
import { FormattedMessage } from "react-intl";
import Phone from "common/components/joinGroupDialog/component/phone";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import AppBar from "common/components/appBar";
import {
  Wrapper,
  Contents,
  CloseButtonWrapper,
  AppBarWrapper,
  CloseButton,
} from "./styled";

import useCurrentUser from "common/hooks/useCurrentUser";

interface IProps {
  open: boolean;
  onClose(): void;
}

const PHONE_TEXT_SET: Moim.Group.ICreateMoimStepData = {
  title: <FormattedMessage id="edit_profile_show/phone_number_dialog_title" />,
  subTitle: (
    <FormattedMessage id="edit_profile_show/phone_number_dialog_description" />
  ),
  buttonText: <FormattedMessage id="save_button" />,
};

export default function PhoneEditDialog({ open, onClose }: IProps) {
  const currentUser = useCurrentUser();
  return (
    <BasicResponsiveDialog open={open} onClose={onClose}>
      <AppBarWrapper>
        <AppBar
          leftButton={
            <CloseButtonWrapper>
              <CloseButton onClick={onClose} />
            </CloseButtonWrapper>
          }
          titleElement=""
        />
      </AppBarWrapper>
      <Wrapper>
        <Contents>
          <Phone
            stepData={PHONE_TEXT_SET}
            defaultPhone={currentUser?.phoneNumber}
            onNext={onClose}
          />
        </Contents>
      </Wrapper>
    </BasicResponsiveDialog>
  );
}
