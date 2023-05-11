import * as React from "react";
import styled from "styled-components";

import AlertDialog from "../";

import { B1Regular } from "common/components/designSystem/typos";
import CheckMarkOffIconBase from "@icon/24-checkmark-off.svg";
import CheckMarkOnIconBase from "@icon/24-checkmark-on.svg";

import { px2rem } from "common/helpers/rem";
import { IButton } from "common/components/modalLayout/alert/types";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckInputWrapper = styled(B1Regular).attrs({ role: "button" })`
  margin-top: ${px2rem(8)};
  display: flex;
  align-items: center;
`;

export const CheckInputLabel = styled.label`
  margin-left: ${px2rem(15)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  flex: 1;
  min-width: 0;
`;

export const CheckMarkOffIcon = styled(CheckMarkOffIconBase).attrs({
  size: "s",
})``;

export const CheckMarkOnIcon = styled(CheckMarkOnIconBase).attrs({
  size: "s",
})``;

interface IProps extends React.ComponentProps<typeof AlertDialog> {
  confirmMessage: React.ReactNode;
  positiveButtonProps: IButton;
  negativeButtonProps: IButton;
  disableCheckButton?: boolean;
}

const ConfirmDialog: React.FC<IProps> = ({
  content,
  confirmMessage,
  positiveButtonProps,
  negativeButtonProps,
  disableCheckButton,
  onClose,
  ...props
}) => {
  const [isAgreement, setIsAgreement] = React.useState<boolean>(false);
  const handleClickAgreement = React.useCallback(() => {
    setIsAgreement(value => !value);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsAgreement(false);
    onClose();
  }, [onClose]);

  const handlePositiveButtonClick = React.useCallback(() => {
    setIsAgreement(false);
    positiveButtonProps.onClick();
  }, [positiveButtonProps]);

  const handleNegativeButtonClick = React.useCallback(() => {
    setIsAgreement(false);
    negativeButtonProps.onClick();
  }, [negativeButtonProps]);

  const positiveButton: IButton = React.useMemo(
    () => ({
      text: positiveButtonProps.text,
      disabled: disableCheckButton ? false : !isAgreement,
      onClick: handlePositiveButtonClick,
    }),
    [
      disableCheckButton,
      handlePositiveButtonClick,
      isAgreement,
      positiveButtonProps.text,
    ],
  );
  const negativeButton: IButton = React.useMemo(
    () => ({
      text: negativeButtonProps.text,
      onClick: handleNegativeButtonClick,
    }),
    [handleNegativeButtonClick, negativeButtonProps.text],
  );
  return (
    <AlertDialog
      content={
        <Content>
          {content}
          {!disableCheckButton && (
            <CheckInputWrapper onClick={handleClickAgreement}>
              {isAgreement ? <CheckMarkOnIcon /> : <CheckMarkOffIcon />}
              <CheckInputLabel>{confirmMessage}</CheckInputLabel>
            </CheckInputWrapper>
          )}
        </Content>
      }
      rightButtons={[negativeButton, positiveButton]}
      onClose={handleClose}
      {...props}
    />
  );
};

export default ConfirmDialog;
