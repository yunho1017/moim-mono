import * as React from "react";

import useIsCurrentGroupVisibleInTopNavi from "../../hooks/useIsCurrentGroupVisible";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
import { useHomeUrl } from "common/hooks/useRedirectDefaultChannel";
import { InfoAnchorWrapper, InfoLinkWrapper } from "./styled";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

const CoverAnchorWrapper: React.FC<React.PropsWithChildren<{
  logoHeight?: number;
}>> = ({ logoHeight, children }) => {
  const visibleCurrentGroup = useIsCurrentGroupVisibleInTopNavi();
  const homeUrl = useHomeUrl();
  const parentGroup = useCurrentHubGroup();

  return !visibleCurrentGroup && parentGroup ? (
    <InfoAnchorWrapper
      sizeHeight={logoHeight}
      href={parentGroup.url}
      onClick={() => {
        AnalyticsClass.getInstance().channelListParentLogoSelect();
      }}
    >
      {children}
    </InfoAnchorWrapper>
  ) : (
    <InfoLinkWrapper
      sizeHeight={logoHeight}
      to={homeUrl}
      onClick={() => {
        AnalyticsClass.getInstance().channelListParentLogoSelect();
      }}
    >
      {children}
    </InfoLinkWrapper>
  );
};

export default CoverAnchorWrapper;
