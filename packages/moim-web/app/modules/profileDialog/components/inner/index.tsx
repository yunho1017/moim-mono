import React from "react";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
// hook
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
// components
import ProfileDialogBody from "./components/body";
import ProfileDialogHeader from "./components/header";
import { Wrapper } from "./styledComponent";

import { MoimURL } from "common/helpers/url";
import ProfileDialogBlockedUserChecker from "../blockedUserChecker";

interface IProps {
  userId: Moim.Id;
  userData: Moim.User.IUser;
  cryptoBadges: Moim.IListResponse<getCertificates_certificates_edges>;
  isCryptoBadgeLoading: boolean;

  onCloseRequest(): void;
  onChangeBodyResize(): void;
}

const ProfileDialogComponent = React.forwardRef<HTMLDivElement, IProps>(
  (
    {
      userId,
      userData,
      isCryptoBadgeLoading,
      cryptoBadges,
      onCloseRequest,
      onChangeBodyResize,
    },
    ref,
  ) => {
    const {
      isExpanded: sideNavigationExpanded,
      collapseSideNavigation,
    } = useSideNavigationPanel();
    const { redirect } = useNativeSecondaryView();

    const openProfileSecondaryPanel = React.useCallback(() => {
      redirect(new MoimURL.Members({ userId }).toString());
    }, [redirect, userId]);

    const handleProfileClick = React.useCallback(() => {
      openProfileSecondaryPanel();
      onCloseRequest();
      if (sideNavigationExpanded) {
        collapseSideNavigation();
      }
    }, [
      onCloseRequest,
      collapseSideNavigation,
      openProfileSecondaryPanel,
      sideNavigationExpanded,
    ]);

    if (!userData) return null;

    return (
      <Wrapper ref={ref}>
        <ProfileDialogHeader
          userData={userData}
          onCloseRequest={onCloseRequest}
          onProfileClick={handleProfileClick}
        />
        <ProfileDialogBlockedUserChecker userId={userId}>
          <ProfileDialogBody
            userData={userData}
            cryptoBadges={cryptoBadges}
            isCryptoBadgeLoading={isCryptoBadgeLoading}
            onProfileClick={handleProfileClick}
            onChangeBodyResize={onChangeBodyResize}
            onCloseRequest={onCloseRequest}
          />
        </ProfileDialogBlockedUserChecker>
      </Wrapper>
    );
  },
);

export default ProfileDialogComponent;
