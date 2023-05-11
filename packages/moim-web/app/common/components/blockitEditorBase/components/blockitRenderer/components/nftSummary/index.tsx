import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import { withPlacement } from "../../hoc/withPlacement";
import { Wrapper, Inner } from "./styled";
import { getItem as getItemAction } from "app/actions/nft";
import Layout from "./components/layout";
import Media from "./components/media";
import Detail from "./components/detail";
import Description from "./components/description";
import Property from "./components/property";
import Skeleton from "./skeleton";
import { useRedirectToMoimURL } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import BlockitHeader from "../header";
import BlockitFooter from "../footer";
import InViewTrigger from "../inViewTrigger";

interface IProps extends Omit<Moim.Blockit.INftSummary, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  footer?: Moim.Blockit.IBaseFooter;
}

const NftSummary: React.FC<IProps> = ({
  resourceId,
  showConfig,
  header,
  footer,
}) => {
  const [isLoading, setLoadingStatus] = React.useState<
    boolean | null | undefined
  >(undefined);

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
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [dispatchGetItem, item, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (isLoading === undefined) {
      handleGetData();
    }
  }, [handleGetData, isLoading]);

  return (
    <Wrapper>
      <BlockitHeader
        title={header?.title}
        description={header?.description}
        showTitle={header?.showTitle ?? false}
        showDescription={header?.showDescription ?? false}
        showMoreButton={header?.showMoreButton ?? false}
        onClickViewMore={handleNftShowPage}
      />
      <InViewTrigger onVisible={handleOnView} />
      {isLoading !== false || !contract ? (
        <Skeleton />
      ) : (
        <Inner role="button" onClick={handleNftShowPage}>
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
              schedule ? (
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
              ) : (
                undefined
              )
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
        </Inner>
      )}
      <BlockitFooter
        showMoreButton={footer?.showMoreButton ?? true}
        onClickViewMore={handleNftShowPage}
        textKey={"button_see_more_nft_group"}
      />
    </Wrapper>
  );
};

export default withPlacement(React.memo(NftSummary));
