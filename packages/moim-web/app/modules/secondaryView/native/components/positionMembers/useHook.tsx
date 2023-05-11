// vendor
import * as React from "react";
// hook
import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import usePositionDataWithAutoBatch from "common/hooks/usePositionDataWithAutoBatch";
import useOpenState from "common/hooks/useOpenState";
import useCurrentUser from "common/hooks/useCurrentUser";
import usePositionApplyDialog from "common/components/positionApplyDialog/hooks/usePositionApplyDialog";
import { usePositionApplyable } from "common/components/positionApplyDialog/hooks/usePositionApplable";
// action
import { getPositionMembers } from "app/actions/position";
import { getBatchUsers } from "app/actions/user";
// selector
import {
  positionMemberSelector,
  getPositionMembersLoadingSelector,
  positionCreatorSelector,
} from "app/selectors/position";
// helper

export type IHookProps = ReturnType<typeof useProps>;

export interface IProps {
  positionId: Moim.Id;
}

export default function useProps(props: IProps) {
  const { positionId } = props;
  const {
    isOpen: menuOpenStatus,
    open: openMenu,
    close: closeMenu,
  } = useOpenState(false);
  const refMoreMenu = React.useRef<HTMLDivElement>(null);
  const { goBack } = useNativeSecondaryView();
  const currentUser = useCurrentUser();
  const isMobile = useIsMobile();
  const cancelToken = useCancelToken();
  const { position } = usePositionDataWithAutoBatch(positionId);
  const { openDialog } = usePositionApplyDialog();
  const visibleApplyButton = usePositionApplyable(position);

  const states = useStoreState(state => ({
    members: positionMemberSelector(state, positionId),
    getMemberLoading: getPositionMembersLoadingSelector(state, positionId),
    positionCreator: positionCreatorSelector(state, positionId),
  }));

  const { dispatchGetMembers, dispatchMemberBatch } = useActions({
    dispatchGetMembers: getPositionMembers,
    dispatchMemberBatch: getBatchUsers,
  });

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetMembers({ ...paging, positionId }, cancelToken.current.token);
    },
    [dispatchGetMembers, positionId, cancelToken],
  );

  const getPositionCreator = React.useCallback(() => {
    if (position) {
      dispatchMemberBatch([position.creator], cancelToken.current.token);
    }
  }, [position, dispatchMemberBatch, cancelToken]);

  const handleBackButtonClick = React.useCallback(() => {
    if (!isMobile) {
      goBack();
    }
  }, [isMobile]);

  const handleApplyPositionButtonClick = React.useCallback(() => {
    if (visibleApplyButton) {
      openDialog({ position: positionId });
    }
  }, [openDialog, positionId, visibleApplyButton]);

  const canDismissSelf = React.useMemo(() => {
    const participated = Boolean(
      states.members?.data.find(item => item.id === currentUser?.id),
    );
    return (
      participated &&
      Boolean(position?.config) &&
      !position?.config?.isApprovable &&
      Boolean(position?.config?.isApplyable)
    );
  }, [currentUser, position, states.members]);

  React.useEffect(() => {
    handleGetMembers();
    getPositionCreator();
  }, []);

  return {
    ...states,
    refMoreMenu,
    isMobile,
    position,
    visibleApplyButton,
    handleApplyPositionButtonClick,
    currentUser,
    menuOpenStatus,
    canDismissSelf,
    handleGetMembers,
    handleBackButtonClick,
    openMenu,
    closeMenu,
  };
}
