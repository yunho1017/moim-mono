import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import PopperBase from "@material-ui/core/Popper";
import { px2rem } from "common/helpers/rem";

const Popper = styled(({ overrideStyle: _, ...rest }) =>
  React.createElement(PopperBase, rest),
)<{ overrideStyle?: FlattenInterpolation<any> }>`
  display: block;
  border-radius: ${px2rem(2)};
  box-shadow: ${props => props.theme.shadow.whiteElevated};
  ${props => props.overrideStyle};
`;

export default Popper;
