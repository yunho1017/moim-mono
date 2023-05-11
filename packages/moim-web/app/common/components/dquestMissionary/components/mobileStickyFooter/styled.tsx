import * as React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { LinearProgress } from "@mui/material";
import { px2rem } from "common/helpers/rem";
import {
  FlatGeneralButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { ThemeType } from "../../component";
import RetryIconBase from "@icon/18-retry-b.svg";
import useTheme from "app/theme/hooks/useTheme";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "s",
  iconColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800,
}))<{
  selectedTheme: ThemeType;
}>``;

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

export const HintWrapper = styled.div<{ selectedTheme: ThemeType }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${px2rem(2)} 0;
  margin-bottom: ${px2rem(4)};
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey300
      : props.theme.themeMode.lightPalette.colorSet.white300};
  ${B4RegularStyle}
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(48)};
  gap: ${px2rem(12)};
`;

interface IAdditionalButtonProps
  extends React.ComponentProps<
    typeof FlatGeneralButton | typeof GhostGeneralButton
  > {
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
  background-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800};
`;

export const RegularGhostButton = styled(GhostGeneralButton).attrs<
  IAdditionalButtonProps
>(props => ({
  size: "l",
  loaderColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800,
}))<IAdditionalButtonProps>`
  width: 100%;
  flex: 1;
  min-width: 0;
  border-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
`;

export const RetryButton = styled(GhostGeneralButton).attrs<
  IAdditionalButtonProps
>(props => ({
  size: "l",
  loaderColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800,
}))<IAdditionalButtonProps>`
  min-width: inherit;
  padding: unset;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
`;

const ProgressWrapper = styled.div<{ barColor?: string }>`
  width: 100%;
  height: 100%;
  height: ${px2rem(8)};
  background-color: ${props => rgba(props.theme.color.green400, 0.14)};
  border-radius: unset;
  overflow: hidden;

  .lp-root {
    height: ${px2rem(8)};
    border-radius: unset;
    background-color: transparent;
  }

  .lp-barPrimary {
    height: ${px2rem(8)};
    border-radius: ${px2rem(100)};
    background-color: ${props => props.barColor ?? props.theme.color.green400};
  }
`;

interface IProps {
  value: number;
}
export const Progress: React.FC<IProps> = ({ value }) => {
  const theme = useTheme();

  return (
    <ProgressWrapper barColor={theme?.theme.color.green400}>
      <LinearProgress
        variant="determinate"
        classes={{ root: "lp-root", barColorPrimary: "lp-barPrimary" }}
        value={value}
      />
    </ProgressWrapper>
  );
};
