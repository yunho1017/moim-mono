import * as React from "react";
import styled from "styled-components";
import { useStoreState } from "app/store";
// helper
import { shaveWalletAddress } from "common/helpers/nft";
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
// components
import { MemberItem } from "common/components/itemCell";
import WhiteMoreIconBase from "@icon/24-more-w.svg";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import WithPositionChip from "common/components/withPositionChip/new";
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import { TouchWrapper } from "common/icons/styledComponents";

import { NFTCollectionShowContext } from "app/modules/nftCollection/context";

const CURRENT_TAB_ID = "owners";

const MoreButtonIcon = styled(WhiteMoreIconBase).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

const LastUserWrapper = styled.div`
  position: relative;
  ${TouchWrapper} {
    position: absolute;
    left: ${px2rem(-6)};
    top: 0;
    z-index: ${props => props.theme.zIndexes.default};
  }
  &::after {
    content: "";
    z-index: 0;
    display: block;
    width: ${px2rem(24)};
    height: ${px2rem(24)};
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
    border-radius: 100%;
    top: 0;
    left: ${px2rem(-6)};
    position: absolute;
  }
`;

interface IProps {
  owner: Moim.NFT.IContractOwner;
  isLast?: boolean;
}

const User: React.FC<IProps> = ({ owner, isLast }: IProps) => {
  const isMobile = useIsMobile();
  const user = useStoreState(state => state.entities.users[owner.userId]);
  const { setSelectedTabId } = React.useContext(NFTCollectionShowContext);
  const walletAddress = owner.addresses[0];

  const handleClick = React.useCallback(() => {
    setSelectedTabId(CURRENT_TAB_ID);
  }, [setSelectedTabId]);

  const positionChipElement = React.useMemo(() => {
    if (!user) return null;
    return (
      <WithPositionChip
        positions={user.positions}
        displayChipLimit={1}
        hasPositionChip={true}
      >
        <ShavedText
          value={<NativeEmojiSafeText value={user.name} />}
          line={1}
        />
      </WithPositionChip>
    );
  }, [user]);

  if (!user && !walletAddress) return null;

  if (isMobile) {
    if (isLast) {
      return (
        <LastUserWrapper onClick={handleClick}>
          {user ? (
            <UserProfileImage
              size="s"
              userId={user.id}
              src={user?.avatar_url}
            />
          ) : (
            <UserProfileImage size="s" src={undefined} />
          )}
          <MoreButtonIcon />
        </LastUserWrapper>
      );
    }
    return user ? (
      <UserProfileImage size="s" userId={user.id} src={user?.avatar_url} />
    ) : (
      <UserProfileImage size="s" src={undefined} />
    );
  }

  if (user) {
    return (
      <MemberItem
        key={`${user.group_id}_${user.id}`}
        title={positionChipElement}
        size="xs"
        image={{ userId: user.id, src: user.avatar_url, size: "s" || "" }}
        canOpenProfileDialog={!user.is_deactivated}
      />
    );
  }

  return (
    <MemberItem
      key={`${walletAddress}`}
      title={
        <NativeEmojiSafeText value={shaveWalletAddress(walletAddress ?? "")} />
      }
      size="xs"
      image={{ size: "s" }}
      canOpenProfileDialog={false}
    />
  );
};

export default React.memo(User);
