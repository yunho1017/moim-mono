import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

import WishIconBase from "@icon/24-like-2.svg";
import FallbackImage from "common/components/fallbackImage";

import { MEDIA_QUERY } from "common/constants/responsive";

export const FallbackImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

export const ImageFallback = styled(FallbackImage)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
  overflow: hidden;
`;

export const ImageContainer = styled.div<{
  ratio: string;
  radius?: number;
}>`
  position: relative;
  overflow: hidden;

  ${props => {
    const rW = parseInt(props.ratio.split(":")[0], 10);
    const rH = parseInt(props.ratio.split(":")[1], 10);
    return css`
      width: 100%;
      height: 0;
      padding-top: ${Math.round((rH / rW) * 100)}%;
    `;
  }}

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 400ms ease-in-out;
    object-fit: cover;

    ${props =>
      props.radius &&
      css`
        border-radius: ${px2rem(props.radius)};
      `}
  }
`;

export const WishIcon = styled(WishIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.themeMode.lightPalette.colorSet.white1000,
}))`
  filter: drop-shadow(0 ${px2rem(2)} 1px rgba(0, 0, 0, 0.24));
`;

export const FluidButton = styled.div.attrs({
  role: "button",
})<{ isFavorite?: boolean }>`
  position: absolute;
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  right: ${px2rem(5)};
  bottom: ${px2rem(5)};
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
  background-color: ${props =>
    props.isFavorite ? props.theme.color.red700 : "transparent"};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      background-color: ${props =>
        props.isFavorite
          ? props.theme.color.red700
          : props.theme.colorV2.colorSet.white100};
    }
  }
`;
