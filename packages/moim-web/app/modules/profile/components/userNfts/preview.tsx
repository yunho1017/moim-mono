import * as React from "react";
import { ProfileNFTGrid } from "./components/list";
import { NFTItem, Skeleton } from "./components/item";
import { Header } from "./components/header";
import { NFTEmpty } from "../empty";
import { useActions, useStoreState } from "app/store";
import { getUserTokensDetail } from "app/actions/nft";

interface IProps {
  userId: string;
}

const MAX_COUNT = 6;
const ProfileNftListPreview: React.FC<IProps> = ({ userId }) => {
  const [isLoading, setLoadStatus] = React.useState(false);
  const userTokens = useStoreState(state => state.nft.userTokens[userId]);
  const initialLoaded = userTokens !== undefined && !isLoading;

  const { dispatchGetUserTokensDetail } = useActions({
    dispatchGetUserTokensDetail: getUserTokensDetail,
  });

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

    if (userTokens?.data.length === 0) {
      return <NFTEmpty />;
    }

    return (
      <ProfileNFTGrid>
        {userTokens?.data?.slice(0, MAX_COUNT).map(token => (
          <NFTItem
            key={token.id}
            id={token.id}
            name={token.name}
            image={
              token.itemUrl?.startsWith("<svg")
                ? token.itemUrl
                : token.itemPreviewUrl
            }
            contractId={token.contractId}
          />
        ))}
      </ProfileNFTGrid>
    );
  }, [initialLoaded, userTokens]);

  const handleTokenList = React.useCallback(() => {
    setLoadStatus(true);
    if (userId) {
      dispatchGetUserTokensDetail(userId);
      setLoadStatus(false);
    }
  }, [dispatchGetUserTokensDetail, userId]);

  React.useEffect(() => {
    if (userId) {
      if (!initialLoaded) {
        handleTokenList();
      }
    }
  }, []);

  return (
    <>
      <Header userId={userId} hasNFT={(userTokens?.data.length ?? 0) > 0} />

      {itemElements}
    </>
  );
};

export default React.memo(ProfileNftListPreview);
