import {
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { LocationDescriptor } from "history";
import { FlattenInterpolation, StyledProps } from "styled-components";

export const buttonWidthMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 96],
  ["m", 80],
  ["s", 64],
]);

export const buttonHeightMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 48],
  ["m", 38],
  ["s", 32],
]);

export interface IProps {
  size: Moim.DesignSystem.Size;
  to?: LocationDescriptor;
  isActive?: boolean;
  waiting?: boolean;
  disabled?: boolean;
  loaderColor?: string;
  isFullWidth?: boolean;
}

export const buttonFontStyleMap = new Map<
  Moim.DesignSystem.Size,
  FlattenInterpolation<StyledProps<IProps>>
>([
  ["l", H8BoldStyle as FlattenInterpolation<StyledProps<IProps>>],
  ["m", H10BoldStyle as FlattenInterpolation<StyledProps<IProps>>],
  ["s", H10BoldStyle as FlattenInterpolation<StyledProps<IProps>>],
]);

export const buttonPaddingMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 24],
  ["m", 16],
  ["s", 12],
]);
