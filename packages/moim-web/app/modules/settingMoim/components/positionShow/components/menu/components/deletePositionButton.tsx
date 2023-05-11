import * as React from "react";
import { TrashIcon } from "../styled";
import ButtonBase from "./buttonBase";

interface IProps {
  onClick: () => void;
}

function DeletePositionButton(props: IProps) {
  const { onClick } = props;

  return (
    <ButtonBase
      icon={<TrashIcon />}
      titleKey="position_settings/position/more_deletion"
      onClick={onClick}
    />
  );
}

export default DeletePositionButton;
