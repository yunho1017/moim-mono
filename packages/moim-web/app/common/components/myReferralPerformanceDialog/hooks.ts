import { useActions } from "app/store";
import { ActionCreators } from "./actions";

export function useOpenMyReferralPerformanceDialog() {
  const { open } = useActions({ open: ActionCreators.open });

  return open;
}
export function useCloseMyReferralPerformanceDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return close;
}
