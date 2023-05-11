import * as React from "react";

import { LogoImage, MoimProfileWrapper, LogoImageWrapper } from "./styled";
import CoverAnchorWrapper from "../../../components/coverAnchorWrapper";
import GroupProfileImage from "common/components/groupProfileImage";

import { useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsCurrentGroupVisibleInTopNavi from "../../../hooks/useIsCurrentGroupVisible";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

const SubMoimProfile: React.FC = () => {
  const isCurrentGroupVisible = useIsCurrentGroupVisibleInTopNavi();
  const currentGroup = useCurrentGroup();
  const parentGroup = useCurrentHubGroup();

  const { logo, parentLogo } = useStoreState(storeState => ({
    logo: storeState.group.theme.logo,
    parentLogo: storeState.group.parentTheme?.logo,
  }));

  const parentElement = React.useMemo(() => {
    if (parentLogo) {
      return (
        <LogoImageWrapper>
          <CoverAnchorWrapper>
            <LogoImage src={parentLogo} />
          </CoverAnchorWrapper>
        </LogoImageWrapper>
      );
    }

    return (
      <MoimProfileWrapper>
        <CoverAnchorWrapper>
          <GroupProfileImage
            icon={parentGroup?.icon}
            title={parentGroup?.name || ""}
            size="m"
          />
        </CoverAnchorWrapper>
      </MoimProfileWrapper>
    );
  }, [parentLogo, parentGroup?.icon, parentGroup?.name]);

  const currentElement = React.useMemo(() => {
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
  }, [logo, currentGroup?.icon, currentGroup?.name]);

  // 사이드 네비가 열려있거나 가입이 안되어 있을 때는 부모 모임 정보
  if (isCurrentGroupVisible) {
    return currentElement;
  } else {
    return parentElement;
  }
};

export default SubMoimProfile;
