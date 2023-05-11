import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { BubblingG, BubblingItem } from "./styledComponents";

interface IProps {
  size?: Moim.DesignSystem.Size;
  color?: string;
  overrideStyle?: FlattenInterpolation<any>;
}

const LoadingIcon = ({ size = "s", color, overrideStyle }: IProps) => (
  <BubblingG
    className="bubblingG"
    size={size}
    color={color}
    overrideStyle={overrideStyle}
  >
    <BubblingItem />
    <BubblingItem />
    <BubblingItem />
  </BubblingG>
);

export default LoadingIcon;
