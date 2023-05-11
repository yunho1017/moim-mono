import * as React from "react";
import { DismissMemberIcon } from "../styled";
import ButtonBase from "./buttonBase";

interface IProps {
  onClick: () => void;
}

function DismissMembersButton(props: IProps) {
  const { onClick } = props;

  return (
    <ButtonBase
      icon={<DismissMemberIcon />}
      titleKey="position_settings/position/more_dismissal"
      onClick={onClick}
    />
  );
}

export default DismissMembersButton;
