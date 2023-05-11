import * as React from "react";
import { useHistory } from "react-router";
import { useStoreState } from "app/store";
import { getPreviousLocationSelector } from "app/selectors/app";
import getBackHistoryKey from "app/common/helpers/getBackHistoryKey";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "app/common/helpers/url";

function useNavigationModalClose() {
  const history = useHistory<Moim.IMatchParams>();
  const redirect = useRedirect();
  const { locations, currentLocationKey, prevLocation } = useStoreState(
    state => ({
      locations: state.app.history.locations,
      currentLocationKey: state.app.history.currentLocationKey,
      prevLocation: getPreviousLocationSelector(state),
    }),
  );

  const historyBackKey = getBackHistoryKey(
    locations,
    currentLocationKey,
    prevLocation?.key,
  );

  return React.useCallback(() => {
    if (!historyBackKey) {
      redirect(new MoimURL.MoimAppHome().toString());
      return;
    }

    history.go(historyBackKey);
  }, [historyBackKey, history]);
}

export default useNavigationModalClose;
