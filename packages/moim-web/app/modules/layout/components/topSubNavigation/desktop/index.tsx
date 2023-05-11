import * as React from "react";

import { Wrapper } from "./styled";
import ElementRenderer from "./components/elementRenderer";

import useCurrentGroup from "common/hooks/useCurrentGroup";

export default function DesktopTopSubNavigation() {
  const currentGroup = useCurrentGroup();
  const elements = React.useMemo(
    () =>
      currentGroup?.navigation_structure.web.topSubNavi.elements?.map(
        (element, index) => (
          <ElementRenderer key={`${element.type}-${index}`} element={element} />
        ),
      ),
    [currentGroup],
  );
  return <Wrapper>{elements}</Wrapper>;
}
