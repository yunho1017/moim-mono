import { currentGroupSelector } from "app/selectors/app";
import useStoreReselect from "common/hooks/useReselect";

export default function useCurrentGroup(): Moim.Group.INormalizedGroup | null {
  return useStoreReselect(currentGroupSelector);
}
