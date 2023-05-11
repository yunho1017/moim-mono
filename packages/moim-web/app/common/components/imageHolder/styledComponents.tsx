import styled, { css } from "styled-components";

export const CropTop = styled.div`
  width: 100%;
  height: 100%;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ObjectFit = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const FloatingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const holderCSS = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Image = styled.div`
  ${holderCSS};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const BlurHash = styled.img`
  ${holderCSS};
  z-index: ${props => props.theme.zIndexes.below};
`;
