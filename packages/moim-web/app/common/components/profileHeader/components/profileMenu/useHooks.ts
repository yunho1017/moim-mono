// vendor
import * as React from "react";

import useCurrentUser from "common/hooks/useCurrentUser";
// helper
import makeShareUrl from "common/helpers/makeShareUrl";
import { MoimURL } from "common/helpers/url";
import { IProps } from ".";

export default function useHooks(props: IProps) {
  const { userId } = props;
  const currentUser = useCurrentUser();
  const isMyProfile = userId === currentUser?.id;

  const shareUrl = React.useMemo(
    () =>
      makeShareUrl(
        userId
          ? new MoimURL.ProfileShare({
              userId,
            }).toString()
          : new MoimURL.NotFound().toString(),
      ),
    [userId],
  );

  return {
    ...props,
    shareUrl,
    isMyProfile,
  };
}
