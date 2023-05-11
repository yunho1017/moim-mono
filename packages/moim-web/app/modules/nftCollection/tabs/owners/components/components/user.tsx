import * as React from "react";
import styled from "styled-components";
import { useStoreState } from "app/store";
// constant
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { shaveWalletAddress } from "common/helpers/nft";
import { px2rem } from "common/helpers/rem";
// components
import { MemberItem } from "common/components/itemCell";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import WithPositionChip from "common/components/withPositionChip/new";
import ShavedText from "common/components/shavedText";

const OwnerItemWrapper = styled.div`
  margin: ${px2rem(4)} 0;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: calc(100% + ${px2rem(32)});
    margin-left: ${px2rem(-16)};
  }
`;

interface IProps {
  owner: Moim.NFT.IContractOwner;
}

const User: React.FC<IProps> = ({ owner }: IProps) => {
  const user = useStoreState(state => state.entities.users[owner.userId]);
  const walletAddress = owner.addresses[0];

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

  if (user) {
    return (
      <OwnerItemWrapper>
        <MemberItem
          key={`${user.group_id}_${user.id}`}
          title={positionChipElement}
          subTitle={
            user.bio ? <NativeEmojiSafeText value={user.bio} /> : undefined
          }
          subTitleShaveLine={1}
          size="m"
          image={{ userId: user.id, src: user.avatar_url, size: "m" || "" }}
          canOpenProfileDialog={!user.is_deactivated}
        />
      </OwnerItemWrapper>
    );
  }

  return (
    <OwnerItemWrapper>
      <MemberItem
        key={`${walletAddress}`}
        title={
          <NativeEmojiSafeText
            value={shaveWalletAddress(walletAddress ?? "")}
          />
        }
        size="m"
        image={{ size: "m" }}
        canOpenProfileDialog={false}
      />
    </OwnerItemWrapper>
  );
};

export default React.memo(User);
