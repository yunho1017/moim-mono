import styled, { css, FlattenInterpolation } from "styled-components";

interface IBannerCommonProps<T = any> {
  styles?: FlattenInterpolation<T>;
}

type ImageBannerProps = {
  imageSrc: string;
} & IBannerCommonProps;

type ColorBannerProps = { color: string } & IBannerCommonProps;

export const Wrapper = styled.div`
  position: relative;
  padding-bottom: 33.3%;
`;

export const bannerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
`;

export const ImageBanner = styled.div<ImageBannerProps>`
  ${bannerStyle}
  ${props => props.styles};
  background-image: url("${props => props.imageSrc}");
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const ColorBanner = styled.div<ColorBannerProps>`
  ${bannerStyle}
  ${props => props.styles};
  background-color: ${props => props.color};
`;
