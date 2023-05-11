import * as React from "react";
import { EditIcon } from "../styled";
import ButtonBase from "./buttonBase";

interface IProps {
  onClick: () => void;
}

function EditButton(props: IProps) {
  const { onClick } = props;

  return (
    <ButtonBase
      icon={<EditIcon />}
      titleKey="position_settings/position/more_configuration"
      onClick={onClick}
    />
  );
}

export default EditButton;
