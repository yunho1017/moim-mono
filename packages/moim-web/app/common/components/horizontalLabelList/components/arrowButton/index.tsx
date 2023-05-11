import * as React from "react";
import useHover from "common/hooks/useHover";

import {
  ButtonWrapper,
  RoundedLeftArrowIcon,
  RoundedLeftArrowHoverIcon,
  RoundedRightArrowIcon,
  RoundedRightArrowHoverIcon,
} from "./styled";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  arrowType: "left" | "right";
}

const ArrowButton: React.FC<IProps> = ({ arrowType, ...rest }) => {
  const [targetRef, isHover] = useHover();

  const inner = React.useMemo(() => {
    if (arrowType === "right") {
      return isHover ? (
        <RoundedRightArrowHoverIcon />
      ) : (
        <RoundedRightArrowIcon />
      );
    } else {
      return isHover ? <RoundedLeftArrowHoverIcon /> : <RoundedLeftArrowIcon />;
    }
  }, [arrowType, isHover]);

  return React.createElement(ButtonWrapper, { ref: targetRef, ...rest }, inner);
};

export default ArrowButton;
