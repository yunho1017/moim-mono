import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { getExternalCookieToken } from "app/externalPreview/helper";
import { getContractsList } from "app/externalPreview/api/nft";
// components
import NFTMintingHeader from "./components/header";
import MintingFields from "./components/fields";
// styled
import { Wrapper, Body } from "./styled";

function NFTMinting() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { communityId, userId } = match.params;
  const tokenId = getExternalCookieToken(communityId ?? "");

  const [contracts, setContracts] = React.useState<
    Moim.NFT.IContract[] | undefined
  >(undefined);

  const handleGetData = React.useCallback(async () => {
    const result = await getContractsList();
    setContracts(result?.data);
  }, []);

  React.useEffect(() => {
    handleGetData();
  }, []);

  if (!tokenId || !communityId || !userId) return null;

  return (
    <Wrapper>
      <NFTMintingHeader
        communityId={communityId}
        userId={userId}
        userToken={tokenId}
      />
      <Body>
        <MintingFields
          communityId={communityId}
          collections={contracts}
          userId={userId}
          userToken={tokenId}
        />
      </Body>
    </Wrapper>
  );
}

export default NFTMinting;
