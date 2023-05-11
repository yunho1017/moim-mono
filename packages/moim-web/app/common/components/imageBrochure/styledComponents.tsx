import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
// icons
// import DownloadIcon from "@icon/24-download-g.svg";
// import CloseIcon from "@icon/24-close-w.svg";
// import ShareIcon from "@icon/24-shareandr-w.svg";
import ZoomInIcon from "@icon/18-viewexpand.svg";
import ZoomOutIcon from "@icon/18-view-shrink.svg";
import DownloadIcon from "@icon/18-download-w.svg";
import ShareIcon from "@icon/18-share-1.svg";
import CloseIcon from "@icon/24-close-bg-w.svg";
import ArrowIconBase from "@icon/24-back-andr-b.svg";
// component
import {
  noScrollBarStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import UserProfileImage from "common/components/userProfileImage";
import DownloadButton from "common/components/downloadButton";
import {
  H10Bold,
  B4RegularStyle,
} from "app/common/components/designSystem/typos";
import { APP_BAR_HEIGHT } from "app/modules/postShow/components/bottom/components/groupInput/constants";

export const BrochureWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.grey800};
  z-index: 1300; // Note: same as MUI. portal Dialog/Popover/etc.(= 1300)
`;

export const AppBarStickyWrapperStyle = css`
  height: ${px2rem(APP_BAR_HEIGHT)};
  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.grey50} !important;
`;
export const AppBarWrapperStyle = css`
  height: ${px2rem(APP_BAR_HEIGHT)};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: ${px2rem(APP_BAR_HEIGHT)};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndexes.default};
`;

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${px2rem(8)};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled(UserProfileImage).attrs({
  size: "s",
  role: "button",
})`
  path {
    fill: rgba(255, 255, 255, 0.4);
  }
`;

export const TitleInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: ${px2rem(8)};
  flex: 1;
  min-width: 0;
`;

export const Title = styled(H10Bold)`
  color: ${props => props.theme.themeMode.lightPalette.colorSet.white1000};
  width: 100%;
  text-align: center;
  ${useSingleLineStyle};
`;
export const SubTitle = styled.div`
  ${B4RegularStyle};
  color: ${props => props.theme.themeMode.lightPalette.colorSet.white300};
  ${useSingleLineStyle};
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${noScrollBarStyle};

  .react-draggable {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    > img {
      max-height: 100%;
    }
  }
`;

export const ArrowIcon = styled(ArrowIconBase).attrs(props => ({
  role: "button",
  size: "s",
  iconColor: props.theme.themeMode.lightPalette.colorSet.white700,
}))`
  z-index: ${props => props.theme.zIndexes.default};
`;

const CommonArrowContainerStyle = css`
  position: relative;
  z-index: ${props => props.theme.zIndexes.below};
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.white50};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  :hover {
    opacity: 0.6;
  }
`;

export const LeftArrowContainer = styled.div`
  position: fixed;
  top: 50%;
  left: ${px2rem(20)};
`;
export const RightArrowContainer = styled.div`
  position: fixed;
  top: 50%;
  right: ${px2rem(20)};

  ${ArrowIcon} {
    transform: rotate(180deg);
  }
`;

export const ArrowWrapper = styled.div`
  ${CommonArrowContainerStyle}
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.grey700};
`;

export const Content = styled.div`
  z-index: ${props => props.theme.zIndexes.default};
`;

export const DownloadIconButton = styled(DownloadIcon).attrs<{
  disable: boolean;
}>(props => ({
  role: "button",
  size: "xs",
  touch: 42,
  iconColor: props.disable
    ? props.theme.themeMode.lightPalette.colorSet.white400
    : props.theme.themeMode.lightPalette.colorSet.white1000,
  disabled: props.disable,
}))``;

export const CloseButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
  touch: 42,
})``;

export const ZoomInButton = styled(ZoomInIcon).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 42,
  iconColor: props.theme.themeMode.lightPalette.colorSet.white1000,
}))``;

export const ZoomOutButton = styled(ZoomOutIcon).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 42,
  iconColor: props.theme.themeMode.lightPalette.colorSet.white1000,
}))``;

export const ShareButton = styled(ShareIcon).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 42,
  iconColor: props.theme.themeMode.lightPalette.colorSet.white1000,
}))``;

export const MenuDownloadButton = styled(DownloadButton)`
  width: 100%;
  height: 100%;
`;

export const MenuShareButton = styled.div`
  width: 100%;
  height: 100%;
`;

export const PageIndex = styled.div`
  position: fixed;
  bottom: ${px2rem(24)};
  left: 50%;
  user-select: none;

  width: fit-content;
  height: ${px2rem(18)};
  padding: 1px ${px2rem(6)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.grey300};
  border-radius: ${px2rem(10)};

  span {
    color: ${props => props.theme.themeMode.lightPalette.colorSet.white1000};
    ${B4RegularStyle}
  }
`;
