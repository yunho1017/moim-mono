import styled, { css } from "styled-components";

export const Media = styled.div<{
  transition: boolean;
  disableMediaOpacity: boolean;
  mediaOpacity: number;
}>`
  z-index: ${props => props.theme.zIndexes.default};
  opacity: 0;
  transition-delay: ${props => (props.transition ? "500ms" : undefined)};
  transition: ${props => (props.transition ? "opacity 500ms" : undefined)};
  ${props =>
    props.disableMediaOpacity && props.mediaOpacity === 0
      ? css`
          display: none;
        `
      : null};
`;

export const SkeletonContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  display: flex;
`;

export const BlurHash = styled.div`
  z-index: ${props => props.theme.zIndexes.below};
`;

export const Wrapper = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndexes.default};

  ${BlurHash} {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;
