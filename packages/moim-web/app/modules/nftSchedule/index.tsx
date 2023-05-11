import * as React from "react";
import { RouteComponentProps, Redirect, useHistory } from "react-router";
// hooks
import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// helpers
import { MoimURL } from "common/helpers/url";
import { NFTScheduleShowContext } from "./context";
// actions
import {
  getScheduleDetail as getScheduleDetailAction,
  searchNftItems as searchNftItemsAction,
  getNetworkBlockConfig as getNetworkBlockConfigAction,
} from "app/actions/nft";
// component
import { DefaultLoader } from "common/components/loading";
import NftScheduleItemList from "./components/list/itemList";
import Schedule from "./components/schedule";
import SchedulePrice from "./components/price";
import Collection from "./components/collection";
import Period from "./components/period";
import Banner from "./components/banner";
import Layout from "./components/layout";
import Media from "./components/media";
import ButtonArea from "./components/buttonArea";
import NftScheduleShowTitle from "./components/title";
import { Spacer } from "common/components/designSystem/spacer";
import { MaxWidthWrapper, Wrapper } from "./styled";
import NFTScheduleShowHeader from "./components/header";
import SoldBadge from "./components/soldBadge";
import CurrentBlock from "./components/currentBlock";

const DEFAULT_LIMIT = 20;

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const NftScheduleShowContainer: React.FC<IProps> = ({ match }) => {
  const history = useHistory();
  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();
  const { contractId, scheduleId } = match.params;
  const [isFetched, setFetched] = React.useState(false);
  const [isLoading, setLoadStatus] = React.useState(true);
  const [items, setItems] = React.useState<Moim.NFT.INftDetail[] | undefined>(
    undefined,
  );
  const [paging, setPaging] = React.useState<
    Readonly<{
      after?: Moim.PagingValue;
      before?: Moim.PagingValue;
      total?: number;
    }>
  >({});
  const NFTScheduleShowContainerRef = React.useRef<HTMLDivElement>(null);
  const [blockConfig, setBlockConfig] = React.useState<
    Moim.Community.INetworkBlockConfig | undefined
  >(undefined);

  const {
    getScheduleData,
    searchNftItemsData,
    getNetworkBlockConfig,
  } = useActions({
    getScheduleData: getScheduleDetailAction,
    searchNftItemsData: searchNftItemsAction,
    getNetworkBlockConfig: getNetworkBlockConfigAction,
  });

  const contract = useStoreState(state =>
    contractId ? state.entities.nftContracts[contractId] : undefined,
  );

  const schedule = useStoreState(state =>
    scheduleId ? state.entities.nftSchedules[scheduleId] : undefined,
  );

  const goBack = React.useCallback(() => {
    if (history.length > 2) {
      history.goBack();
    } else {
      redirect(new MoimURL.MoimAppHome().toString());
    }
  }, [history, redirect]);

  const contextValue = React.useMemo(
    () => ({
      containerRef: NFTScheduleShowContainerRef,
      onBack: goBack,
    }),
    [goBack],
  );

  const handleGetData = React.useCallback(
    (pagingKey?: "after" | "before") => {
      try {
        if (contractId && scheduleId) {
          if (!schedule) {
            getScheduleData(contractId, scheduleId);
          }
          searchNftItemsData({ ...paging }, "DESC", DEFAULT_LIMIT, {
            contractIds: [contractId],
            scheduleIds: [scheduleId],
          }).then(result => {
            if (result.paging) {
              setPaging(result.paging);
            } else {
              setPaging({});
            }
            if (result.items.length) {
              if (pagingKey) {
                setItems(base =>
                  pagingKey === "before"
                    ? [...result.items, ...(base ?? [])]
                    : [...(base ?? []), ...result.items],
                );
              } else {
                setItems(result.items);
              }
            } else {
              setItems([]);
            }
          });
        }
      } finally {
        setFetched(true);
        setLoadStatus(false);
      }
    },
    [
      contractId,
      scheduleId,
      schedule,
      searchNftItemsData,
      paging,
      getScheduleData,
    ],
  );

  const handleBlockConfigData = React.useCallback(() => {
    try {
      if (contract?.network) {
        getNetworkBlockConfig(contract?.network).then(result => {
          setBlockConfig(result);
        });
      }
    } catch {}
  }, [contract?.network, getNetworkBlockConfig]);

  React.useLayoutEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, []);

  React.useEffect(() => {
    handleGetData();
  }, []);

  React.useEffect(() => {
    if (!blockConfig && contract) {
      handleBlockConfigData();
    }
  }, [blockConfig, contract, handleBlockConfigData]);

  if (isLoading && !isFetched) {
    return <DefaultLoader />;
  }

  if (!contractId || !scheduleId) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <NFTScheduleShowContext.Provider value={contextValue}>
      <Wrapper ref={NFTScheduleShowContainerRef}>
        {isMobile && <NFTScheduleShowHeader title={schedule?.name ?? ""} />}
        <Banner item={schedule} />
        <MaxWidthWrapper>
          <NftScheduleShowTitle
            title={schedule?.name ?? ""}
            hasBanner={Boolean(schedule?.banner?.previewUrl)}
          />
          <Layout
            type={contract?.itemType}
            mediaElement={
              schedule?.representResources?.length && (
                <Media
                  media={schedule?.representResources}
                  alt={schedule?.name ?? ""}
                />
              )
            }
            buttonAreaElement={
              contract?.itemType === "GENERATIVE" &&
              schedule?.type !== "AIRDROP" && (
                <ButtonArea
                  mintable={schedule?.mintable ?? false}
                  maxAmountPerAddress={schedule?.maxAmountPerAddress ?? 0}
                  contractId={contractId}
                  scheduleId={scheduleId}
                  price={schedule?.price}
                  currency={contract?.currency}
                />
              )
            }
            periodElement={
              <Period
                mintingStartAt={schedule?.mintingStartAt ?? 0}
                mintingEndAt={schedule?.mintingEndAt ?? 0}
              />
            }
            priceElement={
              <SchedulePrice
                network={contract?.network ?? "POLYGON"}
                price={schedule?.price ?? 0}
                currency={contract?.currency ?? ""}
              />
            }
            collectionElement={
              <Collection
                id={contractId}
                representResources={contract?.representResources}
                name={contract?.name ?? ""}
                description={contract?.description ?? ""}
              />
            }
            scheduleElement={
              <Schedule
                startAt={schedule?.mintingStartAt ?? 0}
                endAt={schedule?.mintingEndAt ?? 0}
                rangeStart={schedule?.tokenIdFrom ?? 0}
                rangeEnd={schedule?.tokenIdTo ?? 0}
                maxAmountPerAddress={schedule?.maxAmountPerAddress ?? 0}
                startBlockNumber={schedule?.mintingStartBlockNumber ?? 0}
                endBlockNumber={schedule?.mintingEndBlockNumber ?? 0}
              />
            }
            soldBadgeElement={
              <SoldBadge
                rangeStart={schedule?.tokenIdFrom ?? 0}
                rangeEnd={schedule?.tokenIdTo ?? 0}
                maxTokenId={schedule?.maxTokenId ?? null}
              />
            }
            currentBlockElement={
              <CurrentBlock value={blockConfig?.currentBlockNumber} />
            }
          />
          <Spacer value={isMobile ? 42 : 52} />
          <NftScheduleItemList
            items={items}
            groupId={currentGroup?.id}
            hubGroupId={currentHubGroup?.id}
            isLoading={isLoading}
            isFetched={isFetched}
            resourceId={scheduleId}
            onLoadMore={handleGetData}
            paging={paging}
            type={contract?.itemType}
          />
        </MaxWidthWrapper>
      </Wrapper>
    </NFTScheduleShowContext.Provider>
  );
};

export default NftScheduleShowContainer;
