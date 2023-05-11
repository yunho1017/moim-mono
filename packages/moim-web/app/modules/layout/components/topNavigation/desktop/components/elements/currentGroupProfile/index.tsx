import * as React from "react";

import {
  LogoImage,
  MoimName,
  MoimNameWrapper,
  LogoImageWrapper,
} from "./styled";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import CoverAnchorWrapper from "../../../../components/coverAnchorWrapper";
import GroupProfileImage from "common/components/groupProfileImage";

import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import useIsCurrentGroupVisibleInTopNavi from "../../../../hooks/useIsCurrentGroupVisible";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

import { TopNavigationContext } from "../../../../context";

const CurrentGroupProfile: React.FC<{
  logoHeight?: number;
}> = ({ logoHeight }) => {
  const { visibleMoimName } = React.useContext(TopNavigationContext);
  const { isExpanded } = useSideNavigationPanel();
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();
  const parentGroup = useCurrentHubGroup();
  const isCurrentGroupVisible = useIsCurrentGroupVisibleInTopNavi();
  const { logo, parentLogo } = useStoreState(storeState => ({
    logo: storeState.group.theme.logo,
    parentLogo: storeState.group.parentTheme?.logo,
  }));

  const visibleGroup = React.useMemo(() => {
    if (isCurrentGroupVisible) {
      return currentGroup as Moim.Group.INormalizedGroup | null;
    } else {
      return parentGroup;
    }
  }, [parentGroup, currentGroup, isCurrentGroupVisible]);

  const visibleLogo = React.useMemo(
    () => ((!isMobile || isExpanded || !currentUser?.id) && parentLogo) || logo,
    [isMobile, isExpanded, currentUser, parentLogo, logo],
  );

  if (visibleLogo) {
    return (
      <LogoImageWrapper>
        <CoverAnchorWrapper logoHeight={logoHeight}>
          <LogoImage src={logo ?? parentLogo} />
        </CoverAnchorWrapper>
      </LogoImageWrapper>
    );
  }

  return (
    <MoimNameWrapper visibleMoimName={visibleMoimName}>
      <CoverAnchorWrapper logoHeight={logoHeight}>
        <GroupProfileImage
          icon={visibleGroup?.icon}
          title={visibleGroup?.name || ""}
          size="m"
        />
        {visibleMoimName && (
          <MoimName>
            <ShavedText
              line={2}
              value={<NativeEmojiSafeText value={visibleGroup?.name || ""} />}
            />
          </MoimName>
        )}
      </CoverAnchorWrapper>
    </MoimNameWrapper>
  );
};

export default CurrentGroupProfile;
