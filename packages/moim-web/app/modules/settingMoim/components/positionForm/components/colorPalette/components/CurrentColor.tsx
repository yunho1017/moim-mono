import * as React from "react";
import { BaseItemCell } from "common/components/itemCell";
import { MarginSize } from "app/enums";
import { CurrentColorBox, RightArrowButton } from "../styled";

interface IProps {
  color?: string;
  onClick: () => void;
}

function CurrentColor(props: IProps) {
  const { color, onClick } = props;

  return (
    <div onClick={onClick}>
      <BaseItemCell
        title={color}
        size="currentColorOnPalette"
        leftElement={{
          element: <CurrentColorBox color={color || ""} />,
          props: {
            leftContentsSize: "xs",
            margin: {
              left: MarginSize.ZERO,
              right: MarginSize.TWELVE,
            },
          },
        }}
        rightElement={<RightArrowButton />}
        hover={true}
      />
    </div>
  );
}

export default CurrentColor;
