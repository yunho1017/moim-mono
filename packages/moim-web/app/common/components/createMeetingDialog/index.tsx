import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState, useActions } from "app/store";
import { positionsSelector } from "app/selectors/position";
import { getPositions } from "app/actions/position";
import { createMeeting as createMeetingAction } from "app/actions/meeting";
import { closeCreateMeetingDialog } from "./action";
import AppBar from "common/components/appBar";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import {
  CloseButton,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import { SingleLineBoxInput } from "common/components/designSystem/boxInput";
import { RightField, IChangesRight } from "./rights";
import { RIGHT_HOLDER_TYPE } from "./rights/constants";
import { CustomAppBarModalLayout } from "../modalLayout";

import {
  Inner,
  HeaderWrapperStyle,
  TitleWrapper,
  InputWrapper,
  ErrorText,
  Spacer,
  ButtonWrapper,
  CreateButton,
} from "./styled";

const MAX_NAME_LENGTH = 60;

const CreateMeetingDialog = () => {
  const [chatName, setChatName] = React.useState("");
  const [isInitialed, setInitialed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isCreating, setCreateStatus] = React.useState(false);
  const [target, setTarget] = React.useState<Moim.Permission.APPLIED_TYPE>(
    "MEMBERS",
  );
  const [selectedPositionIds, setSelectedPositionIds] = React.useState<
    Moim.Id[]
  >([]);
  const intl = useIntl();

  const { open, positions } = useStoreState(state => ({
    positions: positionsSelector(state),
    ...state.createMeetingDialog,
  }));

  const {
    createMeeting,
    dispatchGetPositions,
    dispatchCloseDialog,
  } = useActions({
    createMeeting: createMeetingAction,
    dispatchGetPositions: getPositions,
    dispatchCloseDialog: closeCreateMeetingDialog,
  });

  const canCreate = React.useMemo(
    () =>
      chatName.length > 0 &&
      error === null &&
      (target === "MEMBERS" || selectedPositionIds.length > 0),
    [chatName.length, error, selectedPositionIds.length, target],
  );

  const handleChange = React.useCallback(val => {
    if (val.length <= MAX_NAME_LENGTH) {
      setChatName(val);
    } else {
      // setError("KEY_OF_LIMITED_NAME");
    }
  }, []);

  const handleChangeRightData = React.useCallback((params: IChangesRight) => {
    setTarget(params.target);
    setSelectedPositionIds(params.limited || []);
  }, []);

  const errorText = React.useMemo(
    () => (error ? <ErrorText>ERROR!!!</ErrorText> : undefined),
    [error],
  );

  const handleClick = React.useCallback(async () => {
    if (!isCreating && canCreate) {
      setCreateStatus(true);
      await createMeeting(
        intl.formatMessage({ id: "video_chat/dialog_create_success_message" }),
        chatName,
        target,
        target === "LIMITED" ? selectedPositionIds : [],
      );
      dispatchCloseDialog();
      setCreateStatus(false);
    }
  }, [
    isCreating,
    canCreate,
    createMeeting,
    intl,
    chatName,
    target,
    selectedPositionIds,
    dispatchCloseDialog,
  ]);

  const handleClose = React.useCallback(() => {
    dispatchCloseDialog();
  }, [dispatchCloseDialog]);

  React.useEffect(() => {
    if (!isInitialed && positions.length === 0) {
      dispatchGetPositions({ limit: 300 });
      setInitialed(true);
    }
  }, [dispatchGetPositions, isInitialed, positions.length]);

  React.useEffect(() => {
    if (open) {
      setChatName("");
      setError(null);
      setCreateStatus(false);
      setSelectedPositionIds([]);
    }
  }, [open]);

  return (
    <BasicResponsiveDialog open={open} onClose={handleClose}>
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            titleAlignment="Center"
            leftButton={
              <CloseButtonWrapper>
                <CloseButton onClick={handleClose} />
              </CloseButtonWrapper>
            }
            titleElement={
              <FormattedMessage id="video_chat/dialog_create_title" />
            }
          />
        }
        hasAppBarBorder={false}
      >
        <Inner>
          <TitleWrapper>
            <FormattedMessage id="video_chat/dialog_create_name_title" />
          </TitleWrapper>
          <InputWrapper>
            <SingleLineBoxInput
              autoFocus={true}
              value={chatName}
              suffix={{
                type: "characters",
                maxCount: MAX_NAME_LENGTH,
              }}
              placeholder={intl.formatMessage({
                id: "video_chat/dialog_create_name_placeholder",
              })}
              size="Large"
              helperText={errorText}
              onChange={handleChange}
            />
          </InputWrapper>
          <Spacer height={16} />
          <RightField
            headerWrapperStyle={HeaderWrapperStyle}
            channelId="dummy"
            name="ACCESS" // dummy
            initialOption={target as RIGHT_HOLDER_TYPE}
            availableOptions={[
              RIGHT_HOLDER_TYPE.MEMBERS,
              RIGHT_HOLDER_TYPE.LIMITED,
            ]}
            title={
              <FormattedMessage id="video_chat/dialog_create_who_can_join_title" />
            }
            placeholder={intl.formatMessage({
              id: "video_chat/dialog_create_who_can_join_placeholder",
            })}
            onChangeRightData={handleChangeRightData}
          />

          <Spacer height={24} />
          <ButtonWrapper>
            <CreateButton
              waiting={isCreating}
              disabled={!canCreate}
              onClick={handleClick}
            >
              <FormattedMessage id="create_button" />
            </CreateButton>
          </ButtonWrapper>
        </Inner>
      </CustomAppBarModalLayout>
    </BasicResponsiveDialog>
  );
};

export default CreateMeetingDialog;
