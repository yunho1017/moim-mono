import { useMemo } from "react";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useMedia from "common/hooks/useMedia";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import { MEDIA_QUERY } from "common/constants/responsive";

function useVisibleExpandSideNavigationButton() {
  const visibleTopNavigation = useVisibleTopNavigation();
  const { isExpanded } = useSideNavigationPanel();
  const isMobile = useMedia([MEDIA_QUERY.ONLY_MOBILE], [true], false);

  return useMemo(() => !visibleTopNavigation && (isMobile || !isExpanded), [
    isExpanded,
    isMobile,
    visibleTopNavigation,
  ]);
}

export default useVisibleExpandSideNavigationButton;
