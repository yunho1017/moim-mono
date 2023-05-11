import * as React from "react";
import { selectShowProfileBlocks } from "app/selectors/profile";
import { useStoreState } from "app/store";
// components
import Positions from "../positions";
import CryptoBadges from "../cryptobadges";
import MyShopping, { useVisibleMyShoppingSection } from "../myShopping";
import ProfileNftListPreview from "../userNfts/preview";
import MyDQuests from "../dquests";
import {
  Wrapper,
  Body,
  BioWrapper,
  UserBio,
  Section,
  UserWalletAddress,
} from "./styledComponent";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { Spacer } from "common/components/designSystem/spacer";
import CoinGroup from "../coinGroup";

import { shaveWalletAddress } from "common/helpers/nft";

interface IProps {
  userData: Moim.User.INormalizedUser | undefined;
  positions: Moim.Id[] | undefined;
}

const ProfileComponent: React.FC<IProps> = ({ userData, positions }) => {
  const { isMine, blocks } = useStoreState(state => ({
    isMine: state.app.currentUserId === state.profileData.targetUserId,
    blocks: selectShowProfileBlocks(state),
  }));
  const visibleMyShoppingSection = useVisibleMyShoppingSection();

  const blockElements = React.useMemo(
    () =>
      userData
        ? blocks?.map((block, index) => {
            switch (block.type as string) {
              case "my-shopping":
                if (visibleMyShoppingSection) {
                  return (
                    <>
                      <Spacer
                        value={12}
                        key={`profile_show_block_${block.type}_${index}_spacer_1`}
                      />
                      <MyShopping
                        key={`profile_show_block_${block.type}_${index}`}
                      />
                      <Spacer
                        value={12}
                        key={`profile_show_block_${block.type}_${index}_spacer_2`}
                      />
                    </>
                  );
                }

                return null;

              case "my-quest": {
                if (isMine) {
                  return (
                    <MyDQuests
                      key={`profile_show_block_${block.type}_${index}`}
                    />
                  );
                }
                return null;
              }

              case "nft-list-preview":
                return (
                  <Section key={`profile_show_block_${block.type}_${index}`}>
                    <Spacer value={12} />
                    <ProfileNftListPreview userId={userData.id} />
                    <Spacer value={12} />
                  </Section>
                );
              case "positions":
                return (
                  <Section key={`profile_show_block_${block.type}_${index}`}>
                    <Spacer value={12} />
                    <Positions positions={positions} />
                    <Spacer value={12} />
                  </Section>
                );
              case "badges":
                return (
                  <Section key={`profile_show_block_${block.type}_${index}`}>
                    <Spacer value={12} />
                    <CryptoBadges viewType={block.viewType} user={userData} />
                    <Spacer value={12} />
                  </Section>
                );

              case "coin-group":
                const resourceId = (block as any).resourceId;
                if (resourceId) {
                  return (
                    <Section key={`profile_show_block_${block.type}_${index}`}>
                      <Spacer value={12} />
                      <CoinGroup id={resourceId} /> <Spacer value={12} />
                    </Section>
                  );
                }
                break;
              case "DQuest-list-preview": {
                return null;
              }
              default:
                return (
                  <BlockitRenderer
                    key={`profile_show_block_${block.type}_${index}`}
                    block={block}
                  />
                );
            }
          })
        : null,
    [userData, blocks, positions, isMine, visibleMyShoppingSection],
  );

  return (
    <Wrapper>
      <Body>
        {userData?.metamask &&
        blocks?.find(block => block.type === "metamask-address") ? (
          <UserWalletAddress>
            {shaveWalletAddress(userData.metamask)}
          </UserWalletAddress>
        ) : null}
        {userData?.bio ? (
          <Section>
            <BioWrapper>
              <UserBio>
                <NativeEmojiSafeText value={userData.bio} />
              </UserBio>
            </BioWrapper>
          </Section>
        ) : null}
        {blockElements}
      </Body>
    </Wrapper>
  );
};

export default ProfileComponent;
