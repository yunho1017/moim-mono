import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import ResponsiveMenu from "common/components/responsiveMenu";
import { MenuWrapper } from "common/components/responsiveMenu/components/menu";
import Profile from "./components/profile";
import MyShopping from "./components/myShopping";
import MoimList from "./components/moimList";
import PostTemplate from "./components/postTemplate";
import PersonalSettingButton from "app/modules/navigationPanel/components/moimConfigMenu/component/personalSettingButton";
import LogoutButton from "app/modules/navigationPanel/components/moimConfigMenu/component/logoutButton";
import MoimSettingButton from "app/modules/navigationPanel/components/moimConfigMenu/component/moimSettingButton";
import InviteMoimButton from "app/modules/navigationPanel/components/moimConfigMenu/component/inviteMoimButton";
import ShareMoimButton from "app/modules/navigationPanel/components/moimConfigMenu/component/shareMoimButton";
import MemberButton from "app/modules/navigationPanel/components/moimConfigMenu/component/memberButton";
import PluginsButton from "app/modules/navigationPanel/components/moimConfigMenu/component/pluginsButton";
import MoimAdminButton from "app/modules/navigationPanel/components/moimConfigMenu/component/moimAdminButton";
import PermissionChecker from "common/components/permissionChecker";
import { DefaultLoader } from "common/components/loading";
import { DefaultDivider } from "common/components/divider";

import useSuperPermission from "common/hooks/useSuperPermission";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { PermissionDeniedFallbackType } from "app/enums";
import { useActions } from "app/store";
import { ActionCreators } from "app/actions/secondaryView";
import useCurrentUser from "common/hooks/useCurrentUser";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  onClickMenuButton: () => void;
}

export default function ProfileMenu({ onClickMenuButton, ...props }: IProps) {
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const {
    hasPermission: hasSettingPermission,
    isLoading: isPermissionLoading,
  } = useSuperPermission();
  const [minHeight, setMinHeight] = React.useState<number | undefined>();

  const hasCommunityAccount = React.useMemo(
    () =>
      Boolean(
        currentUser?.profiles?.find(
          profile => profile.type === "COMMUNITY_ACCOUNT",
        ),
      ),
    [currentUser?.profiles],
  );
  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });

  const onClickMenuButtonFromProfileMenu = React.useCallback(() => {
    openFromProfile(true);
    onClickMenuButton();
  }, [onClickMenuButton, openFromProfile]);

  const onClickMenuButtonFromMyProfile = React.useCallback(() => {
    openFromProfile(false);
    onClickMenuButton();
  }, [onClickMenuButton, openFromProfile]);

  return (
    <ResponsiveMenu {...props} minHeight={minHeight}>
      <ReactResizeDetector handleHeight={true} onResize={handleResize}>
        <MenuWrapper>
          <Profile onClickButton={onClickMenuButtonFromMyProfile} />
          {currentGroup?.seller_id && (
            <MyShopping onClickButton={onClickMenuButtonFromProfileMenu} />
          )}
          <MoimList onClickButton={onClickMenuButton} />

          <DefaultDivider />

          {currentGroup?.config.showMemberCount && (
            <MemberButton onClickButton={onClickMenuButtonFromProfileMenu} />
          )}
          <InviteMoimButton onClickButton={onClickMenuButton} />
          <ShareMoimButton onClickButton={onClickMenuButton} />

          <DefaultDivider />

          <PersonalSettingButton onClickButton={onClickMenuButton} />
          {(hasSettingPermission || hasCommunityAccount) && (
            <MoimAdminButton onClickButton={onClickMenuButton} />
          )}
          {!isPermissionLoading ? (
            <PermissionChecker
              fallbackType={PermissionDeniedFallbackType.NONE}
              hasPermission={hasSettingPermission}
              isLoading={isPermissionLoading}
            >
              <>
                <MoimSettingButton onClickButton={onClickMenuButton} />

                <PluginsButton onClickButton={onClickMenuButton} />
                <PostTemplate onClickButton={onClickMenuButton} />
              </>
            </PermissionChecker>
          ) : (
            <DefaultLoader />
          )}

          <DefaultDivider />
          <LogoutButton onClickButton={onClickMenuButton} />
        </MenuWrapper>
      </ReactResizeDetector>
    </ResponsiveMenu>
  );
}
