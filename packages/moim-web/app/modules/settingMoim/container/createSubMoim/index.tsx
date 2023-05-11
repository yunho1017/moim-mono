// vendor
import * as React from "react";
import { RouteComponentProps } from "react-router";
// hook
import { useHandlers, useProps, useEffects } from "./hooks";
// component
import CreateSubMoim from "../../components/createSubMoim";
import PermissionChecker from "common/components/permissionChecker";

export type IProps = RouteComponentProps;

const CreateSubMoimContainer: React.FunctionComponent<IProps> = props => {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps, hookHandlers);

  const {
    loading,
    tags,
    hasCreateSubGroupPermission,
    isPermissionLoading,
  } = hookProps;
  const { handleSubmit } = hookHandlers;

  return (
    <PermissionChecker
      fallbackType="SCREEN"
      hasPermission={hasCreateSubGroupPermission}
      isLoading={isPermissionLoading}
    >
      <CreateSubMoim
        tags={tags.data}
        onSubmit={handleSubmit}
        isLoadingSubmit={loading}
      />
    </PermissionChecker>
  );
};

export default CreateSubMoimContainer;
