import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import DividerBase from "common/components/divider";
import { PositionType } from "app/typings/thread";

export const Divider = styled(DividerBase).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(1),
}))``;

export const Wrapper = styled.div<{
  thumbnailPosition?: PositionType;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
  padding: 0 0 ${px2rem(4)};

  & > * + * {
    ${({ thumbnailPosition }) => {
      if (thumbnailPosition === "top") {
        return css`
          margin-top: ${px2rem(8)};
        `;
      } else if (thumbnailPosition === "bottom") {
        return css`
          margin-bottom: ${px2rem(8)};
        `;
      } else if (thumbnailPosition === "left") {
        return css`
          margin-left: ${px2rem(12)};
        `;
      } else if (thumbnailPosition === "right") {
        return css`
          margin-right: ${px2rem(12)};
        `;
      }
    }}
  }

  ${props => {
    switch (props.thumbnailPosition) {
      case "top":
        return css`
          flex-direction: column;
        `;
      case "left":
        return css`
          flex-direction: row;
        `;
      case "right":
        return css`
          flex-direction: row-reverse;
        `;
      case "bottom":
        return css`
          flex-direction: column-reverse;
        `;
    }
  }}
`;

export const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;
