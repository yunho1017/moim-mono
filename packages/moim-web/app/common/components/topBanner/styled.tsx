import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import CloseIconBase from "@icon/24-close-b.svg";
import { H9BoldStyle, H10BoldStyle } from "../designSystem/typos";
import { TOP_BANNER_HEIGHT } from "./constants";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TopBannerContainer = styled.div<{
  isOpen: boolean;
  forceHidden: boolean;
}>`
  display: ${props => (props.forceHidden ? "none" : "block")};
  width: 100%;
  height: ${px2rem(TOP_BANNER_HEIGHT)};
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: ${props => props.theme.zIndexes.fullscreen};

  animation-duration: 300ms;
  animation-name: ${props => (props.isOpen ? "slide-down" : "slide-up")};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  pointer-events: ${props => (props.isOpen ? "inherit" : "none")};

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    z-index: ${props => props.theme.zIndexes.below};
  }

  @keyframes slide-up {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes slide-down {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CommonTopBannerWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
  z-index: ${props => props.theme.zIndexes.default};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H10BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H9BoldStyle}
  }

  ${props => props.overrideStyle}
`;

export const StatusContainer = styled.div``;

export const MessageContainer = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  display: inline-flex;
  align-items: center;
`;

export const CloseIcon = styled(CloseIconBase).attrs({
  size: "s",
  touch: 40,
})``;
