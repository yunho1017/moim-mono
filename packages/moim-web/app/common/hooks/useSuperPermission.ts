import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useResourcePermission } from "common/components/permissionChecker";

function useSuperPermission() {
  const currentGroup = useCurrentGroup();
  return useResourcePermission("SUPER", currentGroup?.id || "");
}

export default useSuperPermission;
