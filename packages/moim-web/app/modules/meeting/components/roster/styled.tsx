import styled from "styled-components";
import CloseIcon from "@icon/18-close-w.svg";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => (theme as any).mediaQueries.min.md} {
    width: ${props => (props.theme as any).roster.maxWidth};
  }
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  box-shadow: 1rem 1rem 3.75rem 0 rgba(0, 0, 0, 0.1);
  border-left: 0.0625rem solid
    ${props => (props.theme as any).roster.containerBorder};
  border-right: 0.0625rem solid
    ${props => (props.theme as any).roster.containerBorder};
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(360)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.default};
  }

  .ch-title {
    ${H8BoldStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
  .ch-buttons {
    button {
      padding: 0;
      font-size: inherit;
      border-radius: 0;
      border: none;
    }

    button:hover {
      background-color: initial;
      color: inherit;
    }
    .ch-icon {
      width: ${px2rem(24)};
      height: ${px2rem(24)};
      svg > g {
        fill: ${props => props.theme.colorV2.colorSet.grey800};
      }
    }
  }

  .roster-attendee-group {
    overflow: auto;
    min-height: 0;
    height: 100%;
    flex: 1;

    > div {
      background-color: transparent;
    }
  }

  .roster-attendee {
    height: ${px2rem(42)};
    .ch-name {
      ${B1RegularStyle};
      color: ${props => props.theme.colorV2.colorSet.grey600};
    }
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

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: ${px2rem(16)};

  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const MuteButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: fit-content;
`;

export const Close = styled(CloseIcon).attrs(props => ({
  size: "xs",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
