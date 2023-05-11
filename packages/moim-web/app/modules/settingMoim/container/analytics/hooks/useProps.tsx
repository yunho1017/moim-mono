import useAnalyticsToken from "./useAnalyticsToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useStoreState } from "app/store";
import { getMoimAccessTokenToCookie } from "common/helpers/authentication";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const currentHubGroupId = useStoreState(state => state.app.currentHubGroupId);
  const token = currentHubGroupId
    ? getMoimAccessTokenToCookie(currentHubGroupId)
    : null;
  const group = useCurrentGroup();
  const analyticsToken = useAnalyticsToken(
    group ? group.id : null,
    token ?? null,
  );

  return {
    analyticsToken,
  };
}
