import styled, { css } from "styled-components";
import RemoveIconBase from "@icon/18-cancel-g.svg";
import {
  H10BoldStyle,
  B3Regular,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";

export const Wrapper = styled.div<{ highlightEnable: boolean }>`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(2)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  padding: ${px2rem(12)} ${px2rem(16)};

  ${props =>
    props.highlightEnable &&
    css`
      animation-duration: 500ms;
      animation-iteration-count: 2;
      animation-name: highlighting-anim;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    `};

  @keyframes highlighting-anim {
    0% {
      background-color: ${props => props.theme.colorV2.colorSet.grey10};
    }

    100% {
      background-color: ${props => rgba(props.theme.colorV2.accent, 0.06)};
    }
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
`;

export const ProductTitle = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  ${H10BoldStyle};
`;

export const LeftStockSection = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
`;

export const RemoveIcon = styled(RemoveIconBase).attrs({ size: "xs" })``;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  border: none;
  outline: none;
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
`;

export const BottomLeftContainer = styled.div`
  width: ${px2rem(155)};
  min-width: 0;
`;

export const BottomRightContainer = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const PriceLabel = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(2)} ${px2rem(16)};
  padding-right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const NumberBoxWrapperStyle = css`
  background-color: transparent;
  input {
    background-color: transparent;
  }
`;
