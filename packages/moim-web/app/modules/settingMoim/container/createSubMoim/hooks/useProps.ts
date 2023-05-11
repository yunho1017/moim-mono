// hook
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
// selector
import { isCreateSubMoimSelector } from "app/selectors/moim";
// action
import { getTags } from "app/actions/tag";
import { createSubGroup } from "app/actions/group";
// type
import { IProps } from "../";
import { tagsSelector } from "app/selectors/tagAndSubgroup";
import { useResourcePermission } from "common/components/permissionChecker";
import useCurrentGroup from "common/hooks/useCurrentGroup";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const states = useStoreState(storeState => ({
    loading: isCreateSubMoimSelector(storeState),
    tags: tagsSelector(storeState),
  }));
  const actions = useActions({
    dispatchCreateSubGroup: createSubGroup,
    dispatchGetTags: getTags,
  });
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const {
    hasPermission: hasSuperPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("SUPER", currentGroup!.id);
  const { hasPermission: hasCreateSubGroupPermission } = useResourcePermission(
    "CREATE_SUBGROUP",
    currentGroup!.id,
  );

  return {
    ...props,
    ...states,
    ...actions,
    cancelToken,
    hasCreateSubGroupPermission:
      hasCreateSubGroupPermission || hasSuperPermission,
    isPermissionLoading,
  };
}
