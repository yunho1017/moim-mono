import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import createURLDefinition from "common/helpers/url/createDefinition";
import TabRoutePage, { TabType } from "./tabRoutePage";

export interface IRoutedTab {
  key: string;
  url:
    | ReturnType<typeof createURLDefinition>
    | ReturnType<typeof createURLDefinition>[];
  exact?: boolean;
  title: React.ReactNode;
  page: React.ComponentType<any>;
  default?: boolean;
}

interface IProps {
  tabs: IRoutedTab[];
  type?: TabType;
  stickyData?: {
    topPosition: number;
  };
  routedTabContainerStyle?: FlattenInterpolation<any>;
  className?: string;
  onTabChange?: (selectedTab: IRoutedTab) => void;
}

const getDefaultTab = (tabs: IRoutedTab[]): IRoutedTab => {
  return tabs.find(tab => Boolean(tab.default)) || tabs[0];
};

class RoutedMoimTab extends React.Component<IProps> {
  public render() {
    const {
      type,
      tabs,
      stickyData,
      routedTabContainerStyle,
      className,
    } = this.props;
    const defaultTab = this.getDefaultTab();

    return (
      <Switch>
        {tabs.map(tab => (
          <Route
            key={tab.key}
            exact={tab.exact !== false}
            path={(Array.isArray(tab.url) ? tab.url : [tab.url]).map(
              url => url.pattern,
            )}
          >
            <TabRoutePage
              className={className}
              type={type}
              tabs={tabs}
              selectedTab={tab}
              stickyData={stickyData}
              containerStyle={routedTabContainerStyle}
              onTabClick={this.handleClick}
            />
          </Route>
        ))}
        <Redirect
          to={(Array.isArray(defaultTab.url)
            ? defaultTab.url[0]
            : defaultTab.url
          ).toString()}
        />
      </Switch>
    );
  }

  private readonly handleClick = (selectedTab: IRoutedTab) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(selectedTab);
    }
  };

  private readonly getDefaultTab = (): IRoutedTab => {
    return getDefaultTab(this.props.tabs);
  };
}

export default RoutedMoimTab;
