import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { ThemeType } from "../component";

type BUTTON_SIZE = "s" | "l";
const SMALL_HEIGHT = 32;
const LARGE_HEIGHT = 65;

const Container = styled.button<{
  buttonTheme: ThemeType;
  size: BUTTON_SIZE;
  disabled?: boolean;
}>`
  outline: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props =>
    props.size === "s" ? px2rem(SMALL_HEIGHT) : px2rem(LARGE_HEIGHT)};
  overflow: hidden;
  padding: 0 ${px2rem(20)};
  z-index: ${props => props.theme.zIndexes.default};
  text-overflow: ellipsis;
  white-space: pre;

  color: ${props =>
    props.buttonTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800};

  ${props =>
    props.size === "s"
      ? css`
          ${H10BoldStyle}
        `
      : css`
          ${H8BoldStyle}
        `};

  &,
  ::before,
  ::after {
    border-radius: ${props => (props.size === "s" ? px2rem(16) : px2rem(33.5))};
  }

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${props => props.theme.zIndexes.below - 1};
    opacity: 0.8;
    background-color: ${props =>
      props.buttonTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey800
        : props.theme.themeMode.lightPalette.colorSet.white800};
  }
  ::after {
    transition: all 200ms ease-in-out;
    content: "";
    position: absolute;
    width: 100%;
    height: 90%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${props => props.theme.zIndexes.below};
    background-color: ${props =>
      props.buttonTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey800
        : props.theme.themeMode.lightPalette.colorSet.white800};
  }

  ${props =>
    props.disabled
      ? css`
          cursor: disabled;
          pointer-events: not-allowed;
          opacity: 0.7;
        `
      : css`
          cursor: pointer;
        `}
`;

interface IProps {
  buttonTheme?: ThemeType;
  size: BUTTON_SIZE;
  disabled?: boolean;
  onClick?(e: React.MouseEvent): void;
}

const ThreeDButton: React.FC<IProps> = ({
  buttonTheme = "black",
  size,
  disabled,
  children,
  onClick,
}) => (
  <Container
    role="button"
    buttonTheme={buttonTheme}
    size={size}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </Container>
);

export default ThreeDButton;
