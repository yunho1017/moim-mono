import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { getCryptobadgeBadgeGroup as getCryptobadgeItemsByBadgeGroupIdAction } from "app/actions/cryptobadge";
import { useActions, useStoreState } from "app/store";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";
import BlockitListLayout from "common/components/blockitListLayout";
import {
  PortalLeftArrow,
  PortalRightArrow,
} from "common/components/horizontalScroll/arrows";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { withPlacement } from "../../hoc/withPlacement";
import InViewTrigger from "../inViewTrigger";
import { CryptobadgeGroupHooks } from "./hooks";
// components
import { BlockitFeedback } from "../feedback";
import BlockitFooter from "../footer";
import BlockitHeader from "../header";
// style
import { BadgePreviewItemCell } from "common/components/cryptobadge/badgePreviewItemCell";
import Skeleton from "common/components/cryptobadge/badgePreviewItemCell/skeleton";
import { MoimURL } from "common/helpers/url";
import { Inner, ItemContainer, ListWrapper, Wrapper } from "./styled";
import { BADGE_PREVIEW_KEY_STORE_KEY } from "common/constants/keys";
import _ from "lodash";
import { useMintRequests } from "common/components/cryptobadge/hooks/useMintRequests";

interface IProps extends Omit<Moim.Blockit.ICryptobadgeGroupPreview, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const CryptobadgeGroupPreview: React.FC<IProps> = ({
  title,
  description,
  resourceId,
  header,
  footer,
  listElement,
  // listShowConfig,
}) => {
  const [isLoading, setLoadStatus] = React.useState(false);
  const [cryptobadges, setCryptobadges] = React.useState<
    Moim.Cryptobadge.ICryptobadge[] | undefined
  >(undefined);

  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const {
    currentUserMintRequests: mintRequests,
    refreshMintRequestData,
  } = useMintRequests();

  const portalSectionId = React.useMemo(
    () => `cryptobadge-group-preview-portal-${uuid.v4()}`,
    [],
  );

  const { getCryptobadgeItemsByBadgeGroupId } = useActions({
    getCryptobadgeItemsByBadgeGroupId: getCryptobadgeItemsByBadgeGroupIdAction,
  });

  const { badgeETTStore } = useStoreState(state => ({
    badgeETTStore: state.entities.cryptobadges_list,
  }));

  const {
    column,
    listElementType,
    maxVisibleCount,
  } = CryptobadgeGroupHooks.useConfig(listElement);

  const handleGetBadgeGroup = React.useCallback(async () => {
    const badgeGroupListData = (
      await getCryptobadgeItemsByBadgeGroupId({
        badgeGroupId: resourceId,
      })
    )?.badgeGroupList;

    const badgeGroupList = [...(badgeGroupListData ?? [])];

    const splicedBadges =
      maxVisibleCount &&
      badgeGroupList &&
      badgeGroupList.length > 0 &&
      badgeGroupList.length > maxVisibleCount
        ? badgeGroupList.splice(0, maxVisibleCount)
        : badgeGroupList;

    splicedBadges && setCryptobadges(splicedBadges);

    getCryptobadgeItemsByBadgeGroupId({
      badgeGroupId: resourceId,
    });
  }, [getCryptobadgeItemsByBadgeGroupId, maxVisibleCount, resourceId]);

  const handleFindMintStatus = React.useCallback(
    (badge: Moim.Cryptobadge.ICryptobadge) =>
      mintRequests && mintRequests.length > 0
        ? mintRequests?.find(mint => mint.badge.name === badge.name)?.status
        : "NONE",
    [mintRequests],
  );

  const handleOnView = React.useCallback(async () => {
    try {
      setLoadStatus(true);
      if (!mintRequests) {
        refreshMintRequestData();
      }
      if (resourceId) {
        const rawCachedBadgeIds = sessionStorage.getItem(
          `${BADGE_PREVIEW_KEY_STORE_KEY}_${resourceId}`,
        );

        if (rawCachedBadgeIds) {
          const cachedBadgeIds: string[] | undefined = JSON.parse(
            rawCachedBadgeIds,
          );

          const slicedIds =
            maxVisibleCount &&
            cachedBadgeIds &&
            cachedBadgeIds.length > maxVisibleCount
              ? cachedBadgeIds.splice(0, maxVisibleCount)
              : cachedBadgeIds;

          const mappedBadge =
            slicedIds &&
            slicedIds.length > 0 &&
            slicedIds.map(id => badgeETTStore[id]).filter(i => Boolean(i));

          if (mappedBadge && mappedBadge.length > 0) {
            setCryptobadges(mappedBadge);
          } else {
            handleGetBadgeGroup();
          }
        } else {
          handleGetBadgeGroup();
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("!!!error", e);
    } finally {
      setLoadStatus(false);
    }
  }, [
    mintRequests,
    resourceId,
    refreshMintRequestData,
    maxVisibleCount,
    badgeETTStore,
    handleGetBadgeGroup,
  ]);

  const handleViewMore = React.useCallback(() => {
    redirect(
      new MoimURL.CryptobadgeGroupShow({ groupId: resourceId }).toString(),
    );
  }, [redirect, resourceId]);

  const itemElements = React.useMemo(() => {
    if (isLoading || !cryptobadges) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web),
      )
        .fill(0)
        .map((_value, idx) => <Skeleton key={idx} />);
    }

    return cryptobadges && cryptobadges.length > 0
      ? cryptobadges.map(badge => {
          const mintRequestStatus = handleFindMintStatus(badge);
          return (
            <ItemContainer key={`cryptobadge_group_${resourceId}_${badge.id}`}>
              <BadgePreviewItemCell
                item={badge}
                mintRequestStatus={mintRequestStatus}
              />
            </ItemContainer>
          );
        })
      : [];
  }, [
    column,
    cryptobadges,
    handleFindMintStatus,
    isLoading,
    isMobile,
    listElement.rowCount,
    listElement.rowCount_web,
    resourceId,
  ]);

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleOnView} />
      <Inner>
        <BlockitHeader
          title={title}
          description={description}
          showTitle={header?.showTitle ?? true}
          showDescription={header?.showDescription ?? true}
          showMoreButton={header?.showMoreButton ?? true}
          onClickViewMore={handleViewMore}
        />
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <ListWrapper>
          {cryptobadges && cryptobadges.length === 0 ? (
            <BlockitFeedback.Empty textKey="cryptobadge_group_list_preview_empty" />
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
        <BlockitFooter
          showMoreButton={footer?.showMoreButton ?? false}
          textKey={"button_see_more_cryptobadge_group"}
        />
      </Inner>
    </Wrapper>
  );
};

export default withPlacement(React.memo(CryptobadgeGroupPreview));
