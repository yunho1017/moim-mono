import * as React from "react";
import useHover from "common/hooks/useHover";

import {
  ButtonWrapper,
  RoundedLeftArrowIcon,
  RoundedLeftArrowHoverIcon,
  RoundedRightArrowIcon,
  RoundedRightArrowHoverIcon,
} from "./styled";

interface IProps {
  arrowType: "left" | "right";
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton: React.FC<IProps> = ({
  arrowType,
  className,
  disabled,
  onClick,
}) => {
  const [targetRef, isHover] = useHover<HTMLButtonElement>();

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

  return (
    <ButtonWrapper
      ref={targetRef}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {inner}
    </ButtonWrapper>
  );
};

export default ArrowButton;
