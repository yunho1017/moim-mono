import {
  pB1BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";
import ClaimedIconBase from "@icon/rs-stamp-claimed";
import CompleteIconBase from "@icon/rs-stamp-complete";

interface IStyleProps {
  backgroundColor: string;
  textColor: string;
}

const BADGE_IMAGE_WIDTH_RATIO = 56;
const STATUS_IMAGE_WIDTH_RATIO = 56 * 1.3;

export const StatusImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 30;
  justify-content: center;
  align-items: center;
  display: flex;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: unset;
  }

  img.badgeImage {
    width: ${BADGE_IMAGE_WIDTH_RATIO}%;
    height: 100%;
    ${`filter: drop-shadow(0 ${px2rem(26)} ${px2rem(36)} rgba(0, 0, 0, 0.25))`};
    z-index: 20;
    object-fit: contain;

    @media ${MEDIA_QUERY.ONLY_DESKTOP} {
      margin: unset;
    }
  }

  img.withStatus {
    opacity: 50%;
  }

  .statusImageIcon {
    width: ${STATUS_IMAGE_WIDTH_RATIO}%;
    position: absolute;
    padding: 0;
  }
`;

export const ClaimedIcon = styled(ClaimedIconBase)`
  z-index: 30;
`;

export const CompleteIcon = styled(CompleteIconBase)`
  z-index: 30;
`;

export const BadgePreviewFrame = styled.div<IStyleProps>`
  z-index: 10;
  display: inline-flex !important;
  position: relative !important;
  width: 100%;
  height: 0;
  min-height: 0;
  padding-bottom: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  color: #fff;
  cursor: pointer;
  transition: 0.3s ease;

  p,
  a {
    overflow: hidden;
    text-decoration: none;
    text-decoration-skip-ink: none;
  }

  figure {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100%;
    transform: translate(0, 50%);

    div.imageWrapper {
      width: 100%;
      height: 100%;
      min-height: 100%;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      @media ${MEDIA_QUERY.ONLY_DESKTOP} {
        align-items: center;
        margin: unset;
      }
    }

    .badgeName {
      ${B4RegularStyle};
      color: ${props => props.textColor};
      bottom: 5%;
      padding: 0 5%;
      position: absolute;
      width: 100%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: inline-box;
      z-index: 70;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-align: center;
      text-overflow: ellipsis;
    }
    @media ${MEDIA_QUERY.ONLY_DESKTOP} {
      .badgeName {
        display: none;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    top: 0;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    transition: opacity 0.3s ease;
    z-index: 60;
    padding: ${px2rem(16)};

    .badgeName {
      ${pB1BoldStyle};
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      display: -webkit-box;
    }

    .badgeMoreInfo {
      ${B4RegularStyle};
      display: -webkit-box;
      z-index: 70;
      max-width: 100%;
      word-break: break-word;
      &:empty {
        display: none;
      }
    }
  }

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    &:hover {
      transform: translateY(-8px);
      transition: 0.3s ease;
      box-shadow: 0 0 10px 0 black;
      z-index: 50;
      aside {
        opacity: 1;
        z-index: 80;
      }
      &:before {
        z-index: 80;
        opacity: 0.6;
      }
    }

    &:before {
      content: "";
      background-color: black;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transition: 0.3s ease;
      width: 100%;
      z-index: 50;
    }

    &:after {
      content: "";
      background-image: linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.01),
          rgba(0, 0, 0, 0.015) 50%,
          rgba(0, 0, 0, 0) 50%
        ),
        linear-gradient(
          -45deg,
          rgba(0, 0, 0, 0.01),
          rgba(0, 0, 0, 0.015) 50%,
          rgba(0, 0, 0, 0) 50%
        );
      height: 100%;
      left: 0;
      opacity: 1;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 10;
    }
  }
`;
