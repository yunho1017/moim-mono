import * as React from "react";
// component
import ProfileHeader from "common/components/profileHeader";
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import ProfileHelmet from "../../helmet";
import {
  AppBarStickyWrapperStyle,
  AppBarTitleUsername,
  AppBarTitleWrapper,
  BackIconButton,
  CloseButton,
  ParallaxUsername,
  ParallaxUsernameWrapper,
  ParallaxWrapper,
} from "../../styled";
// selector
// actions
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import useIsMobile from "common/hooks/useIsMobile";
import { NativeMemoryHistoryContext } from "../../../SecondaryHistory";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";

const SecondaryViewLayout: React.FC<{
  user: Moim.User.INormalizedUser | undefined | null;
}> = ({ user, children }) => {
  const isMobile = useIsMobile();
  const history = React.useContext(NativeMemoryHistoryContext);
  const renderCloseButton = React.useCallback(
    (close: () => void) => <CloseButton onClick={close} />,
    [],
  );

  return (
    <>
      <ProfileHelmet
        username={user?.name ?? ""}
        userProfileImage={user?.avatar_url}
        userBio={user?.bio}
      />
      <DefaultLayout
        appBar={{
          wrapperStickyStyle: AppBarStickyWrapperStyle,
          titleElement: (
            <AppBarTitleWrapper>
              <UserProfileImage
                userId={user?.id}
                size="xs"
                src={user?.avatar_url || ""}
                canOpenProfileDialog={false}
                isOnline={user?.presence === "ACTIVE"}
                enableBlockedPlaceholder={true}
              />
              <AppBarTitleUsername>
                <NativeEmojiSafeText value={user?.name ?? ""} />
              </AppBarTitleUsername>
            </AppBarTitleWrapper>
          ),
          titleAlignment: "Left",
          leftButton: history && history?.index > 2 && !isMobile && (
            <BackIconButton size="s" touch={24} onClick={history.goBack} />
          ),
          enableScrollParallax: true,
          parallaxWrapperComponent: ParallaxWrapper,
          titleContainerDisappearPosition: 20,
          parallaxDisappearPosition: 110,
          expendScrollParallaxElement: [
            <ProfileHeader
              type="show"
              userId={user?.id ?? ""}
              avatar={user?.avatar_url || ""}
              isOnline={user?.presence === "ACTIVE"}
            />,
            <ParallaxUsernameWrapper>
              <ParallaxUsername>
                <ShavedText
                  value={<NativeEmojiSafeText value={user?.name ?? ""} />}
                  line={2}
                />
              </ParallaxUsername>
            </ParallaxUsernameWrapper>,
          ],
        }}
        renderCloseButton={renderCloseButton}
      >
        {children}
      </DefaultLayout>
    </>
  );
};

export default SecondaryViewLayout;
