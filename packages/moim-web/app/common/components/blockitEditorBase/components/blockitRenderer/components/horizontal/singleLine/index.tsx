import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { useScrollStyle } from "common/components/designSystem/styles";
import { CommonWrapper, Item, Inner } from "../styled";

const Wrapper = styled(CommonWrapper)`
  ${useScrollStyle};
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  word-break: break-word;
  text-overflow: ellipsis;

  ${props => {
    if (props.align) {
      return css`
        text-align: ${() => {
          switch (props.align) {
            case "center": {
              return "center";
            }
            case "left": {
              return "left";
            }
            case "right": {
              return "right";
            }
          }
        }};
      `;
    }
  }}
`;

type IProps = Omit<Moim.Blockit.IMultiLineHorizontalBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

const HorizontalSingleLineBlock: React.FC<IProps> = ({
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

export default HorizontalSingleLineBlock;
