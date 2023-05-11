import React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import InfoIconBase from "@icon/18-info-g.svg";
import CheckIconBase from "@icon/18-checkmark-on.svg";
import DeleteIconBase from "@icon/24-delete-b.svg";
import DownloadIconBase from "@icon/24-download-g.svg";
import DownloadCheckIconBase from "@icon/18-checkmark-g.svg";

import { px2rem } from "common/helpers/rem";
import {
  H4Bold,
  B4Regular,
  B3Regular,
  H10Bold,
} from "common/components/designSystem/typos";
import {
  noScrollBarStyle,
  useScrollStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import ChipBase from "common/components/chips";
import { CircularLoading } from "common/components/loading";
import { CouponComponentStatusType } from ".";
import { MEDIA_QUERY } from "common/constants/responsive";
import { BGLevel2 } from "common/components/designSystem/BGLevel";

export const COUPON_WIDTH = 375;
export const COUPON_HEIGHT = 155;
export const COUPON_Y_RATION = 0.414;

export const CouponFrame = styled(BGLevel2)<{
  selected?: boolean;
  hasFocus?: boolean;
  highlightColor?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${px2rem(8)};

  padding: ${px2rem(12)} ${px2rem(16)};
  transition-property: background-color, border;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  ${props =>
    props.selected &&
    css`
      border: 1px solid ${props.theme.colorV2.accent};
      background-color: ${rgba(props.theme.colorV2.accent, 0.14)};
    `};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    ${props =>
      !props.selected &&
      css`
        &:hover {
          background-color: ${props.theme.colorV2.colorSet.grey10};
        }
      `}
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: ${px2rem(8)};
    background-color: transparent;
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    border-radius: ${px2rem(8)};
    z-index: ${props => props.theme.zIndexes.default + 1};
  }

  ${props =>
    props.hasFocus &&
    css`
      ::after {
        animation-duration: 500ms;
        animation-iteration-count: 2;
        animation-name: enterFocusAnim;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
      }
    `}

  @keyframes enterFocusAnim {
    0% {
      visibility: visible;
      background-color: ${props => props.theme.colorV2.colorSet.grey10};
    }

    100% {
      visibility: hidden;
      background-color: ${props =>
        props.highlightColor
          ? props.highlightColor
          : rgba(props.theme.colorV2.accent, 0.14)};
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${px2rem(COUPON_HEIGHT)};
  min-height: fit-content;
  user-select: none;
`;

export const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndexes.default};
  overflow: hidden;
`;

export const Inner = styled.div<{ enableScroll: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 ${px2rem(2)};
  ${props =>
    props.enableScroll
      ? css`
          ${useScrollStyle}
          overscroll-behavior: auto;
          overflow-y: auto;
        `
      : css`
          ${AffectLabel}, ${ConditionLabel} {
            ${useSingleLineStyle}
          }
        `}
  ${noScrollBarStyle}
`;

export const Head = styled.div`
  display: flex;
  margin-bottom: ${px2rem(2)};
`;

export const TitlePrice = styled(H4Bold)<{ inactive: boolean }>`
  width: 100%;
  min-width: 0;
  flex: 1;
  color: ${props =>
    props.inactive
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800};
  display: flex;
  align-items: center;
`;

export const DDayContainer = styled.div`
  width: fit-content;
  margin-left: ${px2rem(16)};
`;

export const ConditionLabel = styled(H10Bold)<{ inactive: boolean }>`
  color: ${props =>
    props.inactive
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800};
`;

export const Bottom = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const AffectLabel = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
`;
export const ErrorLabel = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.color.red700};
`;

export const FullExpiredAtLabel = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(2)} 0;
`;

export const NoticeTitle = styled(B4Regular)`
  width: 100%;
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const NoticeContent = styled(B4Regular)`
  width: 100%;
  padding: ${px2rem(2)} 0;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const MoreInformation = styled.div.attrs({ role: "button" })`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

export const MoreInfoLabel = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-right: ${px2rem(2)};
`;

export const LoadingWrapper = styled.div`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
  display: flex;
  align-items: center;
  justify-content: center;

  margin: ${px2rem(-4)} ${px2rem(-4)} 0 0; // NOTE: for positioning
`;

export const CircleLoading = styled(CircularLoading)``;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CloseIcon = styled(DeleteIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const DownloadIcon = styled(DownloadIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.accent,
}))``;

export const DownloadCheckIcon = styled(DownloadCheckIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const DownloadedIconWrapper = styled.div<{ inactive?: boolean }>`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.accent};
  ${props =>
    props.inactive &&
    css`
      opacity: 0.4;
    `}
`;

export const DownloadIconWrapper = styled.div<{ inactive: boolean }>`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => rgba(props.theme.colorV2.accent, 0.06)};

  ${props =>
    props.inactive &&
    css`
      opacity: 0.4;
      pointer-events: none;
      ${DownloadIcon} {
        pointer-events: none;
      }
    `}
`;

const affectedThingStyle = css`
  & + & {
    ::before {
      content: " · ";
      margin: 0 ${px2rem(4)};
      display: inline-block;
    }
  }
`;

export const AffectedThing = styled.div`
  ${affectedThingStyle}
`;
export const AffectedThingLink = styled.a`
  :hover {
    text-decoration: underline;
  }
  ${affectedThingStyle}
`;

export const CouponChip = styled(ChipBase)<{
  status?: CouponComponentStatusType;
}>`
  ${props => {
    switch (props.status) {
      case "used": {
        return css`
          background-color: ${props.theme.color.cobalt800};
          color: ${props.theme.colorV2.colorSet.white1000};
        `;
      }

      case "scheduled":
      case "expired": {
        return css`
          background-color: ${props.theme.colorV2.colorSet.grey800};
          color: ${props.theme.colorV2.colorSet.white1000};
        `;
      }

      case "deleted": {
        return css`
          background-color: ${props.theme.colorV2.colorSet.fog300};
          color: ${props.theme.colorV2.colorSet.fog800};
        `;
      }

      default: {
        return css`
          background-color: ${props.theme.colorV2.accent};
          color: ${props.theme.colorV2.colorSet.fog800};
        `;
      }
    }
  }};
`;

const CheckIcon = styled(CheckIconBase).attrs(props => ({
  size: "xs",
  icon: props.theme.colorV2.colorSet.fog800,
}))``;

const CheckIconWrapper = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  background-color: ${props => props.theme.colorV2.accent};
  border-radius: 50%;
  margin-left: ${px2rem(4)};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckMark = () => (
  <CheckIconWrapper>
    <CheckIcon />
  </CheckIconWrapper>
);
