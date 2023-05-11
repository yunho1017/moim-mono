import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { B3Regular } from "../designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Layer = styled.div.attrs({ role: "button" })`
  pointer-events: auto;
  box-sizing: border-box;
  position: relative;
  z-index: ${props => props.theme.zIndexes.toast};
  box-shadow: ${props => props.theme.shadow.whiteElevated3};
  border-radius: ${px2rem(4)};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${px2rem(4)};
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    z-index: ${props => props.theme.zIndexes.below};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
  }
`;

export const Wrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.bgColor ?? props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(14)} ${px2rem(16)};
  position: relative;
  width: 100%;
`;

export const Message = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.fog800};
  flex: 1;
  min-width: 0;
`;

export const SnackbarIconClickWrapper = styled.div<{
  width?: number;
  height?: number;
}>`
  width: ${props => (props.width !== undefined ? px2rem(props.width) : "auto")};
  height: ${props =>
    props.height !== undefined ? px2rem(props.height) : "auto"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${px2rem(4)};
`;
