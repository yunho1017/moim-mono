import * as React from "react";
import { TopBannerContext } from "common/components/topBanner/context";
import getParentScrollElement from "common/helpers/getParentScrollElement";
import { Tab, TabItem, ContentContainer } from "./styled";
import useHighlightTab from "./hooks/useHighlightTab";

interface IProps {
  productId: string;
  tabs: {
    title: React.ReactNode;
    content: React.ReactNode;
    id: string;
  }[];
}

const ProductTab: React.FC<IProps> = ({ tabs, productId }) => {
  const refScrollingElement = React.useRef<
    ((Window & typeof globalThis) | HTMLElement) | null
  >(null);
  const refTab = React.useRef<HTMLDivElement>(null);
  const [refs, setRefs] = React.useState<Record<string, HTMLDivElement>>({});
  const [selectedTab, setSelectedTab] = React.useState<string | undefined>(
    tabs[0]?.id,
  );
  const [topBannerContext] = React.useContext(TopBannerContext);

  const scrollToTab = React.useCallback((tabId: string) => {
    const scrollTargetElement = document.getElementById(
      `product_anchor_${tabId}`,
    );

    if (scrollTargetElement && refScrollingElement.current) {
      requestAnimationFrame(() => {
        refScrollingElement.current?.scrollTo(
          0,
          scrollTargetElement.offsetTop - (tabId === "0" ? 40 : -5),
        );

        setTimeout(() => {
          setSelectedTab(tabId);
        }, 1);
      });
    }
  }, []);

  const handleTabClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const tabId = e.currentTarget.dataset.id;
      if (tabId) {
        scrollToTab(tabId);
      }
    },
    [scrollToTab],
  );

  const handleScroll = React.useCallback(
    e => {
      const find = Object.entries(refs)
        .filter(
          ([_, ref]) =>
            ref.offsetTop <=
            (e.currentTarget.scrollTop || e.currentTarget.scrollY),
        )
        .pop();
      let scrollEnd = false;

      if (e.currentTarget.innerHeight) {
        scrollEnd =
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          (e.currentTarget.innerHeight ?? 0) +
            ((e.currentTarget.scrollTop || e.currentTarget.scrollY) ?? 0) ===
          e.currentTarget.document.scrollingElement.scrollHeight;
      } else {
        scrollEnd =
          e.currentTarget.scrollHeight ===
          ((e.currentTarget.scrollTop || e.currentTarget.scrollY) ?? 0);
      }

      if (find && find[1].dataset.id) {
        if (scrollEnd) {
          setSelectedTab(tabs[tabs.length - 1]?.id);
        } else {
          setSelectedTab(find[1].dataset.id);
        }
      }
    },
    [refs, tabs],
  );

  React.useLayoutEffect(() => {
    const target = getParentScrollElement(refTab.current) ?? window;
    target?.addEventListener("scroll", handleScroll);

    refScrollingElement.current = target;
    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setRefs({});
  }, [tabs.length]);

  useHighlightTab({ productId, scrollToTab, tabs });

  return (
    <>
      <Tab ref={refTab} isTopBannerOpen={topBannerContext.isOpen}>
        {tabs.map(tab => (
          <TabItem
            key={`${tab.title}_${tab.id}`}
            id={tab.id}
            data-id={tab.id}
            selected={tab.id === selectedTab}
            onClick={handleTabClick}
          >
            <span>{tab.title}</span>
          </TabItem>
        ))}
      </Tab>
      {tabs.map(tab => (
        <ContentContainer
          ref={ref => {
            if (ref) {
              refs[ref.id] = ref;
              setRefs(refs);
            }
          }}
          data-id={tab.id}
          id={`product_anchor_${tab.id}`}
          data-anchor-id={tab.id}
        >
          {tab.content}
        </ContentContainer>
      ))}
    </>
  );
};

export default React.memo(ProductTab);
