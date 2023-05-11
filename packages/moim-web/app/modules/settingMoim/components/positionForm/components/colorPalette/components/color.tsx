import * as React from "react";
import { ColorBox, CheckIcon } from "../styled";

interface IProps {
  color: string;
  isSelected: boolean;
  onClick: (color: string) => void;
}

function Color(props: IProps) {
  const { color, isSelected, onClick } = props;
  const handleClickColor = React.useCallback(() => {
    onClick(color);
  }, [color, onClick]);

  return (
    <ColorBox color={color} onClick={handleClickColor}>
      {isSelected && <CheckIcon />}
    </ColorBox>
  );
}

export default Color;
