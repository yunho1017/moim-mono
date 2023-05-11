import * as React from "react";

import { LogoImage, MoimProfileWrapper, LogoImageWrapper } from "./styled";
import CoverAnchorWrapper from "../../../components/coverAnchorWrapper";
import GroupProfileImage from "common/components/groupProfileImage";

import { useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";

const HubMoimProfile: React.FC = () => {
  const currentGroup = useCurrentGroup();
  const { logo } = useStoreState(storeState => ({
    logo: storeState.group.theme.logo,
  }));

  if (logo) {
    return (
      <LogoImageWrapper>
        <CoverAnchorWrapper>
          <LogoImage src={logo} />
        </CoverAnchorWrapper>
      </LogoImageWrapper>
    );
  }

  return (
    <MoimProfileWrapper>
      <CoverAnchorWrapper>
        <GroupProfileImage
          icon={currentGroup?.icon}
          title={currentGroup?.name || ""}
          size="m"
        />
      </CoverAnchorWrapper>
    </MoimProfileWrapper>
  );
};

export default HubMoimProfile;
