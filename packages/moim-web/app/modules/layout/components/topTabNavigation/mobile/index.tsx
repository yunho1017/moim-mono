import * as React from "react";
import { useRouteMatch } from "react-router";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useStoreState } from "app/store";
import useScrollDirection from "common/hooks/useScrollDirection";
import MainTab from "../components/mainTab";
import SubTab from "../components/subTab";

const MobileTopTabNavigation = () => {
  const currentGroup = useCurrentGroup();
  const [isScrollVisible, setScrollVisible] = React.useState(true);
  const mobileTopTab = currentGroup?.user_mobile_top_tabs;
  const home = React.useMemo(
    () =>
      (currentGroup?.home?.web.type === "channel" &&
        currentGroup?.home?.web?.ref) || { id: "" },
    [currentGroup?.home.web],
  );
  const { params } = useRouteMatch<Moim.IMatchParams>();
  const paramsId = React.useMemo(
    () =>
      params.conversationId ?? params.forumId ?? params.tag ?? params.viewId,
    [params.conversationId, params.forumId, params.tag, params.viewId],
  );

  const activeTab = React.useMemo(() => {
    const tabs = mobileTopTab ?? [];
    for (const node of tabs) {
      if (
        (node.channelId && node.channelId === paramsId) ||
        (node.type === "home" && home.id === paramsId)
      ) {
        return node;
      }

      if (node.items) {
        for (const sub of node.items) {
          if (
            sub.channelId === paramsId ||
            (sub.type === "home" && home.id === paramsId)
          ) {
            return node;
          }
        }
      }
    }
    return undefined;
  }, [home.id, mobileTopTab, paramsId]);

  const hasUndefineItem = useStoreState(state =>
    mobileTopTab?.some(tab =>
      Boolean(
        tab?.channelId &&
          !state.entities.channels[tab.channelId] &&
          tab.items?.some(item => !state.entities.channels[item.channelId]),
      ),
    ),
  );

  const hasUndefineActiveTabItem = useStoreState(state =>
    activeTab?.items?.some(tab =>
      Boolean(tab?.channelId && !state.entities.channels[tab.channelId]),
    ),
  );

  const direction = useScrollDirection({
    initialDirection: "up",
    threshold: 80,
  });

  React.useLayoutEffect(() => {
    if (activeTab?.items) {
      setScrollVisible(direction === "up");
    }
  }, [direction, activeTab]);

  const checkActiveMainTab = React.useCallback(
    (id: string | undefined) => {
      if (!id) return false;

      if (id === paramsId) {
        return true;
      }

      if (activeTab?.channelId === id && activeTab?.items) {
        const activeSubTab = activeTab.items.find(item =>
          item.type === "home"
            ? home.id === paramsId
            : item.channelId === paramsId,
        );
        if (activeSubTab) {
          return true;
        }
      }

      return false;
    },
    [activeTab, home.id, paramsId],
  );

  return (
    <>
      <MainTab
        tabs={mobileTopTab}
        isLoading={!!hasUndefineItem}
        onCheckActive={checkActiveMainTab}
        homeId={home.id}
      />
      {activeTab && activeTab.items && (
        <SubTab
          tabs={activeTab.items}
          isScrollVisible={isScrollVisible}
          isLoading={!!hasUndefineActiveTabItem}
          homeId={home.id}
          paramsId={paramsId}
        />
      )}
    </>
  );
};

export default React.memo(MobileTopTabNavigation);
