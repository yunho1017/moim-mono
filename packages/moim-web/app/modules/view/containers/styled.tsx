import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

import MenuIconBase from "@icon/24-menu-b.svg";
import { H8Bold } from "common/components/designSystem/typos";

import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    overflow: hidden;
  }
`;

export const ViewWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    will-change: scroll-position;
    ${useScrollStyle}
  }
`;

export const ChannelName = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(4)};
`;

export const MenuIcon = styled(MenuIconBase).attrs({
  size: "s",
  role: "button",
  touch: 44,
})``;

export const appBarStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-bottom: ${props =>
    `${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: 0;
  }
`;
