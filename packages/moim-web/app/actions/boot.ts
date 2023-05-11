import { ThunkPromiseResult } from "app/store";
import { getChannels } from "app/actions/channel";
import { getDirectMessages } from "app/actions/directMessage";
import { getPermission } from "app/actions/permission";
import { getJoinedSubMoims } from "app/actions/group";
import { getCommunity } from "./community";
import { getCommunityCoins } from "./community/coin";

/**
 * 페이지 접속 또는 토큰만료로인하 새로고침시 항상 요청하는 액션에 대한 공통 묶음입니다.
 */

export function updateActionsForRefresh(): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const state = getState();
    const currentGroup = state.app.currentGroupId
      ? state.entities.groups[state.app.currentGroupId]
      : undefined;
    dispatch(getChannels({ limit: 100 }));
    dispatch(getPermission({}));
    dispatch(getCommunity());

    if (currentGroup?.config.enableCoin) {
      dispatch(getCommunityCoins());
    }
    if (state.app.currentUserId) {
      dispatch(getDirectMessages({ limit: 100 }));
      dispatch(getJoinedSubMoims());
    }
  };
}
