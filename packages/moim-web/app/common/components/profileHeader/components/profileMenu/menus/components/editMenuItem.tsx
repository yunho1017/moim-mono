// vendor
import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";
// icons
import EditIcon from "@icon/24-edit-g.svg";

import { useActions } from "app/store";
import { openProfileEditor } from "app/actions/me";

const EditProfileMenuIcon = styled(EditIcon).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  requestClose(): void;
}

export default function EditMenuItem({ requestClose }: IProps) {
  const { dispatchOpenProfileEditor } = useActions({
    dispatchOpenProfileEditor: openProfileEditor,
  });

  const handleClickEditProfile: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      e.stopPropagation();
      dispatchOpenProfileEditor();
      requestClose();
    },
    [dispatchOpenProfileEditor, requestClose],
  );
  return (
    <MenuItem onClick={handleClickEditProfile}>
      <EditProfileMenuIcon />
      <MenuText>
        <FormattedMessage id="profile_show/more_menu_edit_profile" />
      </MenuText>
    </MenuItem>
  );
}
