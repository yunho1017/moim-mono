import * as React from "react";
import { Button, AddIcon } from "./styled";

interface IChannelAddButtonProps {
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ChannelAddButton({
  elementPaletteKey,
  onClick,
}: IChannelAddButtonProps) {
  return (
    <Button onClick={onClick} elementPaletteKey={elementPaletteKey}>
      <AddIcon elementPaletteKey={elementPaletteKey} />
    </Button>
  );
}

export default ChannelAddButton;
