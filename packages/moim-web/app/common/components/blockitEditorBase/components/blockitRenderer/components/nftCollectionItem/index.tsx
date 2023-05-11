import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import { useRedirectToMoimURL } from "common/hooks/useSecondaryView";
import { withPlacement } from "../../hoc/withPlacement";
import {
  Wrapper,
  Inner,
  NftCollectionItemWrapper,
  NftCollectionItemContainer,
  CollectionName,
} from "./styled";
import {
  getSchedulesByContract as getSchedulesByContractAction,
  getContractStatistics as getContractStatisticsAction,
  getContractDetail,
} from "app/actions/nft";
import BlockitHeader from "../header";
import CollectionItemBanner from "./components/banner";
import Description from "./components/description";
import Schedules from "./components/schedules";
import { MoimURL } from "common/helpers/url";
import Statistics from "./components/statistics";
import Skeleton from "./skeleton";
import BlockitFooter from "../footer";
import InViewTrigger from "../inViewTrigger";

interface IProps extends Omit<Moim.Blockit.INftCollectionItem, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  footer?: Moim.Blockit.IBaseFooter;
}

const NftCollectionItem: React.FC<IProps> = ({
  resourceId,
  showConfig,
  header,
  footer,
}) => {
  const [isLoading, setLoadingStatus] = React.useState<
    boolean | null | undefined
  >(undefined);
  const [
    availableScheduleIdsByContract,
    setAvailableScheduleIdsByContract,
  ] = React.useState<string[] | undefined>(undefined);
  const [statistics, setStatistics] = React.useState<
    Moim.NFT.IContractStatistics | undefined
  >(undefined);

  const redirect = useRedirectToMoimURL();

  const {
    getSchedulesByContract,
    getContractStatistics,
    getContract,
  } = useActions({
    getContract: getContractDetail,
    getSchedulesByContract: getSchedulesByContractAction,
    getContractStatistics: getContractStatisticsAction,
  });

  const contract = useStoreState(
    state => state.entities.nftContracts[resourceId],
  );
  const schedules = useStoreState(state =>
    availableScheduleIdsByContract?.map(
      iid => state.entities.nftSchedules[iid],
    ),
  );

  const handleNftCollectionShowPage = React.useCallback(() => {
    redirect(
      new MoimURL.NftCollectionShow({
        contractId: resourceId,
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleGetData = React.useCallback(async () => {
    try {
      getContract(resourceId);

      if (!availableScheduleIdsByContract) {
        getSchedulesByContract(resourceId, undefined, "DESC").then(result =>
          setAvailableScheduleIdsByContract(result.availableScheduleIds),
        );
      }
      if (!statistics) {
        getContractStatistics(resourceId).then(result => setStatistics(result));
      }
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [
    getContract,
    resourceId,
    availableScheduleIdsByContract,
    statistics,
    getSchedulesByContract,
    getContractStatistics,
  ]);

  const handleOnView = React.useCallback(() => {
    if (isLoading === undefined) {
      handleGetData();
    }
  }, [handleGetData, isLoading]);

  return (
    <>
      <Wrapper>
        <BlockitHeader
          title={header?.title}
          description={header?.description}
          showTitle={header?.showTitle ?? false}
          showDescription={header?.showDescription ?? false}
          showMoreButton={header?.showMoreButton ?? false}
          onClickViewMore={handleNftCollectionShowPage}
        />
        <InViewTrigger onVisible={handleOnView} />
        {isLoading !== false || !contract ? (
          <Skeleton />
        ) : (
          <Inner>
            <NftCollectionItemWrapper
              role="button"
              onClick={handleNftCollectionShowPage}
            >
              <CollectionItemBanner
                bannerUrl={contract.banner?.url}
                representImgUrl={contract.representResources?.[0]?.previewUrl}
              />
              <NftCollectionItemContainer>
                <CollectionName>{contract.name ?? ""}</CollectionName>
                <Statistics
                  ownerCount={statistics?.ownerCount ?? 0}
                  itemCount={
                    contract.imported
                      ? contract.totalItemCount
                      : (contract.itemType === "GENERATIVE"
                          ? statistics?.mintedItemCount
                          : statistics?.itemCount) ?? 0
                  }
                />
                {contract.description?.length && (
                  <Description value={contract.description} />
                )}
                {!contract.imported &&
                  schedules &&
                  showConfig.showSchedules && (
                    <Schedules schedules={schedules} />
                  )}
              </NftCollectionItemContainer>
            </NftCollectionItemWrapper>
          </Inner>
        )}
        <BlockitFooter
          showMoreButton={footer?.showMoreButton ?? true}
          onClickViewMore={handleNftCollectionShowPage}
          textKey={"button_see_more_nft_group"}
        />
      </Wrapper>
    </>
  );
};

export default withPlacement(React.memo(NftCollectionItem));
