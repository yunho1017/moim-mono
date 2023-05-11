import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import { useStoreState } from "app/store";

import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";
import LinkIconBase from "@icon/18-adminsetting-g.svg";

import {
  CAN_ADMIN_PRODUCTION_HOST,
  CAN_ADMIN_STAGE_HOST,
} from "common/constants/hosts";
import { isProd } from "common/helpers/envChecker";

const LinkIcon = styled(LinkIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  userId: string;
  requestClose: () => void;
}

function OpenInAdminMenuItem({ userId, requestClose }: IProps) {
  const { hubGroupId, groupId } = useStoreState(state => ({
    hubGroupId: state.app.currentHubGroupId,
    groupId: state.app.currentGroupId,
  }));
  const host = isProd() ? CAN_ADMIN_PRODUCTION_HOST : CAN_ADMIN_STAGE_HOST;
  const adminLink =
    hubGroupId && groupId
      ? `${host}/moim/members/${userId}?initialHubGroupId=${hubGroupId}&initialGroupId=${groupId}`
      : host;

  return (
    <a href={adminLink} target="_blank">
      <MenuItem onClick={requestClose}>
        <LinkIcon />
        <MenuText>
          <FormattedMessage id="profile_show_more_menu_open_admin" />
        </MenuText>
      </MenuItem>
    </a>
  );
}

export default OpenInAdminMenuItem;
