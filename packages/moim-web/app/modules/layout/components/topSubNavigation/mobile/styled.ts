import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import { TOP_SUB_NAVIGATION_HEIGHT } from "../constant";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  box-shadow: ${props => props.theme.shadow.whiteElevated2};
  height: ${px2rem(TOP_SUB_NAVIGATION_HEIGHT)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.theme.getTopSubAreaElementPalette("background").color};
`;
