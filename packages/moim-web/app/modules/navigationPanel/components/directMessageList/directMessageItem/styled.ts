// vendor
import styled, { css } from "styled-components";

// component
import { B3Regular } from "common/components/designSystem/typos";

interface IDefaultProps {
  isSelected: boolean;
  isUnread: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

export const Wrapper = styled.div<IDefaultProps>`
  cursor: pointer;

  transition: background-color 200ms ease-in;
  &:hover {
    background-color: ${props =>
      props.theme.getSideAreaElementPalette("menuText").fog50};
  }

  ${({ isSelected, theme, elementPaletteProps }) => {
    switch (true) {
      case isSelected:
        return css`
          background-color: ${theme.getThemeElementColor({
            targetColor: "fog100",
            elementPalette: elementPaletteProps,
            fallback: theme.colorV2.colorSet.grey100,
          })};

          &:hover {
            background-color: ${theme.getThemeElementColor({
              targetColor: "fog50",
              elementPalette: elementPaletteProps,
              fallback: theme.colorV2.colorSet.grey100,
            })}
        `;
    }
  }}
`;

interface ICategoryNameProps extends IDefaultProps {
  leftMargin: boolean;
}
export const ChannelName = styled(B3Regular)<ICategoryNameProps>`
  display: flex;
  min-width: 0;
  flex: 1;

  font-weight: ${props => props.theme.font.regular};
  color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey600,
    })};

  ${({ isSelected, isUnread, theme, elementPaletteProps }) => {
    let style = "";

    switch (true) {
      case isUnread:
        style += `font-weight: ${theme.font.bolder};`;
      // eslint-disable-next-line no-fallthrough
      case isSelected:
        style += `color: ${theme.getThemeElementColor({
          targetColor: "fog800",
          elementPalette: elementPaletteProps,
          fallback: theme.colorV2.colorSet.grey800,
        })}`;
        break;
    }
    return css`
      ${style}
    `;
  }};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
