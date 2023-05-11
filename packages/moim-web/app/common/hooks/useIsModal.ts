import { isModalSelector } from "app/selectors/app";
import useStoreReselect from "common/hooks/useReselect";

export default function useIsModal() {
  return useStoreReselect(isModalSelector);
}
