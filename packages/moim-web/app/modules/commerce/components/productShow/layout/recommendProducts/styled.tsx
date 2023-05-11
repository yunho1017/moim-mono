import styled, { css } from "styled-components";
import LeftIconBase from "@icon/18-left-tail-arrow-g.svg";
import RightIconBase from "@icon/18-right-tail-arrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { H8Bold, B3Regular } from "common/components/designSystem/typos";
import {
  noScrollBarStyle,
  useScrollStyle,
} from "common/components/designSystem/styles";

export const PRODUCT_ITEM_WIDTH = 150;
export const PRODUCT_ITEM_GAP = 12;

export const Wrapper = styled.div`
  width: 100%;
`;

export const ProductItemCellWrapper = styled.div`
  width: ${px2rem(PRODUCT_ITEM_WIDTH)};

  & + & {
    margin-left: ${px2rem(PRODUCT_ITEM_GAP)};
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 0 ${px2rem(16)};
`;

export const Title = styled(H8Bold)`
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SubTitle = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Body = styled.div`
  width: calc(100% - ${px2rem(32)});
  padding-top: ${px2rem(24)};
  margin: 0 ${px2rem(16)};
  height: fit-content;
  position: relative;
  ${useScrollStyle}
  ${noScrollBarStyle}
    overflow-x: scroll;
  overflow-y: hidden;
  overscroll-behavior-y: initial;

  > div {
    display: flex;
    width: fit-content;
  }
`;

export const LeftIcon = styled(LeftIconBase).attrs({ size: "xs" })``;
export const RightIcon = styled(RightIconBase).attrs({ size: "xs" })``;

export const ArrowButton = styled.div.attrs({ role: "button" })<{
  disabled: boolean;
}>`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `}
  &+& {
    margin-left: ${px2rem(8)};
  }
`;
