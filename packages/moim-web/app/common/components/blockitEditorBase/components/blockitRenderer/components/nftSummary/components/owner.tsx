import * as React from "react";
import { OwnerWrapper, OwnerNameWrapper, Title } from "./styled";
import { shaveWalletAddress } from "common/helpers/nft";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";
import BlockchainExternalLink from "app/modules/nft/components/blockchainExternalLink";

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

  if (!ownerName) return null;

  return (
    <OwnerWrapper>
      <Title>
        <FormattedMessage id="nft_show_owner_title" />
      </Title>
      <OwnerNameWrapper>{ownerName}</OwnerNameWrapper>
    </OwnerWrapper>
  );
};

export default React.memo(Owner);
