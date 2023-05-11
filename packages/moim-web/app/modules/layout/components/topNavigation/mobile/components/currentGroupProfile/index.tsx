import * as React from "react";

import HubMoimProfile from "./hub";
import SubMoimProfile from "./sub";

import useCurrentGroup from "common/hooks/useCurrentGroup";

const CurrentGroupProfile: React.FC = () => {
  const currentGroup = useCurrentGroup();

  if (currentGroup?.is_hub) {
    return <HubMoimProfile />;
  }
  return <SubMoimProfile />;
};

export default CurrentGroupProfile;
