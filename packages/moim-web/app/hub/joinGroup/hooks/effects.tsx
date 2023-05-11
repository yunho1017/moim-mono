import * as React from "react";
import { IHookProps } from ".";
import MyMoimManager from "common/helpers/useUserMoimManager";

export default function useEffects(props: IHookProps) {
  const {
    currentGroupId,
    isMyGroupsLoading,
    myGroupIds,
    dispatchGetMyGroups,
    cancelToken,
    cryptoBadgeAccessToken,
  } = props;

  React.useEffect(() => {
    if (cryptoBadgeAccessToken) {
      dispatchGetMyGroups(
        {
          group: currentGroupId || "",
          token: cryptoBadgeAccessToken,
        },
        cancelToken.current.token,
      );
    }
  }, [
    cancelToken,
    cryptoBadgeAccessToken,
    currentGroupId,
    dispatchGetMyGroups,
  ]);

  React.useEffect(() => {
    if (!isMyGroupsLoading && myGroupIds.length) {
      MyMoimManager.compareUserMoim(myGroupIds);
    }
  }, [isMyGroupsLoading, myGroupIds]);
}
