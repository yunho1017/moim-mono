import * as React from "react";
import { useLocation } from "react-router";
import { goBack, replace } from "connected-react-router";

import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useActions, useStoreState } from "app/store";
import { MoimURL } from "common/helpers/url";
import { CURRENT_USER_KEY } from "common/constants/keys";

function MoimLogin() {
  const location = useLocation<any>();
  const handleSignIn = useHandleSignIn();
  const { currentUserId } = useStoreState(state => ({
    banner: state.popupBanner.banner,
    currentUserId:
      localStorage.getItem(CURRENT_USER_KEY) ?? state.app.currentUserId,
  }));

  const { dispatchReplace, dispatchGoBack } = useActions({
    dispatchReplace: replace,
    dispatchGoBack: goBack,
  });

  React.useEffect(() => {
    if (!currentUserId) {
      handleSignIn();
    } else {
      if ((location.state?.index ?? 0) > 1) {
        dispatchGoBack();
      } else {
        dispatchReplace(new MoimURL.MoimAppHome().toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default MoimLogin;
