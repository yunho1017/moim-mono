import * as React from "react";
import styled, { css } from "styled-components";
import { sizeMap, onlineStatusSizeMap, onlineStatusPositionMap } from "./size";
import { px2rem } from "common/helpers/rem";
import UserPlaceholderXLIcon from "@icon/rs-profile-placeholder-xl.svg";
import UserPlaceholderLIcon from "@icon/rs-profile-placeholder-l.svg";
import UserPlaceholderMIcon from "@icon/rs-profile-placeholder-m.svg";
import UserPlaceholderSIcon from "@icon/rs-profile-placeholder-s.svg";
import UserPlaceholderXSIcon from "@icon/rs-profile-placeholder-xs.svg";
import UserPlaceholderIcon from "@icon/userprofile-placeholder.svg";

export const ImageStyle = css<{
  shape?: "square" | "round";
}>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;

  border-radius: ${props => (props.shape === "round" ? "50%" : px2rem(4))};
`;

export const RawImage = styled.img<{
  size: Moim.DesignSystem.Size;
  shape?: "square" | "round";
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  ${ImageStyle};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey10};
`;

export const ClipPathG = styled.g<{ size: Moim.DesignSystem.Size }>`
  width: 100%;
  height: 100%;
  clip-path: url(#userProfile-${props => props.size});
`;

interface IUserPlaceholderIconProps {
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

export const UserPlaceholderXL = styled(UserPlaceholderXLIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;
export const UserPlaceholderL = styled(UserPlaceholderLIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;
export const UserPlaceholderM = styled(UserPlaceholderMIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;
export const UserPlaceholderS = styled(UserPlaceholderSIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;
export const UserPlaceholderXS = styled(UserPlaceholderXSIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;
export const UserPlaceholder = styled(UserPlaceholderIcon).attrs(props => ({
  iconColor: props.theme.getThemeElementColor({
    targetColor: "fog400",
    elementPalette: props.elementPaletteProps,
    fallback: props.theme.colorV2.colorSet.grey300,
  }),
}))<IUserPlaceholderIconProps>`
  ${ImageStyle}
`;

interface IUserPlaceholderWithMaskProps extends IUserPlaceholderIconProps {
  size: Moim.DesignSystem.Size;
}
export const UserPlaceholderWithMask = ({
  size,
  elementPaletteProps,
}: IUserPlaceholderWithMaskProps) => {
  switch (size) {
    case "xl":
      return <UserPlaceholderXL elementPaletteProps={elementPaletteProps} />;
    case "l":
      return <UserPlaceholderL elementPaletteProps={elementPaletteProps} />;
    case "m":
      return <UserPlaceholderM elementPaletteProps={elementPaletteProps} />;
    case "s":
      return <UserPlaceholderS elementPaletteProps={elementPaletteProps} />;
    case "xs":
      return <UserPlaceholderXS elementPaletteProps={elementPaletteProps} />;
    default:
      return null;
  }
};

export const OnlineStatus = styled.div<{ isOnline: boolean }>`
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  /* TODO: 나중에 디자인 가이드 업데이트 되면 컬러 수정 */
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  &::before {
    content: "";
    border-radius: 50%;
    /* TODO: 나중에 디자인 가이드 업데이트 되면 컬러 수정 */
    background-color: ${props =>
      props.isOnline ? "#60ff00" : props.theme.colorV2.colorSet.grey300};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const Wrapper = styled.div<{
  size: Moim.DesignSystem.Size;
  isDefaultImage?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${props => px2rem(sizeMap.get(props.size)!)};
  height: ${props => px2rem(sizeMap.get(props.size)!)};
  ${OnlineStatus} {
    width: ${props => px2rem(onlineStatusSizeMap.get(props.size)!)};
    height: ${props => px2rem(onlineStatusSizeMap.get(props.size)!)};
    right: ${props => px2rem(onlineStatusPositionMap.get(props.size)!.right)};
    bottom: ${props => px2rem(onlineStatusPositionMap.get(props.size)!.bottom)};
  }
`;
export const UserProfileWithMask = styled.g<{ size: Moim.DesignSystem.Size }>`
  clip-path: url(#userProfile-${props => `${props.size}`});
`;

export const UserProfileMaskWrapper = styled.div`
  width: 0;
  height: 0;
`;
