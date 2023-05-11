import * as React from "react";
import { ThemeContext } from "styled-components";
import { Wrapper } from "./styledComponents";
import CircleCanvas from "./circleCanvas";
import { circleCanvasPropsSizeMap } from "./size";
import { rgba } from "polished";

interface IProps {
  size?: Moim.DesignSystem.Size;
  grayscale?: boolean;
  percentage?: number; // 0 ~ 1
}

export default function CircularLoading({
  size = "s",
  grayscale,
  percentage,
}: IProps) {
  const { size: canvasSize, stroke, padding } = circleCanvasPropsSizeMap.get(
    size,
  )!;
  const theme = React.useContext(ThemeContext);
  return (
    <Wrapper
      size={size}
      grayscale={Boolean(grayscale)}
      animation={percentage === undefined}
    >
      <CircleCanvas
        size={canvasSize}
        stroke={stroke}
        backgroundColor={rgba(theme.colorV2.colorSet.grey100, 0.5)}
        activeColor={grayscale ? theme.color.white1000 : theme.colorV2.accent}
        padding={padding}
        percentage={percentage}
      />
    </Wrapper>
  );
}
