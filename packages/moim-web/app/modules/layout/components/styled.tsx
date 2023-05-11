import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SUB_LIST_WIDTH = 320;
export const SIDE_BAR_BASE = 100;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;

  display: flex;
  position: relative;
`;

export const Trigger = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  top: ${px2rem(10)};
  left: ${px2rem(10)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: none;
  }
`;

export const MainWrapper = styled.div`
  flex: 1;
  z-index: ${props => props.theme.zIndexes.wrapper};
  min-width: 0;
`;

export const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${px2rem(50)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  z-index: ${props => props.theme.zIndexes.wrapper};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-left: ${SIDE_BAR_BASE}vw;
  }
`;
