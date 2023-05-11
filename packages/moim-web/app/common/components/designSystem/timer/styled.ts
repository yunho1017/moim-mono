import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H8BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

interface IElementPaletteKeyProps {
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

const blinkAnimation = css`
  animation: 1s blinkAnim infinite ease-in-out;

  @keyframes blinkAnim {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const TimerWrapper = styled.div<IElementPaletteKeyProps>`
  width: 100%;
  height: ${px2rem(40)};
  display: flex;
  padding: 0 ${px2rem(16)};
  color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey800,
    })};
`;

export const TimeSep = styled.div`
  ${blinkAnimation};
`;

export const UnitCount = styled.div`
  ${H8BoldStyle};
`;

export const UnitDescription = styled.div`
  margin: ${px2rem(13)} 0 ${px2rem(11)} ${px2rem(2)};
  ${B4RegularStyle};
`;

export const Unit = styled.div<{ fixedWidth?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${props => (props.fixedWidth ? `width: ${px2rem(34)};` : null)};

  & + &,
  & + ${TimeSep} {
    margin-left: ${px2rem(14)};
  }
`;
