import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  CheckBoxWrapper,
  DeleteButton,
  DeleteButtonWrapper,
  Description,
  Label,
  Title,
  Wrapper,
  StyledErrorMessage,
} from "./styled";
import { BaseItemCell } from "common/components/itemCell";
import ResponsiveDialog from "common/components/responsiveDialog";
import { Checkbox } from "common/components/designSystem/inputs";
import { MarginSize } from "app/enums";
import { useHandlers, useProps } from "./hooks";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

export interface IProps {
  open: boolean;
  positionId: Moim.Id;
  positionName: string;
  onClose: () => void;
}

const ErrorMessage = React.memo(
  ({ error }: { error?: Moim.IErrorResponse }) => {
    if (!error) {
      return null;
    }
    switch (error.code) {
      case "NOT_ALLOWED_POSITION":
        return (
          <StyledErrorMessage>
            <FormattedMessage id="position_settings/position/deletion/super_position_dialog_body" />
          </StyledErrorMessage>
        );

      default:
        return <StyledErrorMessage>{error.message}</StyledErrorMessage>;
    }
  },
);

function PositionDeleteDialog(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    intl,
    open,
    onClose,
    wrapperRef,
    wrapperHeight,
    isMobile,
    isChecked,
    positionName,
    deletePositionError,
  } = hookProps;
  const { handleClickCheckbox, handleDeletePosition } = hookHandlers;
  const title = React.useMemo(
    () => (
      <FormattedMessage id="position_settings/position/deletion/page_title" />
    ),
    [],
  );

  return (
    <ResponsiveDialog
      open={open}
      onCloseRequest={onClose}
      titleElement={title}
      titleAlignment="Center"
      minHeight={wrapperHeight}
    >
      <Wrapper ref={wrapperRef}>
        {isMobile && <Title>{title}</Title>}

        <Description>
          <NativeEmojiSafeText
            value={intl.formatMessage(
              { id: "position_settings/position/deletion/page_description" },
              { position_name: positionName },
            )}
          />
        </Description>

        <CheckBoxWrapper onClick={handleClickCheckbox}>
          <BaseItemCell
            title={
              <Label>
                <FormattedMessage id="position_settings/position/deletion/agreement" />
              </Label>
            }
            leftElement={{
              element: <Checkbox checked={isChecked} />,
              props: {
                leftContentsSize: "s",
                margin: {
                  left: MarginSize.ZERO,
                  right: MarginSize.TWELVE,
                },
              },
            }}
            size="xs"
          />
        </CheckBoxWrapper>

        <DeleteButtonWrapper>
          <DeleteButton
            size="l"
            disabled={!isChecked}
            onClick={handleDeletePosition}
          >
            <FormattedMessage id="delete_button" />
          </DeleteButton>
          <ErrorMessage error={deletePositionError} />
        </DeleteButtonWrapper>
      </Wrapper>
    </ResponsiveDialog>
  );
}

export default PositionDeleteDialog;
