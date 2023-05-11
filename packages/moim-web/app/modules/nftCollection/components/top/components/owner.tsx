import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useStoreState } from "app/store";
// constant
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
import { shaveWalletAddress } from "common/helpers/nft";
// hooks
import { useOpenProfileDialog } from "common/hooks/profileDialog";
// components
import { H10BoldStyle } from "common/components/designSystem/typos";
import BlockchainExternalLink from "app/modules/nft/components/blockchainExternalLink";

const Title = styled.div`
  ${H10BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-bottom: ${px2rem(4)};
`;

const OwnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${px2rem(4)};
  margin: ${px2rem(6)} 0;
  ${Title} {
    margin-bottom: 0;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
    margin-top: 0;
  }
`;

const OwnerNameWrapper = styled.div`
  ${H10BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

interface IProps {
  ownerId?: Moim.Id;
  ownerAddress?: string;
  network: Moim.Community.IBlockchainType;
}

const Owner: React.FC<IProps> = ({
  ownerId,
  ownerAddress,
  network,
}: IProps) => {
  const openProfileDialog = useOpenProfileDialog();
  const owner = useStoreState(state =>
    ownerId ? state.entities.users[ownerId] : undefined,
  );

  const handleClickOwnerName: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      e.stopPropagation();
      if (ownerId) {
        openProfileDialog(ownerId, { current: e.currentTarget });
      }
    },
    [openProfileDialog, ownerId],
  );

  const ownerName = React.useMemo(() => {
    if (!owner?.name && !ownerAddress) {
      return null;
    }

    if (owner) {
      return <span onClick={handleClickOwnerName}>{owner.name}</span>;
    }

    if (network && ownerAddress) {
      return (
        <BlockchainExternalLink network={network} address={ownerAddress} />
      );
    }

    return <span>{shaveWalletAddress(ownerAddress ?? "")}</span>;
  }, [handleClickOwnerName, network, owner, ownerAddress]);

  if (!ownerName && !ownerAddress) return null;

  return (
    <OwnerWrapper>
      <Title>
        <FormattedMessage id="nft_collection_show_contract_owner_title" />
      </Title>
      <OwnerNameWrapper role="button">{ownerName}</OwnerNameWrapper>
    </OwnerWrapper>
  );
};

export default React.memo(Owner);
