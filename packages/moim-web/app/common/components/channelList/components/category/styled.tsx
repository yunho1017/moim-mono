// vendor
import * as React from "react";
import styled, { css } from "styled-components";
// component
import { H10Bold } from "common/components/designSystem/typos";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import DownArrowIconBase from "@icon/18-downarrow-g.svg";

import { px2rem } from "common/helpers/rem";

interface IElementPaletteKeyProps {
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
}

export const Wrapper = styled.div<IElementPaletteKeyProps>`
  position: sticky;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.wrapper};
  background-color: ${props =>
    props.theme.getSideAreaElementPalette("background").color};
`;

export const InnerWrapper = styled.div.attrs({ role: "button" })<
  IElementPaletteKeyProps & {
    isCollapsed: boolean;
    useCollapse: boolean;
  }
>`
  ${props =>
    props.useCollapse &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${props.theme.getSideAreaElementPalette(
          props.elementPaletteKey,
        ).fog50};
      }
    `}
`;

const CategoryNameBase = styled(H10Bold)<IElementPaletteKeyProps>`
  display: block;
  margin-left: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bolder};

  ${props => {
    const palette = props.theme.getSideAreaElementPalette(
      props.elementPaletteKey,
    );
    return css`
      color: ${palette.color ?? palette.fog400};
    `;
  }}
`;

interface ICategoryNameProps extends IElementPaletteKeyProps {
  categoryName: string;
}

export const CategoryName = React.memo(
  ({ categoryName, elementPaletteKey }: ICategoryNameProps) => (
    <CategoryNameBase elementPaletteKey={elementPaletteKey}>
      <NativeEmojiSafeText value={categoryName} />
    </CategoryNameBase>
  ),
);

export const DownArrowIcon = styled(DownArrowIconBase).attrs(props => {
  const palette = props.theme.getSideAreaElementPalette(
    props.elementPaletteKey,
  );
  const iconColor = palette.color ?? palette.fog400;

  return {
    size: "xs",
    touch: 18,
    iconColor,
  };
})<IElementPaletteKeyProps>``;
