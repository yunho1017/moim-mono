import styled, { css } from "styled-components";

import CloseIconBase from "@icon/24-close-b.svg";
import BackIconBase from "@icon/24-back-b.svg";

import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const CloseIcon = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
})``;
export const BackIcon = styled(BackIconBase).attrs({ size: "m", touch: 24 })``;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: ${props => props.theme.font.bold};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(12)};
    justify-content: flex-start;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperStyle = css`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: initial;
  }
`;

export const HeaderStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky + 1};
  }
`;
