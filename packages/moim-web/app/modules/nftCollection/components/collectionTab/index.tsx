import * as React from "react";
// hooks
import { replace } from "connected-react-router";
import { useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
// helpers
import safeParseJSON from "common/helpers/safeParseJSON";
// components
import { Spacer } from "common/components/designSystem/spacer";
// styled
import { Tab, TabItem, ContentContainer } from "./styled";
import {
  NftCollectionShowDivider,
  NftCollectionTabDividerDefaultStyle,
} from "../../styled";

import { TopBannerContext } from "common/components/topBanner/context";
import { NFTCollectionShowContext } from "../../context";

const DEFAULT_TAB_ID = "information";

interface IProps {
  contractId: string;
  tabs: {
    title: React.ReactNode;
    content: React.ReactNode;
    id: string;
  }[];
}

const CollectionTab: React.FC<IProps> = ({ tabs }) => {
  const isMobile = useIsMobile();
  const refTab = React.useRef<HTMLDivElement>(null);
  const [refs, setRefs] = React.useState<Record<string, HTMLDivElement>>({});
  const {
    selectedTabId,
    setSelectedTabId,
    containerRef,
    topWrapperRef,
  } = React.useContext(NFTCollectionShowContext);
  const [topBannerContext] = React.useContext(TopBannerContext);

  const { dispatchReplace } = useActions({
    dispatchReplace: replace,
  });

  const showCurrentTab = React.useCallback(
    (tabId: string) => {
      tabs.map(tab => {
        refs[`nft_collection_anchor_${tab.id}`].setAttribute(
          "aria-hidden",
          "true",
        );
      });
      refs[`nft_collection_anchor_${tabId}`].setAttribute(
        "aria-hidden",
        "false",
      );
    },
    [refs, tabs],
  );

  const scrollToTab = React.useCallback(() => {
    const topHeight = topWrapperRef?.current?.offsetHeight;
    requestAnimationFrame(() => {
      if (isMobile) {
        window.scrollTo({
          top: topHeight,
          left: 0,
          behavior: "smooth",
        });
      } else {
        if (containerRef?.current) {
          containerRef.current?.scrollTo({
            left: 0,
            top: topHeight,
            behavior: "smooth",
          });
        }
      }
    });
  }, [containerRef, isMobile, topWrapperRef]);

  const changeTab = React.useCallback(
    changedTabId => {
      const query = new URLSearchParams(window.location.search);

      const data = query.get("filter")
        ? safeParseJSON(query.get("filter") ?? "")
        : {};
      dispatchReplace(
        Object.keys(data).length
          ? `${changedTabId}?filter=${JSON.stringify(data)}`
          : changedTabId,
      );
      showCurrentTab(changedTabId);
      scrollToTab();
    },
    [dispatchReplace, scrollToTab, showCurrentTab],
  );

  const handleTabClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const tabId = e.currentTarget.dataset.id;
      if (tabId) {
        setSelectedTabId(tabId);
      }
    },
    [setSelectedTabId],
  );

  React.useEffect(() => {
    if (selectedTabId) {
      changeTab(selectedTabId);
    } else {
      showCurrentTab(DEFAULT_TAB_ID);
    }
  }, [changeTab, selectedTabId, showCurrentTab]);

  const TabContentElement = React.useMemo(
    () =>
      tabs.map(currentTab => (
        <ContentContainer
          ref={ref => {
            if (ref) {
              refs[ref.id] = ref;
              setRefs(refs);
            }
          }}
          data-id={currentTab.id}
          id={`nft_collection_anchor_${currentTab.id}`}
          aria-hidden="true"
        >
          {currentTab.content}
        </ContentContainer>
      )),
    [refs, tabs],
  );

  return (
    <>
      <Tab ref={refTab} isTopBannerOpen={topBannerContext.isOpen}>
        {tabs.map(tab => (
          <TabItem
            key={`${tab.title}_${tab.id}`}
            id={tab.id}
            data-id={tab.id}
            selected={tab.id === (selectedTabId ?? DEFAULT_TAB_ID)}
            onClick={handleTabClick}
          >
            <span>{tab.title}</span>
          </TabItem>
        ))}
      </Tab>
      {isMobile && (
        <NftCollectionShowDivider
          overrideStyle={NftCollectionTabDividerDefaultStyle}
        />
      )}
      {TabContentElement}
      {isMobile && <Spacer value={24} />}
    </>
  );
};

export default React.memo(CollectionTab);
