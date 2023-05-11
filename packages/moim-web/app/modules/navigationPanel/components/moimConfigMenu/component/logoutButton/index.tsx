import * as React from "react";
import { useIntl } from "react-intl";
import MenuItem from "../menuItem";
import { LogoutIcon, LogoutSmallIcon } from "../../styled";
import { IMoimConfigMenuButtonProp } from "../../types";

import { useActions } from "app/store";
import { signOut as signOutAction } from "app/actions/app";

type IProps = IMoimConfigMenuButtonProp;

function LogoutButton({ onClickButton }: IProps) {
  const intl = useIntl();
  const { signOut } = useActions({
    signOut: signOutAction,
  });

  const handleClickLogout = React.useCallback(() => {
    onClickButton();
    const message = intl.formatMessage({
      id: "log_out_moim_success_toast_message",
    });
    signOut(message);
  }, [intl, signOut, onClickButton]);

  return (
    <MenuItem
      icon={<LogoutIcon />}
      smallIcon={<LogoutSmallIcon />}
      onClickButton={handleClickLogout}
    >
      {intl.formatMessage({
        id: "profile_show/more_menu_log_out",
      })}
    </MenuItem>
  );
}

export default LogoutButton;
