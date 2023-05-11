import styled, { css } from "styled-components";

export const Left = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: 0;
`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
  width: 100%;
  flex-basis: 100%;
  z-index: ${props => props.theme.zIndexes.default};
`;
export const Wrapper = styled.div<{
  isShowRightPanel: boolean;
  isIOS: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  ${props =>
    !props.isIOS
      ? css`
          ${Left}, ${Right} {
            transition: transform 0.4s ease-in-out 0s;
          }
        `
      : undefined}
  ${Left} {
    ${props =>
      props.isShowRightPanel
        ? css`
            position: fixed;
            transform: translate(-100%, 0px);
            height: 100%;
            overflow: hidden;
          `
        : css`
            position: static;
            transform: none;
          `}
  }
  ${Right} {
    ${props =>
      !props.isShowRightPanel
        ? css`
            position: fixed;
            transform: translate(100%, 0px);
            height: 100%;
            overflow: hidden;
          `
        : css`
            position: static;
            transform: none;
          `}
  }
`;
