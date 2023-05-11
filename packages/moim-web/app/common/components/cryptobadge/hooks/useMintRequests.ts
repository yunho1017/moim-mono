import * as React from "react";
import { getBadgeMintRequests_badgeMintRequests_edges_node } from "@vingle/cryptobadge-sdk";
import { getMintRequests as getMintRequestsAction } from "app/actions/cryptobadge";
import { useActions, useStoreState } from "app/store";

export const useMintRequests = () => {
  const [mintRequests, setMintRequests] = React.useState<
    getBadgeMintRequests_badgeMintRequests_edges_node[] | undefined
  >(undefined);

  const [myMintRequests, setMyMintRequests] = React.useState<
    getBadgeMintRequests_badgeMintRequests_edges_node[] | undefined
  >(undefined);

  const { mintRequestsListStore } = useStoreState(state => ({
    mintRequestsListStore: state.cryptobadge.mint_request_list,
  }));

  const { currentUserId, usersStore } = useStoreState(state => ({
    currentUserId: state.app.currentUserId,
    usersStore: state.entities.users,
  }));

  const currentUserAddress = React.useMemo(
    () =>
      (currentUserId && usersStore ? usersStore[currentUserId] : undefined)
        ?.metamask,
    [currentUserId, usersStore],
  );

  const { getMintRequests } = useActions({
    getMintRequests: getMintRequestsAction,
  });

  const getMintRequestsData = React.useCallback(async () => {
    if (!(mintRequestsListStore && mintRequestsListStore.length > 0)) {
      await getMintRequests();
    } else {
      const mintRequestList =
        mintRequestsListStore && mintRequestsListStore.length > 0
          ? mintRequestsListStore.map(mintRequest => mintRequest.node)
          : [];

      setMintRequests(mintRequestList);
    }
  }, [getMintRequests, mintRequestsListStore]);

  const getMyMintRequestsData = async (
    mintRequestsList: getBadgeMintRequests_badgeMintRequests_edges_node[],
    userAddress?: string,
  ) => {
    const myMintRequestList =
      mintRequestsList.length > 0
        ? mintRequestsList.filter(node => node.winnerAddress === userAddress)
        : [];
    setMyMintRequests(myMintRequestList);
  };

  React.useEffect(() => {
    getMintRequestsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintRequestsListStore]);

  React.useEffect(() => {
    if (mintRequests) {
      getMyMintRequestsData(mintRequests, currentUserAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintRequests, currentUserAddress]);

  return {
    currentUserMintRequests: myMintRequests,
    currentUserAddress,
    refreshMintRequestData: getMintRequestsData,
  };
};
