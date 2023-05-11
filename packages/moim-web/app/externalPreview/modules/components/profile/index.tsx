import * as React from "react";
import { useRouteMatch } from "react-router";
import {
  getNFTItemsBatch,
  getUserInfo,
  getUserTokens,
} from "app/externalPreview/api/nft";
// helper
import { getUserToken } from "app/externalPreview/helper";
// component
import ProfileHelmet from "./helmet";
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import ProfileHeader from "./components/profileHeader";
import { DefaultLayout } from "../secondaryView/native/layout";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ProfileNftListPreview from "./components/userNfts/preview";
import Buttons from "./components/buttons";
import CoinGroup from "./components/coinGroup";
// styled
import {
  ParallaxWrapper,
  AppBarTitleWrapper,
  AppBarTitleUsername,
  ParallaxUsernameWrapper,
  ParallaxUsername,
  AppBarStickyWrapperStyle,
  Section,
  BioWrapper,
  UserBio,
  Wrapper,
} from "./styled";

function UserProfileShow() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { communityId, userId } = match.params;

  const isLogin = getUserToken();

  const [user, setUser] = React.useState<
    Moim.Community.ICommunityUser | undefined
  >(undefined);
  const [tokens, setTokens] = React.useState<Moim.NFT.INftToken[] | undefined>(
    undefined,
  );
  const [items, setItems] = React.useState<Moim.NFT.INftDetail[] | undefined>(
    undefined,
  );

  const handleGetData = React.useCallback(async () => {
    if (userId) {
      const userData = await getUserInfo(userId);
      setUser(userData);
      const userTokens = await getUserTokens(userId);
      setTokens(userTokens?.data);
      const ids = userTokens?.data.map((item: Moim.NFT.INftToken) => item.id);
      if (ids?.length) {
        const nftItems = await getNFTItemsBatch(ids);
        setItems(nftItems?.data);
      }
    }
  }, [userId]);

  React.useEffect(() => {
    handleGetData();
  }, []);

  if (!user || !userId || !communityId) return null;

  return (
    <>
      <ProfileHelmet
        username={user.name}
        userProfileImage={user.avatarUrl?.[0]}
        userBio={user.bio}
      />
      <DefaultLayout
        disableLeftButton={true}
        appBar={{
          wrapperStickyStyle: AppBarStickyWrapperStyle,
          titleElement: (
            <AppBarTitleWrapper>
              <UserProfileImage
                userId={user.userId}
                size="xs"
                src={user.avatarUrl || ""}
                canOpenProfileDialog={false}
              />
              <AppBarTitleUsername>
                <NativeEmojiSafeText value={user.name} />
              </AppBarTitleUsername>
            </AppBarTitleWrapper>
          ),
          titleAlignment: "Left",
          enableScrollParallax: true,
          parallaxWrapperComponent: ParallaxWrapper,
          titleContainerDisappearPosition: 20,
          parallaxDisappearPosition: 110,
          expendScrollParallaxElement: [
            <ProfileHeader
              userId={user.userId}
              avatar={user.avatarUrl || ""}
            />,
            <ParallaxUsernameWrapper>
              <ParallaxUsername>
                <ShavedText
                  value={<NativeEmojiSafeText value={user.name} />}
                  line={2}
                />
              </ParallaxUsername>
            </ParallaxUsernameWrapper>,
          ],
        }}
      >
        <Wrapper>
          <Section>
            <BioWrapper>
              <UserBio>
                <NativeEmojiSafeText value={user.bio || ""} />
              </UserBio>
            </BioWrapper>
          </Section>
          {isLogin && (
            <>
              <Buttons
                hasWalletAddress={Boolean(user.addresses?.length)}
                userId={userId}
              />
              <CoinGroup communityId={communityId} />
            </>
          )}
          <div>
            {items?.length && (
              <ProfileNftListPreview
                groupId={communityId}
                userId={userId}
                userTokens={items}
                tokens={tokens}
              />
            )}
          </div>
        </Wrapper>
      </DefaultLayout>
    </>
  );
}

export default UserProfileShow;
