import * as React from "react";
import styled from "styled-components";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { ThemeType } from "../badgeClaimComponent";
import { rgba } from "polished";

export const RootWrapper = styled.div<{ backgroundColor?: string }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: fit-content;
  min-height: ${px2rem(90)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0 rgba(31, 38, 42, 0.2);
  background-color: ${props =>
    props.backgroundColor ??
    props.theme.themeMode.lightPalette.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const Container = styled.div`
  width: 100%;
  min-height: ${px2rem(90)};
  padding: ${px2rem(5)} ${px2rem(16)} ${px2rem(12)};
`;

export const HintWrapper = styled.div<{
  selectedTheme: ThemeType;
  textColor: string;
}>`
  ${B4RegularStyle};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${px2rem(2)} 0;
  margin-bottom: ${px2rem(4)};
  color: ${props => rgba(props.textColor, 0.38)};
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(48)};
  gap: ${px2rem(12)};
`;

interface IAdditionalButtonProps
  extends React.ComponentProps<typeof FlatGeneralButton> {
  buttonColor: string;
  selectedTheme: ThemeType;
}

export const RegularButton = styled(FlatGeneralButton).attrs<
  IAdditionalButtonProps
>(props => ({
  size: "l",
  loaderColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800,
}))<IAdditionalButtonProps>`
  width: 100%;
  flex: 1;
  min-width: 0;
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800};
  background-color: ${props => rgba(props.buttonColor, 0.86)};
`;
