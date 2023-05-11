import * as React from "react";
import { IHookProps } from "./useProps";

export function useEffects(hookProps: IHookProps) {
  const { getPositionMembers, position, isLoadingMembers, members } = hookProps;

  React.useEffect(() => {
    if (position && !isLoadingMembers && !members.data.length) {
      getPositionMembers({
        positionId: position.id,
      });
    }
  }, []);
}
