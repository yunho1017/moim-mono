import * as React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import CheckMarkIconBase from "@icon/24-checkmark-w.svg";
import colorSetReconciler from "app/theme/helpers/colorSetReconciler";

export const Switch = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: ${px2rem(44)};
  height: ${px2rem(26)};
  position: relative;
  transition: opacity 300ms, background-color 300ms;
  border-radius: ${px2rem(13)};
  border: none;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  cursor: pointer;
  &::after {
    width: ${px2rem(26)};
    height: ${px2rem(26)};
    border-radius: 50%;
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: ${props => props.theme.zIndexes.default};
    background-color: ${props =>
      colorSetReconciler(
        props.theme.themeMode.lightPalette.colorSet,
        props.theme.colorV2.accentFogType,
      ).fog1000};
    transform: scale(0.85);
    transition: left 300ms, transform 300ms;
    border: ${px2rem(1)} solid
      ${props =>
        rgba(
          colorSetReconciler(
            props.theme.themeMode.lightPalette.colorSet,
            props.theme.colorV2.accentFogType,
          ).fog800,
          0.1,
        )};
    box-shadow: 0 ${px2rem(2)} ${px2rem(2)} 0
        ${props =>
          rgba(
            colorSetReconciler(
              props.theme.themeMode.lightPalette.colorSet,
              props.theme.colorV2.accentFogType,
            ).fog800,
            0.05,
          )},
      0 ${px2rem(2)} ${px2rem(2)} 0
        ${props =>
          rgba(
            colorSetReconciler(
              props.theme.themeMode.lightPalette.colorSet,
              props.theme.colorV2.accentFogType,
            ).fog800,
            0.1,
          )},
      0 ${px2rem(2)} ${px2rem(1)} 0
        ${props =>
          rgba(
            colorSetReconciler(
              props.theme.themeMode.lightPalette.colorSet,
              props.theme.colorV2.accentFogType,
            ).fog800,
            0.05,
          )};
  }
  &:checked {
    background-color: ${props => props.theme.colorV2.accent};
    &::after {
      left: 100%;
      transform: translate3d(-100%, 0, 0) scale(0.85);
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const Radio = styled.input.attrs({ type: "radio" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: ${px2rem(20)};
  height: ${px2rem(20)};
  position: relative;
  transition: opacity 300ms;
  cursor: pointer;
  border: none;
  &::before {
    border-radius: 50%;
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    transition: border-color 300ms;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    border: ${px2rem(2)} solid ${props => props.theme.colorV2.colorSet.grey300};
  }
  &::after {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: ${props => props.theme.zIndexes.default + 1};
  }
  &:checked {
    &::before {
      border-color: ${props => props.theme.colorV2.accent};
    }
    &::after {
      transform: scale(0.5);
      background-color: ${props => props.theme.colorV2.accent};
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const CheckMarkIconWrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const CheckMarkIcon = styled(CheckMarkIconBase).attrs(props => ({
  size: "xs",
  iconColor: colorSetReconciler(
    props.theme.themeMode.lightPalette.colorSet,
    props.theme.colorV2.accentFogType,
  ).fog1000,
}))``;

export const CheckboxBase = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  position: relative;
  transition: opacity 300ms;
  cursor: pointer;
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey300};
  border-radius: ${px2rem(2)};

  &:checked {
    background-color: ${props => props.theme.colorV2.accent};
    border: ${px2rem(1)} solid ${props => props.theme.colorV2.accent};
    & + ${CheckMarkIconWrapper} {
      opacity: 1;
    }
  }

  ${props =>
    Boolean(props.checked) &&
    css`
      background-color: props.theme.colorV2.accent;
      border: ${px2rem(1)} solid props.theme.colorV2.accent;
      & + ${CheckMarkIconWrapper} {
        opacity: 1;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const CheckboxWrapper = styled.div<{ disabled?: boolean }>`
  display: inline-block;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  position: relative;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const Checkbox: React.FC<React.ComponentProps<typeof CheckboxBase>> = ({
  ref: _,
  disabled,
  checked = false,
  ...props
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const handleClick = React.useCallback(
    e => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        ref.current?.click();
      }
    },
    [disabled],
  );

  return (
    <CheckboxWrapper onClick={handleClick} disabled={disabled}>
      <CheckboxBase
        ref={ref}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      <CheckMarkIconWrapper>
        <CheckMarkIcon />
      </CheckMarkIconWrapper>
    </CheckboxWrapper>
  );
};

export const TextInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: ${px2rem(8)} 0;
  border: none;
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(22)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
  background-color: transparent;
`;
