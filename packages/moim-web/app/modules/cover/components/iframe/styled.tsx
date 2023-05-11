import styled from "styled-components";
import CloseIconBase from "@icon/24-close-bg-w.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CloseIconButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 24,
})``;

export const CloseButtonWrapper = styled.div`
  position: fixed;
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  top: ${px2rem(16)};
  right: ${px2rem(16)};
`;

export const IFrame = styled.iframe`
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: 100%;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: 100vh;
  }
`;
