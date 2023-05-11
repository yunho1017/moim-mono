import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { NftSetHooks } from "./hooks";
import { getNftSetShow as getNftSetShowAction } from "app/actions/nft";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
// components
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import BlockitListLayout from "common/components/blockitListLayout";
import InViewTrigger from "../inViewTrigger";
import { withPlacement } from "../../hoc/withPlacement";
import { SkeletonRatioBox } from "common/components/skeleton";
import { BlockitFeedback } from "../feedback";
import { NFTItemCell } from "common/components/NFTItemCell";
// style
import {
  Wrapper,
  Inner,
  Header,
  TitleWrapper,
  Title,
  Description,
  DividerWrapper,
  Divider,
  ArrowContainer,
  ListWrapper,
  ItemContainer,
} from "./styled";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

interface IProps extends Omit<Moim.Blockit.INftSetPreview, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DEFAULT_LIMIT = 20;

const NftPreview: React.FC<IProps> = ({
  title,
  description,
  resourceId,
  listElement,
  listShowConfig,
}) => {
  const redirect = useRedirect();
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();
  const [isLoading, setLoadStatus] = React.useState(false);
  const isMobile = useIsMobile();
  const portalSectionId = React.useMemo(
    () => `nft-set-preview-portal-${uuid.v4()}`,
    [],
  );

  const [nftItemIds, setNftItemIds] = React.useState<
    string[] | undefined | null
  >(undefined);
  const { getNftSetShowData } = useActions({
    getNftSetShowData: getNftSetShowAction,
  });
  const { column, listElementType, maxVisibleCount } = NftSetHooks.useConfig(
    listElement,
  );

  const handleOnView = React.useCallback(() => {
    try {
      if (!isLoading) {
        setLoadStatus(true);
        getNftSetShowData(resourceId, DEFAULT_LIMIT).then(nftSetData => {
          if (nftSetData.itemIds) {
            setNftItemIds([...nftSetData.itemIds]);
          }
        });
      }
    } finally {
      setLoadStatus(false);
    }
  }, [isLoading, getNftSetShowData, resourceId]);

  const handleViewMore = React.useCallback(() => {
    redirect(new MoimURL.NftSetShow({ id: resourceId }).toString());
  }, [redirect, resourceId]);

  const items = useStoreState(state =>
    nftItemIds
      ? nftItemIds.map(iid => state.entities.nftItems[iid])
      : undefined,
  );
  const slicedItems = React.useMemo(() => items?.slice(0, maxVisibleCount), [
    items,
    maxVisibleCount,
  ]);
  const itemElements = React.useMemo(() => {
    const isUndefinedArray = slicedItems?.some(item => item?.id === undefined);
    if (slicedItems === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web),
      )
        .fill(0)
        .map(_ => <SkeletonRatioBox ratio="1:1" />);
    }

    return slicedItems.map(item => (
      <ItemContainer key={`nft_set_${item.id}`}>
        <NFTItemCell
          item={item}
          groupId={currentGroup?.id}
          hubGroupId={currentHubGroup?.id}
          config={listShowConfig}
        />
      </ItemContainer>
    ));
  }, [
    slicedItems,
    isLoading,
    column,
    isMobile,
    listElement?.rowCount_web,
    listElement?.rowCount,
    currentGroup?.id,
    currentHubGroup?.id,
    listShowConfig,
  ]);

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleOnView} />

      {isMobile && (
        <DividerWrapper>
          <Divider />
        </DividerWrapper>
      )}

      <Inner>
        <Header>
          <TitleWrapper>
            <Title onClick={handleViewMore}>{title}</Title>
          </TitleWrapper>
          {description && <Description>{description}</Description>}
        </Header>
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <ListWrapper>
          {items !== undefined && !items?.length ? (
            <BlockitFeedback.Empty textKey="nft_set_list_preview_empty" />
          ) : (
            <BlockitListLayout
              element={listElement}
              rightArrow={
                listElementType === "horizontal" ? PortalRightArrow : undefined
              }
              leftArrow={
                listElementType === "horizontal" ? PortalLeftArrow : undefined
              }
              arrowPortalTargetId={portalSectionId}
            >
              {itemElements}
            </BlockitListLayout>
          )}
        </ListWrapper>
      </Inner>
    </Wrapper>
  );
};

export default withPlacement(React.memo(NftPreview));
