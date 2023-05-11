import styled, { css } from "styled-components";
import { px2rem } from "app/common/helpers/rem";
import NextArrowIcon from "@icon/48-carouselarrowright.svg";
import PrevArrowIcon from "@icon/48-carouselarrowleft.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .carousel-root {
    flex: 1;
    min-width: 0;
    width: 0;
  }

  .control-dots {
    margin: 0 0 ${px2rem(8)};
  }

  .thumbs-wrapper {
    margin: ${px2rem(4)} 0 0 0;
  }

  .thumb {
    transition: border 200ms ease-in-out;
    width: ${px2rem(52)} !important;
    height: ${px2rem(52)} !important;
    border: ${px2rem(2)} solid transparent;
    padding: 0;
    margin-right: 0;

    div {
      width: 100% !important;
      height: 100% !important;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    :hover {
      border: ${px2rem(2)} solid ${props => props.theme.colorV2.accent} !important;
    }
  }

  .thumbs {
    display: flex;
    flex-wrap: wrap;
    column-gap: ${px2rem(4)};
    row-gap: ${px2rem(4)};
    transform: initial !important;
  }

  .thumbs > .selected {
    border: ${px2rem(2)} solid ${props => props.theme.colorV2.accent} !important;
  }
`;

export const Image = styled.img<{
  width?: number;
  height?: number;
}>`
  width: ${props => (props.width ? px2rem(props.width) : "100%")} !important;
  height: ${props => (props.height ? px2rem(props.height) : "100%")} !important;
  object-fit: cover !important;
`;

export const ArrowButton = styled.div<{ direction: "left" | "right" }>`
  position: absolute;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  top: 50%;
  transform: translate3d(0px, -50%, 0);
  opacity: 0.5;
  z-index: ${props => props.theme.zIndexes.default};
  ${({ direction }) =>
    direction === "left"
      ? css`
          left: ${px2rem(8)};
        `
      : css`
          right: ${px2rem(8)};
        `};

  &:hover {
    opacity: 1;
  }
`;

export const NextArrow = styled(NextArrowIcon).attrs({
  size: "l",
  touch: 48,
})``;
export const PrevArrow = styled(PrevArrowIcon).attrs({
  size: "l",
  touch: 48,
})``;

export const IndicatorItem = styled.li<{ selected: boolean }>`
  cursor: pointer;
  display: inline-block;
  height: ${px2rem(8)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey200};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  width: ${props => (props.selected ? px2rem(16) : px2rem(8))};
  opacity: ${props => (props.selected ? 1 : 0.2)};
  transition-property: width, opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  & + & {
    margin-left: ${px2rem(8)};
  }
`;
