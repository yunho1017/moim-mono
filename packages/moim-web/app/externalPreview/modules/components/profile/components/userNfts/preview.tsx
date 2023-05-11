import * as React from "react";
import { ProfileNFTGrid } from "./components/list";
import { NFTItem, Skeleton } from "./components/item";
import { Header } from "./components/header";
import { NFTEmpty } from "../empty";

interface IProps {
  userId: string;
  groupId: string;
  userTokens: Moim.NFT.INftDetail[];
  tokens?: Moim.NFT.INftToken[];
}

const MAX_COUNT = 9;
const ProfileNftListPreview: React.FC<IProps> = ({
  userId,
  groupId,
  userTokens,
  tokens,
}) => {
  const [isLoading] = React.useState(false);
  const initialLoaded = userTokens !== undefined && !isLoading;

  const itemElements = React.useMemo(() => {
    if (!initialLoaded) {
      return (
        <ProfileNFTGrid>
          {new Array(3).fill(0).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </ProfileNFTGrid>
      );
    }

    if (userTokens?.length === 0 || tokens?.length === 0 || !groupId) {
      return <NFTEmpty />;
    }

    return (
      <ProfileNFTGrid>
        {userTokens?.slice(0, MAX_COUNT).map(token => {
          const contractName = tokens?.filter(item => item.id === token.id)[0]
            .contractName;
          return (
            <NFTItem
              key={token.id}
              id={token.id}
              name={token.name}
              image={token.itemPreviewUrl}
              contractName={contractName ?? ""}
              groupId={groupId}
            />
          );
        })}
      </ProfileNFTGrid>
    );
  }, [groupId, initialLoaded, tokens, userTokens]);

  return (
    <>
      <Header
        userId={userId}
        groupId={groupId}
        hasNFT={(userTokens?.length ?? 0) > 0}
      />
      {itemElements}
    </>
  );
};

export default React.memo(ProfileNftListPreview);
