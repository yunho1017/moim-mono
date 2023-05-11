import styled, { css } from "styled-components";
import DropdownIconBase from "@icon/18-downarrow-g";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";

export const DropdownIcon = styled(DropdownIconBase).attrs(props => {
  const color = props.theme.getThemeElementColor({
    targetColor: "color",
    elementPalette: props.elementPaletteProps,
  });

  const fallbackColor = props.theme.getThemeElementColor({
    targetColor: "fog600",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey600,
  });
  return {
    size: "xs",
    touch: 30,
    iconColor: color ?? fallbackColor,
  };
})<{ elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps }>``;

export const MoreIconWrapper = styled.div<{
  popoverOpend: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: ${px2rem(2)};

  &:hover {
    background-color: ${props =>
      props.theme.getThemeElementColor({
        targetColor: "fog50",
        elementPalette: props.elementPaletteProps,
        fallback: props.theme.colorV2.colorSet.grey10,
      })};
  }

  ${props =>
    props.popoverOpend &&
    css`
      background-color: ${props.theme.getThemeElementColor({
        targetColor: "fog50",
        elementPalette: props.elementPaletteProps,
        fallback: props.theme.colorV2.colorSet.grey10,
      })};
    `}
`;

export const CategoryName = styled(B3Regular)`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;
