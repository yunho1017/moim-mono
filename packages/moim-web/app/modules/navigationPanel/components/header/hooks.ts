import { useMemo } from "react";

import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import useCurrentGroup from "common/hooks/useCurrentGroup";

export function useVisibleGroupInfo() {
  const currentGroup = useCurrentGroup();
  const visibleTopNavigation = useVisibleTopNavigation();

  const visibleGroupInfo = useMemo(
    () =>
      Boolean(currentGroup && (!visibleTopNavigation || !currentGroup.is_hub)),
    [currentGroup, visibleTopNavigation],
  );

  return visibleGroupInfo;
}
