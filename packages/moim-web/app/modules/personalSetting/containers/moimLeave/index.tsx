import * as React from "react";
import { FormattedMessage } from "react-intl";
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";
import MoimLeaveComponent from "./components/main";
import { IProps, useProps, useHandlers } from "./useHooks";
import { Checkbox } from "common/components/designSystem/inputs";
import { CheckBoxWrapper } from "./styled";

const MoimLeave: React.FC<IProps> = props => {
  const {
    isOpenFailedAlert,
    isChildMoim,
    currentMoim,
    currentUser,
    themeContext,
    moimAliasName,
    usernameValidation,
    isOpenConfirmAlert,
    closeConfirmAlert,
    handleUsernameChange,
    handleLeaveClick,
    doLeave,
    closeFailedLeaveMoimAlert,
    confirmed,
    setConfirmStatus,
  } = useHandlers(useProps(props));

  const confirmAlertButtons: IButton[] = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="cancel_button" />,
        textColor: themeContext?.theme.colorV2.colorSet.grey800,
        onClick: closeConfirmAlert,
      },
      {
        text: (
          <FormattedMessage
            id={
              isChildMoim
                ? "button_leave_child_moim"
                : "button_leave_parent_moim"
            }
          />
        ),
        textColor: themeContext?.theme.colorV2.colorSet.grey800,
        disabled: !confirmed,
        onClick: doLeave,
      },
    ],
    [closeConfirmAlert, confirmed, doLeave, isChildMoim, themeContext],
  );

  const failedAlertButtons: IButton[] = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="ok_button" />,
        onClick: closeFailedLeaveMoimAlert,
      },
    ],
    [closeFailedLeaveMoimAlert],
  );

  const handleChangeCheckBox: React.MouseEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      setConfirmStatus(e.currentTarget.checked);
    },
    [],
  );

  return (
    <>
      <MoimLeaveComponent
        moimName={currentMoim?.name ?? ""}
        username={currentUser?.name ?? ""}
        isChildMoim={isChildMoim}
        isValidUsername={usernameValidation}
        onChangeUsernameInput={handleUsernameChange}
        onLeaveClick={handleLeaveClick}
      />
      <AlertDialog
        open={isOpenConfirmAlert}
        onClose={closeConfirmAlert}
        title={
          <FormattedMessage
            id={
              isChildMoim
                ? "dialog_leave_child_moim_confirm_title"
                : "dialog_leave_parent_moim_confirm_title"
            }
            values={{ moim_name: currentMoim?.name ?? "" }}
          />
        }
        content={
          <CheckBoxWrapper>
            <Checkbox
              id="double-check-leave"
              checked={confirmed}
              onChange={handleChangeCheckBox}
            />
            <label htmlFor="double-check-leave">
              <FormattedMessage
                id={
                  isChildMoim
                    ? "dialog_leave_child_moim_confirm_body"
                    : "dialog_leave_parent_moim_confirm_body"
                }
              />
            </label>
          </CheckBoxWrapper>
        }
        rightButtons={confirmAlertButtons}
      />
      <AlertDialog
        open={isOpenFailedAlert}
        onClose={closeFailedLeaveMoimAlert}
        content={
          <FormattedMessage
            id={
              isChildMoim
                ? "dialog_leave_child_moim_error_body"
                : "dialog_leave_parent_moim_error_body"
            }
            values={{
              ref_moim_name: moimAliasName?.singular ?? "",
              moim_name: currentMoim?.name ?? "",
            }}
          />
        }
        rightButtons={failedAlertButtons}
      />
    </>
  );
};

export default MoimLeave;
