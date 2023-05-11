// vendor
import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";

// icons
import UserBlockIconBase from "@icon/24-userblock-g.svg";

const UserBlockIcon = styled(UserBlockIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  openUserUnblockDialog(): void;
  requestClose: () => void;
}

export default function UserUnblockMenuItem({
  openUserUnblockDialog,
  requestClose,
}: IProps) {
  const handleClickUserUnblock: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      e.stopPropagation();
      openUserUnblockDialog();
      requestClose();
    },
    [openUserUnblockDialog, requestClose],
  );
  return (
    <MenuItem onClick={handleClickUserUnblock}>
      <UserBlockIcon />
      <MenuText>
        <FormattedMessage id="more_menu_unblock" />
      </MenuText>
    </MenuItem>
  );
}
