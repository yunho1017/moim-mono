import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const DEFAULT_GAP = 12;

export const Wrapper = styled.div<{
  gapSize?: number;
  columnCount?: number;
  rowCount?: number;
  stackDirection: "horizontal" | "vertical";
}>`
  width: 100%;
  display: grid;
  place-content: center;
  gap: ${props => px2rem(props.gapSize ?? DEFAULT_GAP)};
  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};
  grid-template-rows: ${props =>
    `repeat(${props.rowCount ?? 1}, minmax(0, 1fr))`};

  grid-auto-flow: ${props =>
    props.stackDirection === "vertical" ? "column" : "row"};
`;
