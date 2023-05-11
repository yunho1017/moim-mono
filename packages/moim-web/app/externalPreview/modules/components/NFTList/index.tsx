import * as React from "react";
import { useRouteMatch } from "react-router";
import { getNFTItemsBatch, getUserTokens } from "app/externalPreview/api/nft";
// components
import UserNftList from "./NFTList";

function UserNFTs() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { communityId, userId } = match.params;

  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [tokens, setTokens] = React.useState<Moim.NFT.INftToken[] | undefined>(
    undefined,
  );
  const [items, setItems] = React.useState<Moim.NFT.INftDetail[] | undefined>(
    undefined,
  );

  const handleGetData = React.useCallback(async () => {
    try {
      if (userId) {
        const userTokens = await getUserTokens(userId);
        setTokens(userTokens?.data);
        const ids = userTokens?.data.map((item: Moim.NFT.INftToken) => item.id);
        if (ids?.length) {
          const nftItems = await getNFTItemsBatch(ids);
          setItems(nftItems?.data);
        }
      }
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [userId]);

  React.useEffect(() => {
    handleGetData();
  }, []);

  return (
    <UserNftList
      tokens={tokens}
      groupId={communityId ?? ""}
      items={items}
      loading={isLoading}
    />
  );
}

export default UserNFTs;
