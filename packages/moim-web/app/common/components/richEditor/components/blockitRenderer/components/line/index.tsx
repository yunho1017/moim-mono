// zeplin https://app.zeplin.io/project/5db7ff7b7ef2d22c5191d3cb/screen/5f5c3692fac9074a33411477
import * as React from "react";
import { rgba } from "polished";
import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";

type IProps = Omit<Moim.Blockit.ILineBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
};

const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  overflow: hidden;
  padding: ${px2rem(8)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

const LineElement = styled.div<IProps>`
  position: relative;
  width: 100%;
  height: ${props => px2rem(props.height)};
  background-color: ${props =>
    rgba(
      props.theme.getColorByAlias(
        props.backgroundColor &&
          props.backgroundColor.startsWith("#") &&
          props.backgroundColor.length === 9
          ? props.backgroundColor.slice(0, -2)
          : props.backgroundColor,
        props.theme.colorV2.primary.main,
      ) ?? "",
      0.08,
    )};

  &::after {
    content: "";
    position: absolute;
    width: ${props => `${props.fillWidth}%`};
    height: ${props => px2rem(props.height)};
    top: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.getColorByAlias(props.fillColor)};
  }
`;

const LineBlock: React.FC<IProps> = ({ wrapperStyle, margin, ...props }) => (
  <Wrapper overrideStyle={wrapperStyle} margin={margin}>
    <LineElement {...props} />
  </Wrapper>
);

export default LineBlock;
