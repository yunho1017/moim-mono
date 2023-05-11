import styled from "styled-components";

export const Wrapper = styled.div<{ isScrolling: boolean }>`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
  -ms-scroll-chaining: chained;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: ${props => (props.isScrolling ? "1em" : "0")};
  }

  &::-webkit-scrollbar-track {
  }

  &::-webkit-scrollbar-track:hover {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;
