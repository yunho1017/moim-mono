import * as React from "react";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import useUserDataWithAutoBatch from "common/hooks/useUserDataWithAutoBatch";

import { IProps } from ".";

export function useProps(props: IProps) {
  const user = useUserDataWithAutoBatch(props.userId, props.canUserId);

  const shortSizeChar: Moim.DesignSystem.Size = React.useMemo(() => {
    switch (props.size) {
      case "large":
        return "l";
      case "medium":
        return "m";
      case "small":
        return "s";
    }
  }, [props.size]);

  return {
    ...props,
    shortSizeChar,
    user,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const openProfileDialog = useOpenProfileDialog();
  const handleClickTitle: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      if (props.userId && props.user && !props.user?.is_deactivated) {
        openProfileDialog(props.userId, { current: e.currentTarget });
      }
    },
    [openProfileDialog, props.user, props.userId],
  );
  return {
    ...props,
    handleClickTitle,
  };
}
