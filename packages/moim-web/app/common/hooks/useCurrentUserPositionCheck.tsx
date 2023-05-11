import * as React from "react";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useStoreState } from "app/store";

export default function useCurrentUserPositionCheck() {
  const currentUser = useCurrentUser();
  const positions = useStoreState(state =>
    (currentUser?.positions ?? []).map(id => state.entities.positions[id]),
  );
  const checker = React.useCallback(
    (
      positionIds: Moim.Id[],
      opt: { conditionType: "or" | "and" } = { conditionType: "or" },
    ) => {
      if (positions.length === 0) {
        return false;
      }
      if (opt.conditionType === "or") {
        return Boolean(
          positions.filter(position => positionIds.includes(position.id))
            .length,
        );
      } else {
        return (
          positions.filter(position => positionIds.includes(position.id))
            .length === positionIds.length
        );
      }
    },
    [positions],
  );

  return checker;
}
