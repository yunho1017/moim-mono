import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { CommonWrapper, Item, Inner } from "../styled";

const Wrapper = styled(CommonWrapper)`
  display: flex;
  flex-wrap: wrap;

  ${props => {
    if (props.align) {
      switch (props.align) {
        case "center": {
          return css`
            text-align: center;
            justify-content: center;
          `;
        }
        case "left": {
          return css`
            text-align: left;
            justify-content: flex-start;
          `;
        }
        case "right": {
          return css`
            text-align: right;
            justify-content: flex-end;
          `;
        }
      }
    }
  }}
`;

type IProps = Omit<Moim.Blockit.IMultiLineHorizontalBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

const HorizontalMultiLineBlock: React.FC<IProps> = ({
  blocks,
  wrapperStyle,
  margin,
  align,
}) => {
  const elements = React.useMemo(
    () =>
      blocks.map((block, idx) => (
        <Item key={`${block.type}_${idx}`}>
          <BlockitRenderer block={block} wrapperStyle={wrapperStyle} />
        </Item>
      )),
    [blocks, wrapperStyle],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} align={align} margin={margin}>
      <Inner>{elements}</Inner>
    </Wrapper>
  );
};

export default HorizontalMultiLineBlock;
