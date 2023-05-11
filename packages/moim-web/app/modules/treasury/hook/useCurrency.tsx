import { useContext } from "react";
import { TreasuryContext } from "../context";

export function useCurrency(): Moim.Treasury.ITreasuryContext {
  return useContext<Moim.Treasury.ITreasuryContext>(TreasuryContext);
}
