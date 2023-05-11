import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ShavedText from "common/components/shavedText";
import {
  B2RegularStyle,
  B3RegularStyle,
  H10BoldStyle,
  B4Regular,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import { CommonBadge as AlertBadgeBase } from "common/components/alertBadge";
import { BGLevel2 } from "../designSystem/BGLevel";

const MAX_CARD_WIDTH = 343;
const MIN_CARD_WIDTH = 261;
export const COMPACT_CARD_WIDTH: number = 220;
const HOVERED_MARGIN_TOP = -8;

export const Wrapper = styled(BGLevel2)<{
  isCompact?: boolean;
}>`
  position: relative;

  ${props =>
    props.isCompact
      ? css`
          width: ${px2rem(COMPACT_CARD_WIDTH)};
        `
      : css`
          max-width: ${px2rem(MAX_CARD_WIDTH)};
          min-width: ${px2rem(MIN_CARD_WIDTH)};
        `};

  height: 100%;
  border-radius: ${px2rem(6)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  will-change: transform;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: translateY(${px2rem(HOVERED_MARGIN_TOP)}) translateZ(0);
  }
`;

export const ContentRow = styled.div`
  width: 100%;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(22)};
  display: flex;
  flex-direction: column;

  ${ContentRow} + ${ContentRow} {
    margin-top: ${px2rem(2)};
  }
`;

export const MoimName = styled(ShavedText)`
  ${B2RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MoimDescription = styled(ShavedText)`
  ${B3RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const MoimStatus = styled(B4Regular)``;

export const MoimStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${MoimStatus} + ${MoimStatus}:before {
    content: "･";
    margin: 0 ${px2rem(2)};
  }
`;

export const ButtonSection = styled.div`
  padding: 0 ${px2rem(16)} ${px2rem(16)};
  width: 100%;
`;

export const NormalButton = styled(GhostGeneralButton).attrs({
  size: "s",
  withoutBG: true,
})`
  ${H10BoldStyle};
  text-align: center;
  line-height: ${px2rem(28)};
  width: 100%;
  border-radius: ${px2rem(4)};
`;

export const JoinedButton = styled(GhostGeneralButton).attrs({
  size: "s",
  isActive: true,
})`
  ${H10BoldStyle};
  text-align: center;
  line-height: ${px2rem(28)};
  width: 100%;
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border: none;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ImageBail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(1, 5, 5, 0.3) 0%,
    rgba(1, 5, 5, 0) 100%
  );
`;

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const BannerStyle = css<{ periodStatus?: Moim.Group.GroupPeriodType }>`
  ${props =>
    props.periodStatus === "terminated" &&
    css`
      filter: grayscale(100%);
      opacity: 0.4;
    `}
`;

export const MoimCardActiveDim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${Wrapper}:active & {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const groupProfileImageStyle = css`
  position: absolute;
  bottom: ${px2rem(-8)};
  left: ${px2rem(10)};
  z-index: ${props => props.theme.zIndexes.default};
  border-radius: ${px2rem(4)};
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: ${props =>
      `solid ${px2rem(2)} ${props.theme.colorV2.colorSet.white1000}`};
    border-radius: ${px2rem(4)};
    box-sizing: border-box;
  }
`;

export const Tag = styled.label`
  padding: ${px2rem(1)} ${px2rem(6)};
  max-width: ${px2rem(150)};
  border-radius: ${px2rem(10)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  z-index: ${props => props.theme.zIndexes.default};
  ${B4RegularStyle}
`;

export const RemainingTagCount = styled(Tag)`
  max-width: ${px2rem(35)};
`;

export const TagWrapper = styled.div`
  display:flex;
  flex-wrap: nowrap;
  margin-top: ${px2rem(4)};

  ${Tag} + ${Tag} {
    margin-left:${px2rem(4)}
  }
`;

export const AlertBadge = styled(AlertBadgeBase)`
  position: absolute;
  top: ${px2rem(12)};
  right: ${px2rem(12)};
`;
