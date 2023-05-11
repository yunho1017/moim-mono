import styled from "styled-components";
import CloseIconBase from "@icon/24-close-bg-w.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ImageWrapper = styled.div`
  width: 100%;

  margin: 0 auto;
`;
export const Image = styled.img`
  width: 100%;
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
