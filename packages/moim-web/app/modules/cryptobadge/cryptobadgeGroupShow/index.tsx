import * as React from "react";
// hooks
import { getCryptobadgeBadgeGroup as getCryptobadgeItemsByBadgeGroupIdAction } from "app/actions/cryptobadge";
import { useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useRouteMatch } from "react-router";
// components
import { BadgePreviewItemCell } from "common/components/cryptobadge/badgePreviewItemCell";
import { useMintRequests } from "common/components/cryptobadge/hooks/useMintRequests";
import PageUpdater from "common/components/pageUpdater";
import CryptobadgeGroupShowHeader from "./header";
import Skeleton, { CryptobadgeItemCellBodySkeleton } from "./skeleton";
// style
import {
  Body,
  ContentWrapper,
  InnerContentWrapper,
  InnerWrapper,
  ItemContainer,
  RootWrapper,
} from "./styled";

const COLUMN_COUNT_EXCEPT_DESKTOP = 2;
const COLUMN_COUNT_DESKTOP = 4;

function CryptobadgeGroupShow() {
  const [isLoading, setLoadStatus] = React.useState(false);
  const isMobile = useIsMobile();
  const {
    currentUserMintRequests: mintRequests,
    refreshMintRequestData,
  } = useMintRequests();

  const match = useRouteMatch<Moim.IMatchParams>();
  const { groupId } = match.params;

  const [cryptobadges, setCryptobadges] = React.useState<
    Moim.Cryptobadge.ICryptobadge[] | undefined
  >(undefined);
  const [cryptobadgeGroup, setCryptobadgeGroup] = React.useState<
    Moim.Cryptobadge.ICryptobadgeGroup | undefined
  >(undefined);

  const { getCryptobadgeItemsByBadgeGroupId } = useActions({
    getCryptobadgeItemsByBadgeGroupId: getCryptobadgeItemsByBadgeGroupIdAction,
  });

  const handleGetBadgeGroup = React.useCallback(
    async (badgeGroupId: string) => {
      const badgeGroupResultData = await getCryptobadgeItemsByBadgeGroupId({
        badgeGroupId,
      });

      setCryptobadgeGroup(badgeGroupResultData?.badgeGroupData);
      setCryptobadges(badgeGroupResultData?.badgeGroupList);
      setLoadStatus(false);
    },
    [getCryptobadgeItemsByBadgeGroupId],
  );

  const handleFindMintStatus = React.useCallback(
    (badge: Moim.Cryptobadge.ICryptobadge) => {
      const mintStatus =
        mintRequests && mintRequests.length > 0
          ? mintRequests?.find(mint => mint.badge.name === badge.name)?.status
          : "NONE";
      return mintStatus;
    },
    [mintRequests],
  );

  React.useEffect(() => {
    setLoadStatus(true);
    refreshMintRequestData();
    if (groupId) {
      handleGetBadgeGroup(groupId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const itemElements = React.useMemo(() => {
    if (isLoading || !cryptobadgeGroup || !cryptobadges) {
      return new Array(
        isMobile ? COLUMN_COUNT_EXCEPT_DESKTOP * 2 : COLUMN_COUNT_DESKTOP * 2,
      )
        .fill(0)
        .map((_value, idx) => <Skeleton key={idx} />);
    }

    return cryptobadges && cryptobadges.length > 0
      ? cryptobadges.map(badge => {
          const mintRequestStatus = handleFindMintStatus(badge);

          return (
            <ItemContainer key={`cryptobadge_group_${badge.id}`}>
              <BadgePreviewItemCell
                item={badge}
                mintRequestStatus={mintRequestStatus}
              />
            </ItemContainer>
          );
        })
      : [];
  }, [
    cryptobadgeGroup,
    cryptobadges,
    handleFindMintStatus,
    isLoading,
    isMobile,
    mintRequests,
  ]);

  return (
    <RootWrapper>
      {cryptobadgeGroup ? (
        <>
          <CryptobadgeGroupShowHeader
            title={cryptobadgeGroup?.name ?? ""}
            description={cryptobadgeGroup?.description}
          />
          <PageUpdater title={cryptobadgeGroup?.name} />
        </>
      ) : (
        <CryptobadgeItemCellBodySkeleton />
      )}
      <ContentWrapper>
        <InnerContentWrapper>
          <Body>
            <InnerWrapper
              columnCount={
                isMobile ? COLUMN_COUNT_EXCEPT_DESKTOP : COLUMN_COUNT_DESKTOP
              }
            >
              {itemElements}
            </InnerWrapper>
          </Body>
        </InnerContentWrapper>
      </ContentWrapper>
    </RootWrapper>
  );
}

export default React.memo(CryptobadgeGroupShow);
