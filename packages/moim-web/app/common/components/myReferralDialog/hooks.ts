import { useActions } from "app/store";
import { ActionCreators } from "./actions";

export function useOpenMyReferralDialog() {
  const { open } = useActions({ open: ActionCreators.open });

  return open;
}
export function useCloseMyReferralDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return close;
}
