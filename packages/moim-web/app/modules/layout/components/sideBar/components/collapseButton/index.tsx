// vendor
import * as React from "react";
// hook
import useHover from "common/hooks/useHover";
// component
import { CollapseHoverIcon, CollapseIcon } from "./styledComponents";

interface IProps {
  onClick(): void;
}

function CollapseButton({ onClick }: IProps) {
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  return (
    <button ref={hoverRef} onClick={onClick}>
      {isHovered ? <CollapseHoverIcon /> : <CollapseIcon />}
    </button>
  );
}

export default CollapseButton;
