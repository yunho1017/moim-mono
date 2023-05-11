import styled, { FlattenInterpolation } from "styled-components";

export const ImageWrapper = styled.div<{
  width: number;
  height: number;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: ${props => Math.floor(100 * (props.height / props.width))}%;

  ${props => props.overrideStyle};
`;

export const LoaderContainer = styled.div<{
  isDisplay: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  opacity: ${props => (props.isDisplay ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  ${props => props.overrideStyle};
`;

export const ImgContainer = styled.img<{
  isDisplay: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  opacity: ${props => (props.isDisplay ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${props => props.overrideStyle};
`;
