import { useMemo } from "react";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useCurrentUser from "common/hooks/useCurrentUser";
import useIsMobile from "common/hooks/useIsMobile";

export default function useIsCurrentGroupVisibleInTopNavi() {
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const { isExpanded } = useSideNavigationPanel();
  const currentUser = useCurrentUser();

  return useMemo(
    () =>
      currentGroup?.is_hub ? true : isMobile && !isExpanded && currentUser?.id,
    [currentGroup, currentUser?.id, isExpanded],
  );
}
