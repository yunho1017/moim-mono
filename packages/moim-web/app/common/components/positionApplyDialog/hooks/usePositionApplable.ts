// vendor
import { useMemo } from "react";
// hook
import { useStoreState } from "app/store";

import useCurrentUser from "common/hooks/useCurrentUser";

// selector
import { positionsSelector } from "app/selectors/position";

function getPositionApplyable(
  user: Moim.User.INormalizedUser | null,
  position: Moim.Position.INormalizePosition | undefined,
) {
  // TODO 추후에 self 임명 말고 신청 기능 추가되면 isApplyable만 봐야됨
  return Boolean(
    user &&
      position &&
      !user.positions.some(id => id === position.id) &&
      position.config?.isApplyable &&
      !position.config?.isApprovable,
  );
}
export function usePositionApplyable(
  position: Moim.Position.INormalizePosition | undefined,
) {
  const currentUser = useCurrentUser();

  const positionApplyable = useMemo(
    () => getPositionApplyable(currentUser, position),
    [currentUser, position],
  );

  return positionApplyable;
}

export function useHasApplyablePosition() {
  const currentUser = useCurrentUser();

  const { positions } = useStoreState(state => ({
    positions: positionsSelector(state),
  }));

  const hasApplyablePosition = useMemo(
    () =>
      positions.some(position => getPositionApplyable(currentUser, position)),
    [currentUser, positions],
  );

  return hasApplyablePosition;
}
