// vendor
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import * as React from "react";
// type
import { IHookProps } from "./props";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { channel, hoverRef, onClickChannel, onInViewChange } = hookProps;

  const handleClickChannel = React.useCallback(() => {
    onClickChannel(channel);

    AnalyticsClass.getInstance().channelListChannelSelect({
      targetChannelId: channel.id,
    });
  }, [channel, onClickChannel]);

  const handleInViewChange = React.useCallback(
    (inView: boolean) => {
      onInViewChange(inView, channel.id, hoverRef, channel.stat?.count);
    },
    [channel.id, channel.stat, hoverRef, onInViewChange],
  );

  return {
    handleClickChannel,
    handleInViewChange,
  };
}
