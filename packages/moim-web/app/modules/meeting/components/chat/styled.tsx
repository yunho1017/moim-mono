import styled from "styled-components";

import CloseIcon from "@icon/18-close-w.svg";
import { px2rem } from "common/helpers/rem";
import { H8BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const PortalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;

  will-change: height, transform;
  -webkit-overflow-scrolling: touch;
`;

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ theme }) => (theme as any).mediaQueries.min.md} {
    width: ${props => (props.theme as any).roster.maxWidth};
  }
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  box-shadow: 1rem 1rem 3.75rem 0 rgba(0, 0, 0, 0.1);
  border-left: 0.0625rem solid
    ${props => (props.theme as any).roster.containerBorder};
  border-right: 0.0625rem solid
    ${props => (props.theme as any).roster.containerBorder};

  z-index: ${props => props.theme.zIndexes.wrapper};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(360)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${px2rem(44)};
  padding: ${px2rem(11)} ${px2rem(16)};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};

  .close-button {
    padding: 0;
    font-size: inherit;
    border-radius: 0;
    border: none;
  }
  .close-button:hover,
  .close-button:focus {
    background-color: initial;
    color: inherit;
    box-shadow: none;
  }
  .ch-icon {
    width: ${px2rem(24)};
    height: ${px2rem(24)};
    svg > g {
      fill: ${props => props.theme.colorV2.colorSet.grey800};
    }
  }
`;
export const Title = styled.span`
  ${H8BoldStyle};
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 100%;
  min-height: 0;
`;

export const Close = styled(CloseIcon).attrs(props => ({
  size: "xs",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
