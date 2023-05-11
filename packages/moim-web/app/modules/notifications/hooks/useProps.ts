import * as React from "react";
import { useStoreState, useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import {
  selectNotificationGroup,
  selectNotificationLength,
  selectNotificationLoading,
} from "app/selectors/notification";
import { getNotifications } from "app/actions/notification";

import { NotificationType } from "app/enums";

export type IHookProps = ReturnType<typeof useProps>;
export function useProps() {
  const cancelToken = useCancelToken();
  const states = useStoreState(storeState => ({
    notificationGroupList: selectNotificationGroup(storeState),
    notificationLength: selectNotificationLength(storeState),
    isLoading: selectNotificationLoading(storeState),
  }));

  const actions = useActions({
    dispatchGetNotifications: getNotifications,
  });

  const [selectedTab, setSelectedTab] = React.useState<
    Moim.Enums.NotificationType
  >(NotificationType.ALL);

  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const isEmptyNotification = React.useMemo(
    () =>
      !states.isLoading[selectedTab] && !states.notificationLength[selectedTab],
    [selectedTab, states.isLoading, states.notificationLength],
  );

  return {
    ...states,
    ...actions,
    selectedTab,
    setSelectedTab,
    cancelToken,
    scrollSectionRef,
    isEmptyNotification,
  };
}
