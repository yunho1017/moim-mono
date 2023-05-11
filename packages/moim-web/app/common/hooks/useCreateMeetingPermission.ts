import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useResourcePermissionWithoutSuperCheck } from "common/components/permissionChecker";

function useCreateMeetingPermission() {
  const currentGroup = useCurrentGroup();
  return useResourcePermissionWithoutSuperCheck(
    "CREATE_MEETING",
    currentGroup?.id || "",
  );
}

export default useCreateMeetingPermission;
