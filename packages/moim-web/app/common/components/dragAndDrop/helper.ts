import { css } from "styled-components";

export const getDraggableStyle = (isDragging: boolean) =>
  css`
    ${isDragging &&
      css`
        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
        }
      `}
  `;
