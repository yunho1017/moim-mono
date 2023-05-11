import * as React from "react";
import shortid from "shortid";
import styled, { FlattenInterpolation } from "styled-components";
import { marginToPadding } from "../helper/blockitStyleHelpers";

interface IProps extends Omit<Moim.Blockit.ISectionBlock, "type" | "blocks"> {
  blocks: React.ReactNode[];
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}

const Container = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  display: flex;
  align-items: flex-start;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Box = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
`;

const SectionBlock: React.FC<IProps> = ({
  columnCount = 1,
  blocks = [],
  wrapperStyle,
  margin,
}) => {
  const key = React.useMemo(() => shortid(), []);
  const elements = React.useMemo(
    () =>
      blocks
        .slice(0, columnCount)
        .map((blockElement, idx) => (
          <Box key={`${key}_${idx}`}>{blockElement}</Box>
        )),
    [blocks, columnCount, key],
  );
  return (
    <Container overrideStyle={wrapperStyle} margin={margin}>
      {elements}
    </Container>
  );
};

export default SectionBlock;
