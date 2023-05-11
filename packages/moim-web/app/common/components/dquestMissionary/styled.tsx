import * as React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import RetryIconBase from "@icon/18-retry-b.svg";
import LockIconBase from "@icon/80-lock.svg";
import { ThemeType } from "./component";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import UserProfileImage from "common/components/userProfileImage";
import {
  B4RegularStyle,
  H9BoldStyle,
} from "common/components/designSystem/typos";

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "xs",
  iconColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800,
}))<{
  selectedTheme: ThemeType;
}>``;

export const LockIcon = styled(LockIconBase).attrs({ size: "xx" })``;

export const LoadContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const HeadCaption = styled.div<{ selectedTheme: ThemeType }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${px2rem(2)} 0;
  margin-bottom: ${px2rem(4)};

  color: ${props =>
    props.selectedTheme === "black"
      ? rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.38)
      : rgba(props.theme.themeMode.lightPalette.colorSet.white1000, 0.38)};
  ${B4RegularStyle}
`;

export const HeadProgressContainer = styled.div`
  width: 100%;
  height: ${px2rem(32)};
  padding: ${px2rem(6)} 0;
  display: flex;
  align-items: center;
`;

export const Head = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-top: ${px2rem(4)};
    padding-bottom: ${px2rem(8)};
  }
`;

export const VerifyAllButton = styled.button<{
  selectedTheme: ThemeType;
  isLoading: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 300ms ease-in-out;
  width: 100%;
  height: 100%;
  gap: ${px2rem(2)};

  ${H9BoldStyle}

  ${RetryIcon} {
    ${props =>
      props.isLoading
        ? css`
            animation-duration: 1s;
            animation-name: AnimCircleRound;
            animation-iteration-count: infinite;
          `
        : undefined}
  }

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    :hover {
      background-color: ${props =>
        props.selectedTheme === "black"
          ? rgba(0, 0, 0, 0.1)
          : rgba(255, 255, 255, 0.1)};
    }
  }

  @keyframes AnimCircleRound {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: ${px2rem(58)};
  padding: ${px2rem(16)};
  border-bottom: 1px solid white;
`;
export const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  padding: ${px2rem(16)};
`;

export const Bottom = styled.div<{
  selectedTheme: ThemeType;
}>`
  width: 100%;
  height: ${px2rem(52)};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${props =>
    props.selectedTheme === "black"
      ? rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.06)
      : rgba(props.theme.themeMode.lightPalette.colorSet.white1000, 0.06)};
`;

interface IAdditionalButtonProps
  extends React.ComponentProps<typeof FlatGeneralButton> {
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
  background-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
`;

export const BlockVeil = styled.div`
  visibility: hidden;
  width: 100%;
  height: 100%;
  border-radius: ${px2rem(44)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: ${props => props.theme.zIndexes.wrapper};

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > [class^="SizeWrapper"] {
    width: 80%;
    height: 80%;

    max-width: ${px2rem(80)};
    max-height: ${px2rem(80)};
    z-index: ${props => props.theme.zIndexes.default};
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;

    background-color: ${props => props.theme.colorV2.colorSet.white800};
  }
`;

export const Body = styled.div<{
  selectedTheme: ThemeType;
  canPlayQuest?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: ${px2rem(16)} 0;

  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    border-radius: ${px2rem(44)};
    flex-direction: column;
    position: relative;
    width: 100%;
    flex: 1;
    min-height: 0;
    background-color: ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey10
        : props.theme.themeMode.lightPalette.colorSet.white10};
    border: 1px solid
      ${props =>
        props.selectedTheme === "black"
          ? rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.06)
          : rgba(props.theme.themeMode.lightPalette.colorSet.white1000, 0.06)};
  }

  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey1000
      : props.theme.themeMode.lightPalette.colorSet.white1000};

  ${Top} {
    border-bottom-color: ${props =>
      props.selectedTheme === "black"
        ? rgba(0, 0, 0, 0.06)
        : rgba(255, 255, 255, 0.06)};
  }

  ${props =>
    !props.canPlayQuest &&
    css`
      cursor: not-allowed;
      ${BlockVeil} {
        visibility: visible;
      }
    `};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    border-radius: ${px2rem(20)};
  }
`;

const UserProfileWrapper = styled.div<{ selectedTheme: ThemeType }>`
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
}) => {
  return (
    <UserProfileWrapper selectedTheme={selectedTheme}>
      <UserProfileImage size="xs" src={src} />
    </UserProfileWrapper>
  );
};
