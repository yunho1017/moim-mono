// vendor
import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";
// icons
import logoutIcon from "@icon/24-logout-g.svg";

import { useIntlShort } from "common/hooks/useIntlShort";
import { useActions } from "app/store";
import { signOut } from "app/actions/app";

const LogoutMenuIcon = styled(logoutIcon).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  requestClose: () => void;
}

export default function LogoutMenuItem({ requestClose }: IProps) {
  const intl = useIntlShort();
  const { dispatchSignOut } = useActions({
    dispatchSignOut: signOut,
  });

  const handleClickLogout: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      e.stopPropagation();
      const message = intl("log_out_moim_success_toast_message");
      dispatchSignOut(message);
      requestClose();
    },
    [intl, dispatchSignOut, requestClose],
  );

  return (
    <MenuItem onClick={handleClickLogout}>
      <LogoutMenuIcon />
      <MenuText>
        <FormattedMessage id="profile_show/more_menu_log_out" />
      </MenuText>
    </MenuItem>
  );
}
