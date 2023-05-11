import { currentUserSelectorV2 } from "app/selectors/app";
import useStoreReselect from "common/hooks/useReselect";

export default function useCurrentUser(
  equalityFn?: (left: any, right: any) => boolean,
): Moim.User.INormalizedUser | null {
  return useStoreReselect(currentUserSelectorV2, equalityFn);
}
