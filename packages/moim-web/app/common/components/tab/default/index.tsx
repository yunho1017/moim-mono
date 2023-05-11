import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";
import { Tab, TabItemComponent, TabType } from "..";

const TabContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const StickyWrapper = styled.div<{ topPosition: number }>`
  position: sticky;
  top: ${props => px2rem(props.topPosition)};
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export interface ITab {
  key: string;

  title: React.ReactNode;
  page: React.ReactNode;
  default?: boolean;
}

interface IProps {
  tabs: ITab[];
  type?: TabType;
  stickyData?: {
    topPosition: number;
  };
  className?: string;
  onTabChange?: (selectedTab: ITab) => void;
}

const getDefaultTab = (tabs: ITab[]): ITab => {
  return tabs.find(tab => Boolean(tab.default)) || tabs[0];
};

const DefaultMoimTab: React.FC<IProps> = ({
  onTabChange,
  className,
  tabs,
  stickyData,
  type,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(
    getDefaultTab(tabs).key,
  );
  const handleChangeTab = React.useCallback(
    (key: string) => {
      setActiveTab(key);
      const newActiveTab = tabs.find(tab => tab.key === key);
      if (newActiveTab) {
        onTabChange?.(newActiveTab);
      }
    },
    [tabs, onTabChange],
  );

  const navElement = React.useMemo(
    () => (
      <Tab type={type}>
        {tabs.map(({ key, title }) => (
          <TabItemComponent<string>
            key={key}
            type={key}
            onClick={handleChangeTab}
            active={key === activeTab}
          >
            {title}
          </TabItemComponent>
        ))}
      </Tab>
    ),
    [type, tabs, activeTab, handleChangeTab],
  );

  return (
    <Wrapper className={className}>
      {stickyData ? (
        <StickyWrapper topPosition={stickyData.topPosition}>
          {navElement}
        </StickyWrapper>
      ) : (
        navElement
      )}
      <TabContentWrapper>
        {tabs.find(tab => tab.key === activeTab)?.page ??
          getDefaultTab(tabs)?.page}
      </TabContentWrapper>
    </Wrapper>
  );
};

export default DefaultMoimTab;
