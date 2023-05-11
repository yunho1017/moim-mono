import { useMemo, useEffect, useState, useCallback } from "react";

import useProps, { IHookProps } from "./props";
import useHandlers, { IHookHandlers } from "./handlers";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsMobile from "common/hooks/useIsMobile";
import safeParseJSON from "common/helpers/safeParseJSON";
import { useRouteMatch } from "react-router";

export { useProps, IHookProps, useHandlers, IHookHandlers };

export function useVisibleTopNavigation() {
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();
  const [
    previewVisibleTopNavigation,
    setPreviewVisibleTopNavigation,
  ] = useState<boolean | undefined>(undefined);

  const handleGetVisibleTopNavigation = useCallback((event: MessageEvent) => {
    if (event.origin.includes("can-admin")) {
      const { visibleTopNavigation: preview } = safeParseJSON(event.data, {
        visibleTopNavigation: false,
      }) as {
        visibleTopNavigation: boolean;
      };

      setPreviewVisibleTopNavigation(preview);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleGetVisibleTopNavigation, false);
    return () =>
      window.removeEventListener("message", handleGetVisibleTopNavigation);
  }, [handleGetVisibleTopNavigation]);

  const visibleTopNavigation = useMemo(
    () =>
      !currentUser ||
      Boolean(
        previewVisibleTopNavigation ??
          currentGroup?.navigation_structure.web.topNavi.showNavigation,
      ),
    [previewVisibleTopNavigation, currentGroup, currentUser],
  );

  return visibleTopNavigation;
}

export function useVisibleSideNavigation() {
  const currentGroup = useCurrentGroup();
  const isMobile = useIsMobile();

  const [
    previewVisibleSideNavigation,
    setPreviewVisibleSideNavigation,
  ] = useState<boolean | undefined>(undefined);

  const handleGetVisibleSideNavigation = useCallback((event: MessageEvent) => {
    if (event.origin.includes("can-admin")) {
      const { visibleSideNavigation: preview } = safeParseJSON(event.data, {
        visibleSideNavigation: false,
      }) as {
        visibleSideNavigation: boolean;
      };

      setPreviewVisibleSideNavigation(preview);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleGetVisibleSideNavigation, false);
    return () =>
      window.removeEventListener("message", handleGetVisibleSideNavigation);
  }, [handleGetVisibleSideNavigation]);

  const visibleSideNavigation = useMemo(
    () =>
      isMobile ||
      Boolean(
        previewVisibleSideNavigation ??
          currentGroup?.navigation_structure.web.sideNavi.showNavigation,
      ),
    [isMobile, previewVisibleSideNavigation, currentGroup],
  );

  return visibleSideNavigation;
}

export function useVisibleTopSubNavigation() {
  const visibleTopNavigation = useVisibleTopNavigation();
  const currentUser = useCurrentUser();
  const visibleSideNavigation = useVisibleSideNavigation();
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();

  const visibleTopSubNavigation = useMemo(
    () =>
      !currentGroup?.is_hub &&
      ((visibleTopNavigation && !visibleSideNavigation) ||
        (isMobile && !currentUser)),
    [
      currentGroup,
      currentUser,
      visibleTopNavigation,
      visibleSideNavigation,
      isMobile,
    ],
  );

  return visibleTopSubNavigation;
}

export function useVisibleBottomFooter() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const currentGroup = useCurrentGroup();
  const visibleTopNavigation = useVisibleTopNavigation();
  const visibleSideNavigation = useVisibleSideNavigation();

  const isHomeChannel = useMemo(() => {
    if (!currentGroup?.home.web || currentGroup?.home.web.type !== "channel") {
      return false;
    }

    let selectedId;
    switch (currentGroup.home.web.ref.type) {
      case "conversation":
        selectedId = match.params.conversationId;
        break;
      case "forum":
        selectedId = match.params.forumId;
        break;
      case "tag":
        selectedId = match.params.tag;
        break;
      case "view":
        selectedId = match.params.viewId;
        break;
    }

    return selectedId === currentGroup.home.web.ref.id;
  }, [currentGroup?.home.web, match.params]);

  const visibleBottomFooter = useMemo(
    () =>
      currentGroup &&
      currentGroup.footer &&
      visibleTopNavigation &&
      !visibleSideNavigation &&
      isHomeChannel,
    [
      currentGroup?.footer,
      visibleTopNavigation,
      visibleSideNavigation,
      isHomeChannel,
    ],
  );

  return visibleBottomFooter;
}

export function useVisibleMobileTopTab() {
  const currentGroup = useCurrentGroup();
  const isMobile = useIsMobile();
  const visibleTopNavigation = useVisibleTopNavigation();
  const { params } = useRouteMatch<Moim.IMatchParams>();
  const showTopTabOnWeb = currentGroup?.navigation_config?.showTopTabOnWeb;
  const mobileTopTabs = currentGroup?.user_mobile_top_tabs;

  const paramsId = useMemo(() => {
    if (Object.keys(params).length > 1) return null;

    return (
      params.conversationId ?? params.forumId ?? params.tag ?? params.viewId
    );
  }, [params]);

  const home = useMemo(
    () =>
      currentGroup?.home.web.type === "channel" && currentGroup?.home.web.ref,
    [currentGroup?.home.web],
  );

  const hasTabId = useCallback(
    (id, tabs?: Moim.Group.ITopTabMenu[]) => {
      if (!id || !tabs || !tabs.length) return false;

      for (const node of tabs) {
        if (node.type === "home" && home && home?.id === id) {
          return true;
        }

        if (node.channelId && node.channelId === id) {
          return true;
        }

        if (node.items) {
          const items = hasTabId(id, node.items);
          if (items) return true;
        }
      }
      return false;
    },
    [home],
  );

  const visibleTopTabNavigation = useMemo(
    () =>
      showTopTabOnWeb &&
      isMobile &&
      hasTabId(paramsId, mobileTopTabs) &&
      visibleTopNavigation,
    [
      hasTabId,
      isMobile,
      mobileTopTabs,
      paramsId,
      showTopTabOnWeb,
      visibleTopNavigation,
    ],
  );

  return visibleTopTabNavigation;
}
