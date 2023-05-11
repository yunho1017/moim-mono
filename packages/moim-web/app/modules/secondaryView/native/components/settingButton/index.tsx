import * as React from "react";
import styled from "styled-components";
import SettingIconBase from "@icon/24-setting-b.svg";

import { useStoreState } from "app/store";
import { isProd } from "common/helpers/envChecker";
import {
  CAN_ADMIN_PRODUCTION_HOST,
  CAN_ADMIN_STAGE_HOST,
} from "common/constants/hosts";

const StyledSettingIcon = styled(SettingIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export default function SettingButton({ channelId }: { channelId: string }) {
  const { hubGroupId, groupId } = useStoreState(state => ({
    hubGroupId: state.app.currentHubGroupId,
    groupId: state.app.currentGroupId,
  }));

  const host = isProd() ? CAN_ADMIN_PRODUCTION_HOST : CAN_ADMIN_STAGE_HOST;
  return (
    <a
      href={
        hubGroupId && groupId
          ? `${host}/moim/settings/channels/${channelId}?initialHubGroupId=${hubGroupId}&initialGroupId=${groupId}`
          : host
      }
      target="_blank"
    >
      <StyledSettingIcon />
    </a>
  );
}
