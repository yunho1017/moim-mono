import * as React from "react";

import { IHookProps, IHookHandlers } from ".";

export default function useEffects(props: IHookProps, handlers: IHookHandlers) {
  const { channelId, permissionLoading, dispatchGetPermission } = props;
  const { handleGetChannel } = handlers;

  React.useEffect(() => {
    handleGetChannel(channelId);
  }, [channelId, handleGetChannel]);

  React.useEffect(() => {
    if (channelId && permissionLoading[channelId] === undefined) {
      dispatchGetPermission({ resource: channelId });
    }
  }, [channelId, dispatchGetPermission, permissionLoading]);
}
