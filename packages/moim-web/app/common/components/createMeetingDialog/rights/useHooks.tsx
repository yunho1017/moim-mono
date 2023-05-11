import * as React from "react";
import { useStoreState, useActions } from "app/store";
import { getPermission } from "app/actions/permission";
import { IProps, IChangesRight } from ".";
import { channelRightsSelector } from "./selector";

export function useProps(props: IProps) {
  const { channelType, channelId } = props;
  const [changes, setChanges] = React.useState<{
    [key: string]: IChangesRight;
  }>({});

  const { rights, permissionLoading } = useStoreState(state => ({
    rights: channelRightsSelector(state, channelId, channelType),
    permissionLoading: state.permission.permissionLoading,
  }));

  const { dispatchGetPermission } = useActions({
    dispatchGetPermission: getPermission,
  });

  React.useEffect(() => {
    if (channelId && permissionLoading[channelId] === undefined) {
      dispatchGetPermission({ resource: channelId });
    }
  }, [channelId, dispatchGetPermission, permissionLoading]);

  return {
    ...props,
    rights,
    changes,
    setChanges,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const { changes, setChanges } = props;
  const handleChangeRightData = React.useCallback(
    (params: IChangesRight) => {
      setChanges({
        ...changes,
        [params.right]: params,
      });
    },
    [changes, setChanges],
  );

  const getRightsData = React.useCallback(
    () => Object.entries(changes).map(change => change[1]),
    [changes],
  );

  return {
    ...props,
    handleChangeRightData,
    getRightsData,
  };
}
