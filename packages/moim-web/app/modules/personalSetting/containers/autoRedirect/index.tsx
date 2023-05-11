// vendor
import * as React from "react";
import { useHistory } from "react-router";
// hook
import useMedia from "common/hooks/useMedia";
// helper
import { MEDIA_QUERY } from "common/constants/responsive";
import { MoimURL } from "common/helpers/url";

function AutoRedirect() {
  const isExceptMobile = useMedia([MEDIA_QUERY.EXCEPT_MOBILE], [true], false);
  const history = useHistory();

  React.useEffect(() => {
    if (isExceptMobile) {
      history.replace({
        ...new MoimURL.PersonalSettingProfile().toObject(),
        state: {
          modal: true,
        },
      });
    }
  }, [history, isExceptMobile]);

  return null;
}

export default AutoRedirect;
