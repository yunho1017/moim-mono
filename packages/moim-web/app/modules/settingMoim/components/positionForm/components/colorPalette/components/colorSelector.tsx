import * as React from "react";
import { ColorGrid, ColorGridItem } from "../styled";
import Color from "./color";

interface IProps {
  selectedColor?: string;
  colorSet: string[];
  onClickColor: (color: string) => void;
}

function ColorSelector(props: IProps) {
  const { selectedColor, colorSet, onClickColor } = props;

  return (
    <ColorGrid>
      {colorSet.map(color => (
        <ColorGridItem>
          <Color
            color={color}
            isSelected={selectedColor === color}
            onClick={onClickColor}
          />
        </ColorGridItem>
      ))}
    </ColorGrid>
  );
}

export default ColorSelector;
