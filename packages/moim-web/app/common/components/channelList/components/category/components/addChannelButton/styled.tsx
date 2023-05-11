import styled from "styled-components";
import AddIconBase from "@icon/18-add-g.svg";
import { px2rem } from "common/helpers/rem";

interface IElementPaletteKeyProps {
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
}

export const Button = styled.button<IElementPaletteKeyProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${px2rem(12)});

  &:hover {
    background-color: ${props =>
      props.theme.getSideAreaElementPalette(props.elementPaletteKey).fog50};
  }
`;

export const AddIcon = styled(AddIconBase).attrs(props => {
  const palette = props.theme.getSideAreaElementPalette(
    props.elementPaletteKey,
  );
  const iconColor = palette.color ?? palette.fog600;

  return {
    size: "xs",
    touch: 42,
    iconColor,
  };
})<IElementPaletteKeyProps>``;
