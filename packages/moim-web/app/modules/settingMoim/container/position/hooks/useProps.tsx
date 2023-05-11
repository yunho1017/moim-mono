import { useIntl } from "react-intl";
import { useActions, useStoreState } from "app/store";
import {
  positionsSelector,
  positionStateSelector,
} from "app/selectors/position";
import useModalRedirect from "common/hooks/useModalRedirect";
import { getPositions } from "app/actions/position";
import { ActionCreators as PositionFormDialogActionCreators } from "app/actions/positionFormDialog";
import useCancelToken from "common/hooks/useCancelToken";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const redirect = useModalRedirect();
  const cancelToken = useCancelToken();
  const intl = useIntl();
  const actions = useActions({
    dispatchGetPositions: getPositions,
    dispatchOpenForCreate: PositionFormDialogActionCreators.openForCreate,
  });

  const state = useStoreState(storeState => {
    const positionState = positionStateSelector(storeState);
    return {
      positions: positionsSelector(storeState),
      positionsPaging: positionState.positions.paging,
      loadingPositions: positionState.getPositionsLoading,
    };
  });

  const title = intl.formatMessage({ id: "position_settings/title" });

  return {
    ...state,
    ...actions,
    title,
    redirect,
    cancelToken,
  };
}
