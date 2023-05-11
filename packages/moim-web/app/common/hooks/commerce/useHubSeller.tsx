import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useStoreState } from "app/store";

export default function useHubSeller() {
  const currentGroup = useCurrentGroup();
  const { hubSeller } = useStoreState(state => ({
    hubSeller: state.entities.commerce_seller[currentGroup?.seller_id ?? ""],
  }));

  return hubSeller;
}
