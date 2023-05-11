import * as React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import { B4RegularStyle } from "common/components/designSystem/typos";
import UserProfileImage from "common/components/userProfileImage";
import { MEDIA_QUERY } from "common/constants/responsive";
import { ThemeType } from "./components/badgeClaimComponent";

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const HeadCaption = styled.div<{
  selectedTheme: ThemeType;
  textColor: string;
}>`
  ${B4RegularStyle};
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${px2rem(2)} 0;
  margin-bottom: ${px2rem(4)};
  color: ${props => rgba(props.textColor, 0.38)};
`;

export const Head = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-top: ${px2rem(4)};
    padding-bottom: ${px2rem(8)};
  }
`;

interface IAdditionalButtonProps
  extends React.ComponentProps<typeof FlatGeneralButton> {
  buttonColor: string;
  selectedTheme: ThemeType;
}

export const RegularButton = styled(FlatGeneralButton).attrs<
  IAdditionalButtonProps
>(props => ({
  size: "l",
  loaderColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800,
}))<IAdditionalButtonProps>`
  width: 100%;
  flex: 1;
  min-width: 0;
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800};
  background-color: ${props => rgba(props.buttonColor, 0.86)};
`;

const UserProfileWrapper = styled.div<{
  selectedTheme: ThemeType;
}>`
  margin-right: ${px2rem(4)};

  svg[class^="UserPlaceholder"] {
    path:nth-child(1) {
      fill: ${props =>
        props.selectedTheme === "black"
          ? props.theme.themeMode.lightPalette.colorSet.grey400
          : props.theme.themeMode.lightPalette.colorSet.white400};
      fill-opacity: unset;
    }
    path:nth-child(2) {
      fill: ${props =>
        props.selectedTheme === "black"
          ? props.theme.themeMode.lightPalette.colorSet.grey1000
          : props.theme.themeMode.lightPalette.colorSet.white1000};
    }
  }
`;

interface IUserProfilePreviewProps {
  selectedTheme: ThemeType;
  src?: string;
}
export const UserProfilePreview: React.FC<IUserProfilePreviewProps> = ({
  selectedTheme,
  src,
}) => (
  <UserProfileWrapper selectedTheme={selectedTheme}>
    <UserProfileImage size="xs" src={src} />
  </UserProfileWrapper>
);
