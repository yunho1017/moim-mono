import * as React from "react";
import { NFTItemCellOwnerWrapper, NFTItemCellOwner } from "./styled";
import { shaveWalletAddress } from "common/helpers/nft";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";

interface IProps {
  ownerId?: Moim.Id;
  ownedByAddress?: string;
  justifyContent?: "flex-start" | "center" | "flex-end";
}

const Owner: React.FC<IProps> = ({
  ownerId,
  ownedByAddress,
  justifyContent = "flex-start",
}: IProps) => {
  const openProfileDialog = useOpenProfileDialog();
  const owner = useStoreState(state => {
    return ownerId ? state.entities.users[ownerId] : undefined;
  });

  const handleClickOwnerName: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      e.stopPropagation();
      if (owner?.id) {
        openProfileDialog(owner.id, { current: e.currentTarget });
      }
    },
    [openProfileDialog, owner?.id],
  );

  if (!owner && !ownedByAddress) return null;

  return (
    <NFTItemCellOwnerWrapper
      onClick={owner ? handleClickOwnerName : undefined}
      justifyContent={justifyContent}
    >
      <NFTItemCellOwner>
        {owner ? (
          <span>
            <FormattedMessage id="nft_item_owner_title" /> @{owner.name}
          </span>
        ) : (
          shaveWalletAddress(ownedByAddress ?? "")
        )}
      </NFTItemCellOwner>
    </NFTItemCellOwnerWrapper>
  );
};

export default React.memo(Owner);
