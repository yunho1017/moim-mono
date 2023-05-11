import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { noScrollBarStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const DEFAULT_GAP = 12;

export const Wrapper = styled.div<{ gapSize?: number; hasNextPage: boolean }>`
  width: 100%;
  height: fit-content;
  overflow: hidden;

  .react-horizontal-scrolling-menu--scroll-container {
    ${noScrollBarStyle}
  }

  .react-horizontal-scrolling-menu--scroll-container {
    gap: ${props => px2rem(Math.round((props.gapSize ?? DEFAULT_GAP) / 2))};
  }

  .react-horizontal-scrolling-menu--item {
    display: flex;
    min-width: 100%;
    width: 100%;

    ${props =>
      props.hasNextPage &&
      css`
        @media ${MEDIA_QUERY.ONLY_MOBILE} {
          min-width: 90%;
          width: 90%;
        }
      `}
  }

  // NOTE: postItemCell height match
  [class^="ItemContainer"],
  [class^="ItemContainer"] > [class^="InnerPage"] {
    height: 100%;
  }
`;

export const InnerPage = styled.div<{
  gapSize?: number;
  columnCount?: number;
  rowCount?: number;
  stackDirection: "horizontal" | "vertical";
}>`
  width: 100%;
  display: grid;
  place-content: center;
  gap: ${props => px2rem(props.gapSize ?? DEFAULT_GAP)};
  grid-auto-flow: ${props =>
    props.stackDirection === "vertical" ? "column" : "row"};
  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};
  grid-template-rows: ${props =>
    `repeat(${props.rowCount ?? 1}, minmax(0, 1fr))`};
`;

export const Item = styled.div<{ width?: number }>`
  width: ${props => (props.width ? px2rem(props.width) : "inherit")};
  height: 100%;

  // NOTE: this below statement required for content-group-block list/preview
  > [class^="ItemContainer"],
  > [class^="ItemContainer"] > div:not(.postCellSkeleton),
  > [class^="ItemContainer"] > div:not(.postCellSkeleton) > div {
    height: 100%;
  }
`;

export const itemContainerStyle = css`
  min-width: 100%;
`;
