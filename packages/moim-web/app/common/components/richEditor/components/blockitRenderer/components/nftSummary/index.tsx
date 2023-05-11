import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import { withPlacement } from "../../hoc/withPlacement";
import {
  Wrapper,
  Inner,
  NftSummaryWrapper,
  NftSummaryHeader,
  NftSummaryTitle,
  NftSummaryDesciption,
} from "./styled";
import { getItem as getItemAction } from "app/actions/nft";
import Layout from "./components/layout";
import Media from "./components/media";
import Detail from "./components/detail";
import Description from "./components/description";
import Property from "./components/property";
import Skeleton from "./skeleton";
import { useRedirectToMoimURL } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";

interface IProps extends Omit<Moim.Blockit.INftSummary, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const NftSummary: React.FC<IProps> = ({ resourceId, showConfig, header }) => {
  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(true);

  const redirect = useRedirectToMoimURL();

  const { dispatchGetItem } = useActions({
    dispatchGetItem: getItemAction,
  });

  const item = useStoreState(state => state.entities.nftItems[resourceId]);
  const schedule = useStoreState(state =>
    item?.scheduleId ? state.entities.nftSchedules[item.scheduleId] : undefined,
  );
  const contract = useStoreState(state =>
    item?.contractId ? state.entities.nftContracts[item.contractId] : undefined,
  );

  const handleNftShowPage = React.useCallback(() => {
    redirect(
      new MoimURL.NftShow({
        nftItemId: resourceId,
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleGetData = React.useCallback(async () => {
    try {
      if (!item) {
        await dispatchGetItem(resourceId);
      }
      if (item && contract && schedule) {
        setLoadingStatus(false);
      }
    } catch {
      setLoadingStatus(false);
    }
  }, [contract, dispatchGetItem, item, resourceId, schedule]);

  React.useEffect(() => {
    if (isLoading) {
      handleGetData();
    }
  }, [handleGetData, isLoading]);

  if (isLoading) {
    return <Skeleton></Skeleton>;
  }

  if (!item || !contract || !schedule) return null;

  return (
    <Wrapper>
      {(header?.showTitle || header?.showDescription) && (
        <NftSummaryHeader>
          {header?.showTitle && (
            <NftSummaryTitle onClick={handleNftShowPage}>
              {header?.title}
            </NftSummaryTitle>
          )}
          {header?.showDescription && (
            <NftSummaryDesciption>{header?.description}</NftSummaryDesciption>
          )}
        </NftSummaryHeader>
      )}
      <Inner>
        <NftSummaryWrapper role="button" onClick={handleNftShowPage}>
          <Layout
            mediaElement={
              <Media
                key={item.itemUrl}
                url={item.itemUrl}
                name={item.name}
                poster={item.itemStaticPreviewUrl}
                metadata={item.itemMetadata}
                onClick={handleNftShowPage}
              />
            }
            detailElement={
              <Detail
                collectionName={contract.name}
                itemId={item.id}
                itemName={item.name}
                itemStatus={item.status}
                ownerId={item.ownedBy?.userId ?? undefined}
                ownerAddress={item.ownedByAddress}
                price={schedule.price}
                currency={contract.currency}
                network={contract.network}
                mintable={item.mintable}
                scheduleMintable={schedule.mintable}
                startAt={schedule.mintingStartAt}
                endAt={schedule.mintingEndAt}
                config={showConfig}
                contractId={contract.id}
              />
            }
            propertyElement={
              showConfig.showAttributes && (
                <Property
                  attributes={item.attributes ?? null}
                  config={showConfig.propertyConfig}
                />
              )
            }
            descriptionElement={
              <Description
                showItemDescription={showConfig.showItemDescription}
                showDetail={showConfig.showDetail}
                description={item.description}
                contract={contract}
                tokenId={item.tokenId}
              />
            }
          />
        </NftSummaryWrapper>
      </Inner>
    </Wrapper>
  );
};

export default withPlacement(React.memo(NftSummary));
