import React from "react";
import styled from "styled-components";
import { useStoreState } from "app/store";
// hooks
import { useOpenProfileDialog } from "common/hooks/profileDialog";
//helpers
import { px2rem } from "common/helpers/rem";
// components
import BlockchainExternalLink from "app/modules/nft/components/blockchainExternalLink";
import { B3Regular } from "common/components/designSystem/typos";
import UserProfileImage from "common/components/userProfileImage";
import { Spacer } from "common/components/designSystem/spacer";

const Wrapper = styled.div``;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};
`;

const OwnerName = styled(B3Regular).attrs({ role: "button" })`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(14)};
`;

interface PropsType {
  ownerId: string;
  network: Moim.Community.IBlockchainType;
  ownerUserId?: string;
}

const Owner: React.FC<PropsType> = ({ ownerId, ownerUserId, network }) => {
  const openProfileDialog = useOpenProfileDialog();
  const owner = useStoreState(state =>
    ownerUserId ? state.entities.users[ownerUserId] : undefined,
  );
  const handleClickOwnerName: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (owner?.id) {
        openProfileDialog(owner.id, { current: e.currentTarget });
      }
    },
    [owner?.id],
  );

  const ownerName = React.useMemo(() => {
    return (
      <UserWrapper onClick={handleClickOwnerName}>
        <UserProfileImage
          size="s"
          src={owner?.avatar_url}
          canOpenProfileDialog={false}
        />
        {owner?.name ? (
          <span>{owner.name}</span>
        ) : (
          <BlockchainExternalLink network={network} address={ownerId} />
        )}
      </UserWrapper>
    );
  }, [handleClickOwnerName, network, owner?.avatar_url, owner?.name, ownerId]);

  if (!ownerId && !ownerUserId) return null;

  return (
    <Wrapper>
      <Spacer value={18} />
      <OwnerName>{ownerName}</OwnerName>
    </Wrapper>
  );
};

export default React.memo(Owner);
