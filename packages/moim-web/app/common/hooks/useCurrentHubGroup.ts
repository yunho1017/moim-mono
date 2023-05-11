import { currentHubGroupSelector } from "app/selectors/app";
import useStoreReselect from "common/hooks/useReselect";

export default function useCurrentHubGroup(): Moim.Group.IGroup | null {
  return useStoreReselect(currentHubGroupSelector);
}
