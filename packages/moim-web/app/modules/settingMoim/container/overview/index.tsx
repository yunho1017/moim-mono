// vendor
import * as React from "react";
import { RouteComponentProps } from "react-router";
// hook
import { useHandlers, useProps, useEffects } from "./hooks";
// component
import Overview from "../../components/overview";
// helper
import { MoimURL } from "common/helpers/url";

export type IProps = RouteComponentProps;

const OverviewContainer: React.FunctionComponent<IProps> = props => {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps);

  const { currentGroup, redirect, loading } = hookProps;
  const { handleSubmit } = hookHandlers;

  if (!currentGroup) {
    redirect(new MoimURL.MoimAppHome().toString());
    return null;
  }

  return (
    <Overview
      name={currentGroup.name}
      description={currentGroup.description}
      coverImageUrl={""}
      icon={currentGroup.icon}
      urlPrefix={currentGroup.domain}
      onSubmit={handleSubmit}
      isLoadingSubmit={loading}
    />
  );
};

export default OverviewContainer;
