import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import { Link } from "react-router-dom";
import { px2rem } from "common/helpers/rem";

import { IRoutedTab } from ".";
import { TabType, Tab, TabItem } from "..";

export { TabType };

const Container = styled.div<{ overrideStyle?: FlattenInterpolation<any> }>`
  ${props => props.overrideStyle}
`;

const StickyWrapper = styled.div<{ topPosition: number }>`
  position: sticky;
  top: ${props => px2rem(props.topPosition)};
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

interface IProps {
  tabs: IRoutedTab[];
  selectedTab: IRoutedTab;
  stickyData?: {
    topPosition: number;
  };
  type?: TabType;
  containerStyle?: FlattenInterpolation<any>;
  className?: string;
  onTabClick: (clickedTab: IRoutedTab) => void;
}

export default function RoutedTabComponent({
  type = "root",
  selectedTab,
  tabs,
  stickyData,
  containerStyle,
  onTabClick,
  className,
}: IProps) {
  const handleTabClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      const tabKey = e.currentTarget.getAttribute("data-tab");
      const clickedTab = tabs.find(tab => tab.key === tabKey);
      if (clickedTab) {
        onTabClick(clickedTab);
      }
    },
    [tabs, onTabClick],
  );

  const navElement = React.useMemo(
    () => (
      <Tab type={type}>
        {tabs.map(tab => (
          <TabItem
            type={type}
            key={tab.key}
            active={selectedTab.key === tab.key}
            data-tab={tab.key}
          >
            <Link
              to={(Array.isArray(tab.url) ? tab.url[0] : tab.url).toString()}
              onClick={handleTabClick}
            >
              {tab.title}
            </Link>
          </TabItem>
        ))}
      </Tab>
    ),
    [handleTabClick, selectedTab.key, type, tabs],
  );

  return (
    <Container overrideStyle={containerStyle} className={className}>
      {stickyData ? (
        <StickyWrapper topPosition={stickyData.topPosition}>
          {navElement}
        </StickyWrapper>
      ) : (
        navElement
      )}
      <selectedTab.page />
    </Container>
  );
}
