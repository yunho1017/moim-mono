import * as React from "react";
import { useStoreState } from "app/store";
import { permissionSelector } from "app/selectors/permission";

export default function useIsLimitedChannel(channelId: string) {
  const { permissions, channel } = useStoreState(state => ({
    permissions: permissionSelector(state, channelId),
    channel: state.entities.channels[
      channelId
    ] as Moim.Channel.SimpleChannelWithoutCategoryType,
  }));

  const isLimited = React.useMemo(() => {
    const accessPermission = permissions.find(
      permission => permission.right === "ACCESS",
    );

    return accessPermission?.applied_type === "LIMITED" || channel?.is_limited;
  }, [permissions, channel?.is_limited]);

  return isLimited;
}
