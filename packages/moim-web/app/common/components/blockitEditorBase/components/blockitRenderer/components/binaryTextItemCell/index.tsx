import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import Texts from "../texts";
import { parseRatio } from "common/components/thread/components/wrapper/thumbnail";
import {
  PlacementRootContainer,
  PlacementWrapper,
  Wrapper,
  Container,
  Left,
  Right,
  TextBlockWrapperStyle,
} from "./styled";

interface IProps extends Omit<Moim.Blockit.IBiTextItemCellBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const BinaryTextBlock: React.FC<IProps> = ({
  contentWidth,
  sectionWidth,
  wrapperStyle,
  margin,
  left,
  right,
  ratio,
}) => {
  const { leftRatio, rightRatio } = React.useMemo<{
    leftRatio: number;
    rightRatio: number;
  }>(() => {
    const { width, height } = parseRatio(ratio);

    return {
      leftRatio: width,
      rightRatio: height,
    };
  }, [ratio]);

  return (
    <PlacementRootContainer>
      <PlacementWrapper contentWidth={contentWidth}>
        <Wrapper
          sectionWidth={sectionWidth}
          overrideStyle={wrapperStyle}
          margin={margin}
        >
          <Container>
            <Left ratio={leftRatio}>
              <Texts
                key="left-text-block"
                {...left}
                wrapperStyle={TextBlockWrapperStyle}
                fontStyle={left.subType ?? "body3"}
              />
            </Left>

            <Right ratio={rightRatio}>
              <Texts
                key="right-text-block"
                {...right}
                wrapperStyle={TextBlockWrapperStyle}
                fontStyle={right.subType ?? "body3"}
                align="right"
              />
            </Right>
          </Container>
        </Wrapper>
      </PlacementWrapper>
    </PlacementRootContainer>
  );
};

export default BinaryTextBlock;
