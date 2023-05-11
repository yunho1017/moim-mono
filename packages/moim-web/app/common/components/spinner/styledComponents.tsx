import styled, { keyframes } from "styled-components";

const LoadAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  svg {
    fill: none;
    stroke: ${props => props.theme.colorV2.colorSet.grey50};
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    animation: ${LoadAnimation} 0.8s infinite linear;
  }
`;
