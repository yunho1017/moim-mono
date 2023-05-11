import * as React from "react";
import { FormattedMessage } from "react-intl";
import { NotificationType } from "app/enums";

import InfiniteScroller from "common/components/infiniteScroller";
import { DefaultLoader as Loader } from "common/components/loading";
import { TabItemComponent, Tab } from "common/components/tab";
import NotificationGroup from "./components/notificationGroup";
import Empty from "./components/empty";
import { Wrapper, Contents } from "./styled";

import { useProps, useHandlers, useEffects } from "./hooks";

const NOTIFICATION_TABS = [
  {
    type: NotificationType.ALL,
    title: <FormattedMessage id="notifications/tab_all" />,
  },
  {
    type: NotificationType.MENTION,
    title: <FormattedMessage id="notifications/tab_mentions" />,
  },
];
export default function NotificationList() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    notificationGroupList,
    notificationLength,
    isLoading,
    selectedTab,
    scrollSectionRef,
    isEmptyNotification,
  } = hookProps;
  const {
    handleLoadMoreAllNotification,
    handleLoadMoreMentionNotification,
    handleClickTab,
  } = hookHandlers;

  const infiniteScrollerProps = React.useMemo(
    () => ({
      loadMore:
        selectedTab === NotificationType.ALL
          ? handleLoadMoreAllNotification
          : handleLoadMoreMentionNotification,
      loader: <Loader />,
      paging: notificationGroupList[selectedTab].paging,
      itemLength: notificationLength[selectedTab],
      isLoading: isLoading[selectedTab],
    }),
    [
      handleLoadMoreAllNotification,
      handleLoadMoreMentionNotification,
      isLoading,
      notificationGroupList,
      notificationLength,
      selectedTab,
    ],
  );

  return (
    <Wrapper>
      <Tab>
        {NOTIFICATION_TABS.map(tab => (
          <TabItemComponent<Moim.Enums.NotificationType>
            key={tab.type}
            type={tab.type}
            onClick={handleClickTab}
            active={tab.type === selectedTab}
          >
            {tab.title}
          </TabItemComponent>
        ))}
      </Tab>
      <Contents ref={scrollSectionRef}>
        {!isEmptyNotification ? (
          <InfiniteScroller {...infiniteScrollerProps}>
            {Object.entries(notificationGroupList[selectedTab].data).map(
              ([type, notifications]: [
                Moim.Enums.NotificationGroupKeyType,
                Moim.Notification.INotification[],
              ]) => (
                <NotificationGroup
                  key={type}
                  type={type}
                  notifications={notifications}
                />
              ),
            )}
          </InfiniteScroller>
        ) : (
          <Empty type={selectedTab} />
        )}
      </Contents>
    </Wrapper>
  );
}
