import * as React from "react";

import useCurrentGroup from "common/hooks/useCurrentGroup";

const useProfileInputDisabled = () => {
  const currentGroup = useCurrentGroup();

  return React.useMemo(
    () => !currentGroup?.is_hub && currentGroup?.config.useOnlyParentProfile,
    [currentGroup],
  );
};

export default useProfileInputDisabled;
