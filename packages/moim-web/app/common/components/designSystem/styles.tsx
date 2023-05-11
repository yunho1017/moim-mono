import styled, { css } from "styled-components";

export const useHoverStyle = css`
  cursor: pointer;
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const useOpacityHoverStyle = css`
  transition: opacity 200ms ease-in;
  &:hover {
    opacity: 0.6;
  }
`;

export const useSelectedStyle = css`
  cursor: pointer;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export interface IHoverSelectedProps {
  hover?: boolean;
  selected?: boolean;
}

export const HoverSelectedStyleWrapper = styled.div<IHoverSelectedProps>`
  ${props => props.hover && useHoverStyle};
  ${props => props.selected && useSelectedStyle};
`;

export const useSingleLineStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const useScrollStyle = css`
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: -moz-scrollbars-none;
  overscroll-behavior-y: contain;
  -ms-scroll-chaining: chained;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const useXScrollStyle = css`
  overflow-y: auto;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  overscroll-behavior-x: contain;
  -ms-scroll-chaining: chained;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const noScrollBarStyle = css`
  -ms-overflow-style: none;
  -webkit-appearance: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  &::-moz-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const enWordKeepAllStyle = css`
  ${props => {
    if (props.theme.locale === "en") {
      return css`
        word-break: keep-all;
      `;
    }
  }}
`;

export const WithENWordKeepAllStyle = styled.span`
  ${enWordKeepAllStyle}
`;
