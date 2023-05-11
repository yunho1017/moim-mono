import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  GhostButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";

const Buttons = styled.div<{ buttonCount: number }>`
  display: flex;
  align-items: center;
  margin: ${px2rem(4)} 0;
  gap: ${px2rem(8)};

  ${props =>
    props.buttonCount % 2 === 0
      ? css`
          flex-wrap: wrap;

          & > * {
            width: calc(50% - ${px2rem(4)});
          }
        `
      : css`
          flex-wrap: wrap;
          & > *:first-child {
            width: 100%;
          }

          & > *:not(:first-child) {
            width: calc(50% - ${px2rem(4)});
          }
        `}
`;

export interface IButton {
  text: React.ReactNode;
  style: "general" | "primary";
  isActive?: boolean;
  disabled?: boolean;
  handler(): void;
}

export interface IButtonCasePaymentProps {
  type: "payment";
  buttons: IButton[];
}

interface IProps {
  buttons: IButton[];
}

const ButtonCasePayment: React.FC<IProps> = ({ buttons }) => {
  const inner = React.useMemo(
    () =>
      buttons.map((button, idx) => {
        if (button.style === "primary") {
          return (
            <GhostButton
              key={`${button.style}_${idx}`}
              size="s"
              isActive={button.isActive}
              disabled={button.disabled}
              onClick={button.handler}
            >
              {button.text}
            </GhostButton>
          );
        }

        return (
          <GhostGeneralButton
            key={`${button.style}_${idx}`}
            size="s"
            isActive={button.isActive}
            disabled={button.disabled}
            onClick={button.handler}
          >
            {button.text}
          </GhostGeneralButton>
        );
      }),
    [buttons],
  );
  return <Buttons buttonCount={buttons.length}>{inner}</Buttons>;
};

export default ButtonCasePayment;
