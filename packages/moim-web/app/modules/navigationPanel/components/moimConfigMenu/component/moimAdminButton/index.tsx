import * as React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

import { useStoreState } from "app/store";

import MenuItem from "../menuItem";
import LinkSmallIconBase from "@icon/18-linkchannel-g.svg";
import LinkIconBase from "@icon/24-linkchannel-g.svg";

import { IMoimConfigMenuButtonProp } from "../../types";

import {
  CAN_ADMIN_PRODUCTION_HOST,
  CAN_ADMIN_STAGE_HOST,
} from "common/constants/hosts";
import { isProd } from "common/helpers/envChecker";

const LinkIcon = styled(LinkIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const LinkSmallIcon = styled(LinkSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

type IProps = IMoimConfigMenuButtonProp;

function MoimAdminButton({ onClickButton }: IProps) {
  const intl = useIntl();
  const { hubGroupId, groupId } = useStoreState(state => ({
    hubGroupId: state.app.currentHubGroupId,
    groupId: state.app.currentGroupId,
  }));

  const host = isProd() ? CAN_ADMIN_PRODUCTION_HOST : CAN_ADMIN_STAGE_HOST;

  return (
    <a
      href={
        hubGroupId && groupId
          ? `${host}?initialHubGroupId=${hubGroupId}&initialGroupId=${groupId}`
          : host
      }
      target="_blank"
    >
      <MenuItem
        icon={<LinkIcon />}
        smallIcon={<LinkSmallIcon />}
        onClickButton={onClickButton}
      >
        {intl.formatMessage({
          id: "moim_settings/menu_moim_settings_new",
        })}
      </MenuItem>
    </a>
  );
}

export default MoimAdminButton;
