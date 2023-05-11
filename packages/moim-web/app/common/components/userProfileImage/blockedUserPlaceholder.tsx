import * as React from "react";
import styled from "styled-components";

import BlockedUserXLIcon from "@icon/blocked-user-placeholder-xl.svg";
import BlockedUserLIcon from "@icon/blocked-user-placeholder-l.svg";
import BlockedUserMIcon from "@icon/blocked-user-placeholder-m.svg";
import BlockedUserSIcon from "@icon/blocked-user-placeholder-s.svg";
import BlockedUserXSIcon from "@icon/blocked-user-placeholder-xs.svg";
import { ImageStyle } from "./styledComponents";

interface IBlockedUserIconProps {
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

interface IBlockedUserPlaceholder extends IBlockedUserIconProps {
  size: Moim.DesignSystem.Size;
}
export const BlockedUserXL = styled(BlockedUserXLIcon)<IBlockedUserIconProps>`
  ${ImageStyle}
`;
export const BlockedUserL = styled(BlockedUserLIcon)<IBlockedUserIconProps>`
  ${ImageStyle}
`;
export const BlockedUserM = styled(BlockedUserMIcon)<IBlockedUserIconProps>`
  ${ImageStyle}
`;
export const BlockedUserS = styled(BlockedUserSIcon)<IBlockedUserIconProps>`
  ${ImageStyle}
`;
export const BlockedUserXS = styled(BlockedUserXSIcon)<IBlockedUserIconProps>`
  ${ImageStyle}
`;

export const BlackedUserPlaceholder = ({
  size,
  elementPaletteProps,
}: IBlockedUserPlaceholder) => {
  switch (size) {
    case "xl":
      return <BlockedUserXL elementPaletteProps={elementPaletteProps} />;
    case "l":
      return <BlockedUserL elementPaletteProps={elementPaletteProps} />;
    case "m":
      return <BlockedUserM elementPaletteProps={elementPaletteProps} />;
    case "s":
      return <BlockedUserS elementPaletteProps={elementPaletteProps} />;
    case "xs":
      return <BlockedUserXS elementPaletteProps={elementPaletteProps} />;
    default:
      return null;
  }
};
