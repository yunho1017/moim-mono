import styled, { css } from "styled-components";
import { crop } from "aspectratio";
import { px2rem } from "common/helpers/rem";
import DownArrowIconBase from "@icon/18-downarrow-g.svg";
import UpArrowIconBase from "@icon/18-uparrow-g.svg";

import MobileDownArrowIconBase from "@icon/24-spread-arrow-g.svg";
import MobileUpArrowIconBase from "@icon/24-collapse-arrow-g.svg";

import { MEDIA_QUERY } from "common/constants/responsive";
import { TOOLBAR_HEIGHT } from "../../styled";
import { H10BoldStyle } from "common/components/designSystem/typos";

export const MOBILE_REMOTE_VIDEO_GAP = 8;
export const MOBILE_REMOTE_VIDEO_SIDE_PADDING = 8;
export const PC_REMOTE_VIDEO_GAP = 8;
const PAGE_BUTTON_HEIGHT = 40;
export const PAGE_BUTTON_TOTAL_HEIGHT = 140; // Up and Bottom, each height is 40(height)+12(top-padding)+16(bottom-padding) And 4 is adjustment

export const Container = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background-color: black;
  padding: ${px2rem(16)} ${px2rem(8)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
    align-items: center;
    padding: 0;
    max-height: ${`calc(100% - ${px2rem(TOOLBAR_HEIGHT)})`};
    justify-content: center;
  }
`;

export const MobileRemoteInner = styled.div<{ childrenWidth?: number }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  gap: ${px2rem(MOBILE_REMOTE_VIDEO_GAP)};
  padding: ${px2rem(MOBILE_REMOTE_VIDEO_SIDE_PADDING)};

  .video {
    width: ${props =>
      props.childrenWidth ? px2rem(props.childrenWidth) : "100%"};
    height: ${props =>
      props.childrenWidth
        ? px2rem(props.childrenWidth)
        : `calc(50vw - ${px2rem(16)})`};
  }
`;

export const RemoteVideos = styled.div<{
  childVideoSize?: { width: number; height: number };
}>`
  position: relative;

  .scroll-box {
    width: 100%;
    height: 100%;
  }

  .video {
    overflow: hidden;
    border-radius: ${px2rem(8)};

    video {
      border-radius: ${px2rem(8)};
      @media ${MEDIA_QUERY.ONLY_MOBILE} {
        border-radius: ${px2rem(4)};
      }
    }

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      border-radius: ${px2rem(4)};
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    min-height: 0;
    flex: 1;
    overflow: hidden;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 25%;
    height: 100%;
    margin-left: ${px2rem(8)};

    .scroll-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .video {
      width: 100%;
      height: ${px2rem(227)};
      ${({ childVideoSize }) => {
        if (childVideoSize) {
          return css`
            width: ${px2rem(Math.floor(childVideoSize.width))};
            height: ${px2rem(Math.floor(childVideoSize.height))};
          `;
        }
      }}
    }

    .video + .video {
      margin-top: ${px2rem(PC_REMOTE_VIDEO_GAP)};
    }
  }
`;

export const FeaturedVideo = styled.div`
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: fit-content;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 75%;
    flex: 1;
    min-width: 0;
    min-height: 0;
  }
`;

export const VideoContainer = styled.div<{ width: number; height: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100vw;
    height: calc(50vw);

    .video {
      width: 100%;
      height: 100%;
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    .video {
      ${({ width, height }) => {
        const [, , reWidth, reHeight] = crop(width, height, "1:2!h");
        return css`
          width: ${width ? px2rem(Math.floor(reWidth)) : "100%"};
          height: ${height ? px2rem(Math.floor(reHeight)) : "100%"};
        `;
      }}
    }
  }
`;

export const PageButtonContainer = styled.div<{ position: "top" | "bottom" }>`
  position: relative;
  width: 100%;
  z-index: ${props => props.theme.zIndexes.default};
  user-select: none;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(12)} 0 ${px2rem(16)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: flex;
    justify-content: center;
  }

  ${props =>
    props.position === "top"
      ? css`
          @media ${MEDIA_QUERY.ONLY_MOBILE} {
            padding-top: ${px2rem(8)};
          }
          ::before {
            z-index: ${props.theme.zIndexes.below};
            content: "";
            position: absolute;
            width: 100%;
            height: ${px2rem(100)};
            top: 0;
            left: 0;
            right: 0;
            transform: rotate(-180deg);
            background-image: linear-gradient(
              to bottom,
              rgba(1, 5, 5, 0) 0%,
              rgba(1, 5, 5, 0.8) 100%
            );
          }
        `
      : css`
          @media ${MEDIA_QUERY.ONLY_MOBILE} {
            padding-bottom: ${px2rem(8)};
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
          }
          ::before {
            z-index: ${props.theme.zIndexes.below};
            content: "";
            position: absolute;
            width: 100%;
            height: ${px2rem(100)};
            bottom: 0;
            left: 0;
            right: 0;
            background-image: linear-gradient(
              to bottom,
              rgba(1, 5, 5, 0) 0%,
              rgba(1, 5, 5, 0.8) 100%
            );
          }
        `}
`;

export const PageButtonWrapper = styled.div.attrs({ role: "button" })`
  cursor: pointer;
  height: ${px2rem(PAGE_BUTTON_HEIGHT)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${px2rem(4)};
  gap: ${px2rem(8)};
  transition: background-color 400ms ease-in-out;
  background-color: ${props => props.theme.colorV2.colorSet.white10};


  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    :hover {
      background-color: ${props => props.theme.colorV2.colorSet.white50};
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    background-color: ${props => props.theme.colorV2.colorSet.white50};
    width: ${px2rem(120)};
  }

  span {
    ${H10BoldStyle}
    color: ${props => props.theme.colorV2.colorSet.white1000};
  }
`;

export const DownArrowIcon = styled(DownArrowIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const UpArrowIcon = styled(UpArrowIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const MobileDownArrowIcon = styled(MobileDownArrowIconBase).attrs(
  props => ({
    size: "s",
    iconColor: props.theme.colorV2.colorSet.white1000,
  }),
)``;

export const MobileUpArrowIcon = styled(MobileUpArrowIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;
