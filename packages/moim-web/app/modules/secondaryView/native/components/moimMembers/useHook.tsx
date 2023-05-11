import * as React from "react";
import { FormattedMessage } from "react-intl";
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import { Header, HeaderTitle } from "./styled";
import {
  moimMembersSelector,
  getMemberLoadingLoadingSelector,
} from "app/selectors/moim";
import {
  positionsSelector,
  positionStateSelector,
} from "app/selectors/position";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { getUsers } from "app/actions/user";
import { getPositions } from "app/actions/position";
import AppBar from "common/components/appBar";
import useGroupTexts from "common/hooks/useGroupTexts";
import { useHasApplyablePosition } from "common/components/positionApplyDialog/hooks/usePositionApplable";
import usePositionApplyDialog from "common/components/positionApplyDialog/hooks/usePositionApplyDialog";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const memberTexts = useGroupTexts("member");
  const { openDialog: openPositionApplyDialog } = usePositionApplyDialog();
  const hasApplyablePosition = useHasApplyablePosition();
  const states = useStoreState(state => ({
    members: moimMembersSelector(state),
    getMemberLoading: getMemberLoadingLoadingSelector(state),
    positions: positionsSelector(state),
    positionsPaging: positionStateSelector(state).positions.paging,
    positionsLoading: positionStateSelector(state).getPositionsLoading,
  }));

  const { dispatchGetMembers, dispatchGetPositions } = useActions({
    dispatchGetMembers: getUsers,
    dispatchGetPositions: getPositions,
  });

  const memberText = React.useMemo(() => memberTexts?.plural, [memberTexts]);

  const appBarInfoData = React.useMemo(
    () =>
      ({
        titleElement: (
          <HeaderTitle>
            <FormattedMessage
              id="moim_member_show/page_title"
              values={{ ref_member: memberText }}
            />
            {` (${currentGroup?.users_count})`}
          </HeaderTitle>
        ),
        titleAlignment: "Left",
        enableScrollParallax: true,
        parallaxWrapperComponent: Header,
        expendScrollParallaxElement: (
          <>
            <FormattedMessage
              id="moim_member_show/page_title"
              values={{ ref_member: memberText }}
            />
            {` (${currentGroup?.users_count})`}
          </>
        ),
      } as React.ComponentProps<typeof AppBar>),
    [currentGroup, memberText],
  );

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetMembers({ ...paging }, cancelToken.current.token);
    },
    [dispatchGetMembers, cancelToken],
  );

  const handleGetPositions = React.useCallback(() => {
    dispatchGetPositions({}, cancelToken.current.token);
  }, [cancelToken, dispatchGetPositions]);

  const handlePositionLoadMore = React.useCallback(() => {
    if (!states.positionsLoading && states.positionsPaging.after) {
      dispatchGetPositions({
        after: states.positionsPaging.after,
      });
    }
  }, [
    states.positionsLoading,
    states.positionsPaging.after,
    dispatchGetPositions,
  ]);

  return {
    ...states,
    appBarInfoData,
    currentGroup,
    hasApplyablePosition,
    handleGetMembers,
    handleGetPositions,
    handlePositionLoadMore,
    openPositionApplyDialog,
  };
}
