// vendor
import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";
// icons
import ShareIcon from "@icon/24-shareandr-g.svg";

const ShareProfileMenuIcon = styled(ShareIcon).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  handler?: React.MouseEventHandler<HTMLLIElement>;
}

export default function ShareMenuItem({ handler }: IProps) {
  return (
    <MenuItem onClick={handler}>
      <ShareProfileMenuIcon />
      <MenuText>
        <FormattedMessage id="menu_content_link_share" />
      </MenuText>
    </MenuItem>
  );
}
