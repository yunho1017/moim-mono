import styled, { css } from "styled-components";
import Popper from "@mui/material/Popper";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
// icons
import LoudSpeakerIconBase from "@icon/24-loudspeaker-b.svg";
import { B4Regular } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MentionWrapper = styled(Popper)<{
  needScroll: boolean;
  enableSingleLine?: boolean;
  disablePortal?: boolean;
  isMobile?: boolean;
}>`
  min-width: ${px2rem(200)};
  max-width: ${px2rem(360)};
  max-height: ${px2rem(150)};
  will-change: transform;
  transition: transform 0s ease 0s;

  padding: ${px2rem(4)} 0;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(2)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: 1300; // NOTE: equal to post show modal
  box-shadow: ${props => props.theme.shadow.whiteElevated};

  ${props =>
    props.needScroll &&
    css`
      height: 100%;
    `};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-width: inherit;
    width: 100%;
    z-index: ${props => props.theme.zIndexes.toast};
  }
`;

export const Inner = styled.ul`
  width: 100%;
  height: 100%;
  ${useScrollStyle};
  list-style: none;
`;

export const ItemContainer = styled.li.attrs({ role: "button" })`
  display: block;
  z-index: ${props => props.theme.zIndexes.default};
  > button {
    width: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  min-height: ${px2rem(153)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoudSpeakerIcon = styled(LoudSpeakerIconBase).attrs(props => ({
  role: "button",
  size: "s",
  iconColor: props.theme.colorV2.colorSet.fog700,
}))``;

export const TextWrapper = styled.div`
  text-align: start;
`;

export const CommandGuideText = styled(B4Regular)`
  display: inline;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(6)};
`;
