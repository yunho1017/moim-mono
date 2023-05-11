import { useCallback } from "react";
import * as qs from "query-string";
import useRedirect from "app/common/hooks/useRedirect";

function useOpenDQuestShowModal() {
  const redirect = useRedirect();
  return useCallback(
    (questId: Moim.Id) => {
      if (questId) {
        const query = qs.parse(location.search);
        redirect({
          pathname: location.pathname,
          search: qs.stringify({
            ...query,
            questId,
          }),
        });
      }
    },
    [redirect],
  );
}

export default useOpenDQuestShowModal;
