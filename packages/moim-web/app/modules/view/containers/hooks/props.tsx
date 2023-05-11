import { useIntl } from "react-intl";
import { getChannel } from "app/actions/channel";
import { getPermission } from "app/actions/permission";
import { channelByIdSelector } from "app/selectors/channel";
import { useActions, useStoreState } from "app/store";
import { useResourcePermission } from "common/components/permissionChecker";
import useCancelToken from "common/hooks/useCancelToken";
import useIsMobile from "common/hooks/useIsMobile";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { IProps } from "../";
import useCurrentGroup from "app/common/hooks/useCurrentGroup";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const blocks = useStoreState(
    state =>
      (channelByIdSelector(
        state,
        props.channelId,
      ) as Moim.Channel.IViewSimpleChannel)?.view.blocks ?? [],
  );
  const states = useStoreState(state => ({
    currentView: channelByIdSelector(state, props.channelId),
    permissionLoading: state.permission.permissionLoading,

    // for-google-verification
    currentUserId: state.app.currentUserId,
    currentGroupId: state.app.currentGroupId,
  }));

  const actions = useActions({
    dispatchGetChannel: getChannel,
    dispatchGetPermission: getPermission,
  });

  const cancelToken = useCancelToken();
  const intl = useIntl();
  const isMobile = useIsMobile();
  const {
    hasPermission: hasReadPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("READ", props.channelId);
  const currentGroup = useCurrentGroup();
  const { expandSideNavigation } = useSideNavigationPanel();
  return {
    ...props,
    ...actions,
    ...states,
    blocks,
    isMobile,
    intl,
    currentGroup,
    cancelToken,
    hasReadPermission,
    isPermissionLoading,
    expandSideNavigation,
  };
}
