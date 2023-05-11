import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B2RegularStyle,
  B2Regular,
} from "common/components/designSystem/typos";
// icons
import RemoveIconBase from "@icon/18-remove-g.svg";
import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import SearchIcon2 from "@icon/18-search-2.svg";
import { useScrollStyle } from "common/components/designSystem/styles";
import { getBGLevel3DialogStyle } from "common/components/designSystem/BGLevel";

export const Container = styled.div`
  width: 100%;
  min-width: ${px2rem(140)};
  height: ${px2rem(30)};
  padding: 0 ${px2rem(8)};
  position: relative;
`;

export const FocuseControlWrapper = styled.div<{
  focused: boolean;
}>`
  width: 100%;
  z-index: 0;

  ${props =>
    props.focused
      ? css`
          padding: ${px2rem(8)} ${px2rem(8)} 0;
          border-radius: ${px2rem(4)};
          ${getBGLevel3DialogStyle({ borderRadius: 4 })};
          z-index: ${props.theme.zIndexes.default};
          position: absolute;
          top: -${px2rem(8)};
          left: 0;
          right: 0;
          padding-top: ${px2rem(32)};
        `
      : css`
          display: none;
        `};
`;

export const Wrapper = styled.div<{
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  position: relative;
  width: 100%;
  border-radius: ${px2rem(15)};
  transition: border 0.2s;
  border: 1px solid
    ${props =>
      props.theme.getThemeElementColor({
        targetColor: "color",
        elementPalette: props.elementPaletteProps,
      }) ??
      props.theme.getThemeElementColor({
        targetColor: "fog200",
        elementPalette: props.elementPaletteProps,
        fallback: props.theme.colorV2.colorSet.grey100,
      })};
  background-color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog10",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey10,
    })};
  padding: 0 ${px2rem(2)};
  display: flex;
  align-items: center;
  cursor: text;
  z-index: ${props =>
    props.theme.zIndexes.default + props.theme.zIndexes.default};
  &[data-focused="true"] {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: ${px2rem(15)};
      background-color: ${props => props.theme.colorV2.colorSet.white1000};
      z-index: ${props => props.theme.zIndexes.below};
    }
  }

  &:hover {
    border: 1px solid
      ${props =>
        props.theme.getThemeElementColor({
          targetColor: "color",
          elementPalette: props.elementPaletteProps,
        }) ??
        props.theme.getThemeElementColor({
          targetColor: "fog400",
          elementPalette: props.elementPaletteProps,
          fallback: props.theme.colorV2.colorSet.grey300,
        })};
  }
`;

export const SearchIcon = styled(SearchIconBase).attrs(props => ({
  size: "xs",
  touch: "30",
  iconColor:
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey800,
    }),
}))<{
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  cursor: default;
`;
export const PrimaryColorSearchIcon = styled(SearchIconBase).attrs(props => ({
  size: "xs",
  touch: "42",
  iconColor: props.theme.colorV2.primary.color,
}))``;

export const RemoveIcon = styled(RemoveIconBase).attrs(props => ({
  size: "xs",
  touch: "30",
  iconColor:
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog400",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey300,
    }),
}))``;

export const InputSearchIcon = styled.div``;

export const Input = styled.input<{
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  outline: none;
  border: none;
  width: 100%;
  min-width: 0;
  flex: 1;
  padding: ${px2rem(4)} ${px2rem(6)};
  background: none;
  ${B2RegularStyle};
  color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey800,
    })};
`;

export const MobileSearchIcon = styled(SearchIcon2).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor:
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey800,
    }),
}))<{
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>``;

export const SuggestionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${px2rem(16)};
  padding-bottom: ${px2rem(4)};
  ${useScrollStyle};
`;

export const SearchGo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(42)};
`;

export const SearchKeyword = styled(B2Regular)`
  display: block;
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: ${px2rem(10)} ${px2rem(6)} ${px2rem(10)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
