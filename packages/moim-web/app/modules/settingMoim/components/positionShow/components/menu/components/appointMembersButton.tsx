import * as React from "react";
import { AppointMemberIcon } from "../styled";
import ButtonBase from "./buttonBase";

interface IProps {
  onClick: () => void;
}

function AppointMembersButton(props: IProps) {
  const { onClick } = props;

  return (
    <ButtonBase
      icon={<AppointMemberIcon />}
      titleKey="position_settings/position/more_appointment"
      onClick={onClick}
    />
  );
}

export default AppointMembersButton;
