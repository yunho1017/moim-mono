import { useCallback } from "react";

import useRedirect from "./useRedirect";

function useModalRedirect() {
  const redirect = useRedirect();

  return useCallback(
    (url: string) => {
      const urlArgs = url.split("?");
      redirect({
        pathname: urlArgs[0],
        search: urlArgs[1] ? `?${urlArgs[1]}` : undefined,
        state: {
          modal: true,
        },
      });
    },
    [redirect],
  );
}

export default useModalRedirect;
