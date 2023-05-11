import styled, { css } from "styled-components";
import CompleteEngIconBase from "@icon/complete_eng.svg";
import CompleteKrIconBase from "@icon/complete_ko.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { BGLevel2 } from "../designSystem/BGLevel";
import { useOpacityHoverStyle } from "../designSystem/styles";

const COMPLETE_ICON_SIZE = 160;

// NOTE: XL size not exists support size, but i need to control original size of SVG
export const CompleteEngIcon = styled(CompleteEngIconBase).attrs({
  size: "xl",
})`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};
`;

export const CompleteKrIcon = styled(CompleteKrIconBase).attrs({
  size: "xl",
})`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};
`;

export const CompleteBadgeContainer = styled.div`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};
  visibility: hidden;
  position: absolute;
  top: ${px2rem(69)};
  right: ${px2rem(10)};
  z-index: ${props => props.theme.zIndexes.wrapper + 2};
`;

export const Veil = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.4;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  pointer-events: none;
  z-index: ${props => props.theme.zIndexes.wrapper + 1};
`;

export const Wrapper = styled(BGLevel2)<{
  inactive: boolean;
  accomplished: boolean;
}>`
  position: relative;
  width: 100%;
  min-height: ${px2rem(160)};
  height: fit-content;
  border-radius: ${px2rem(7)};
  overflow: hidden;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover::before {
      visibility: visible;
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      ${useOpacityHoverStyle}
    }
  }

  ${props =>
    props.accomplished
      ? css`
          ${CompleteBadgeContainer} {
            visibility: visible;
          }
        `
      : props.inactive
      ? css`
          opacity: 0.4;
        `
      : undefined}
`;
