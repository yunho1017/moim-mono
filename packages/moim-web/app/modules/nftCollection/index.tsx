import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { replace } from "connected-react-router";
import { useActions, useStoreState } from "app/store";
// helper
import { MoimURL } from "common/helpers/url";
// action
import {
  searchNftItems as searchNftItemsAction,
  getSchedulesByContract as getSchedulesByContractAction,
  getContractOwners as getContractOwnersAction,
  getContractDetail,
} from "app/actions/nft";
// components
import Top from "./components/top";
import CollectionTabContainer from "./tabs";
// style
import { MaxWidthWrapper, Wrapper, NFTCollectionTopWrapper } from "./styled";

import { NFTCollectionShowContext } from "./context";

const DEFAULT_ITMES_LIMIT = 12;
const DEFAULT_OWNERS_LIMIT = 15;

export interface ICollectionItemFilter {
  statuses?: string[];
  attributes?: string[];
}

type IProps = RouteComponentProps<Moim.IMatchParams>;

const NftCollectionShowContainer: React.FC<IProps> = ({ match }) => {
  const { contractId, tab } = match.params;
  const [isLoading, setLoadStatus] = React.useState<boolean | null | undefined>(
    undefined,
  );
  const [items, setItems] = React.useState<Moim.NFT.INftDetail[] | undefined>(
    undefined,
  );
  const [
    availableScheduleIdsByContract,
    setAvailableScheduleIdsByContract,
  ] = React.useState<Moim.Id[] | undefined>(undefined);
  const [owners, setOwners] = React.useState<
    Moim.NFT.IContractOwner[] | undefined
  >(undefined);
  const [totalOwnersCnt, setTotalOwnersCnt] = React.useState<number>(0);
  const [totalItemsCnt, setTotalItemsCnt] = React.useState<number>(0);
  const [selectedTabId, setSelectedTabId] = React.useState<string | undefined>(
    tab ?? undefined,
  );
  const { dispatchReplace } = useActions({
    dispatchReplace: replace,
  });
  const NFTCollectionShowContainerRef = React.useRef<HTMLDivElement>(null);
  const NFTCollectionShowTopWrapperRef = React.useRef<HTMLDivElement>(null);

  const {
    getContract,
    getSchedulesByContract,
    searchNftItemsData,
    getContractOwners,
  } = useActions({
    getContract: getContractDetail,
    getSchedulesByContract: getSchedulesByContractAction,
    searchNftItemsData: searchNftItemsAction,
    getContractOwners: getContractOwnersAction,
  });

  const contract = useStoreState(state =>
    contractId ? state.entities.nftContracts[contractId] : undefined,
  );

  const contextValue = React.useMemo(
    () => ({
      contract,
      availableScheduleIdsByContract,
      totalOwnersCnt,
      owners,
      totalItemsCnt,
      items,
      selectedTabId,
      setSelectedTabId,
      containerRef: NFTCollectionShowContainerRef,
      topWrapperRef: NFTCollectionShowTopWrapperRef,
    }),
    [
      contract,
      availableScheduleIdsByContract,
      totalOwnersCnt,
      owners,
      totalItemsCnt,
      items,
      selectedTabId,
    ],
  );

  const handleGetData = React.useCallback(async () => {
    try {
      setLoadStatus(true);
      if (contractId) {
        const contractDetail = await getContract(contractId);

        setTotalItemsCnt(contractDetail?.totalItemCount ?? 0);

        if (!availableScheduleIdsByContract) {
          const result = await getSchedulesByContract(
            contractId,
            undefined,
            "DESC",
          );
          setAvailableScheduleIdsByContract(result.availableScheduleIds);
        }

        if (!owners) {
          const result = await getContractOwners(
            contractId,
            undefined,
            "DESC",
            DEFAULT_OWNERS_LIMIT,
          );
          setTotalOwnersCnt(result?.paging?.total ?? 0);
          setOwners(result.owners);
        }

        if (!items) {
          const result = await searchNftItemsData(
            undefined,
            "DESC",
            DEFAULT_ITMES_LIMIT,
            {
              contractIds: [contractId],
            },
          );

          if (result.items.length) {
            setItems(result.items);
          } else {
            setItems([]);
          }
        }
      }
    } catch (e) {
      setLoadStatus(null);
    } finally {
      setLoadStatus(false);
    }
  }, [
    contractId,
    getContract,
    availableScheduleIdsByContract,
    owners,
    items,
    getSchedulesByContract,
    getContractOwners,
    searchNftItemsData,
  ]);

  React.useEffect(() => {
    if (contractId && !tab) {
      dispatchReplace(`${contractId}/information`);
    }
    handleGetData();
  }, []);

  if (!contractId) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <NFTCollectionShowContext.Provider value={contextValue}>
      <Wrapper ref={NFTCollectionShowContainerRef}>
        <MaxWidthWrapper>
          <NFTCollectionTopWrapper ref={NFTCollectionShowTopWrapperRef}>
            <Top
              isLoading={isLoading}
              contractAddress={contract?.address}
              contractName={contract?.name}
              symbol={contract?.symbol}
              name={contract?.name}
              network={contract?.network}
              createdBy={contract?.createdBy}
              ownedByAddress={contract?.ownedByAddress}
              banner={contract?.banner}
              representResources={contract?.representResources}
            />
          </NFTCollectionTopWrapper>
          <CollectionTabContainer
            isLoading={isLoading}
            isFetched={isLoading === false}
            contractId={contractId}
          />
        </MaxWidthWrapper>
      </Wrapper>
    </NFTCollectionShowContext.Provider>
  );
};

export default NftCollectionShowContainer;
