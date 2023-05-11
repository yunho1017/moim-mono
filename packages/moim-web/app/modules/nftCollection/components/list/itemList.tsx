import * as React from "react";
import { FormattedMessage } from "react-intl";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// components
import { Spacer } from "common/components/designSystem/spacer";
import Skeleton from "common/components/NFTItemCell/skeleton";
import { NFTItemCell } from "common/components/NFTItemCell";
// style
import { Wrapper, Title, InnerWrapper } from "./styled";
import {
  MoreButton,
  MoreButtonIcon,
  NftCollectionShowDivider,
  SeeAllButton,
} from "../../styled";

const CURRENT_TAB_ID = "items";

interface IProps {
  items?: Moim.NFT.INftDetail[];
  contract: Moim.NFT.IContract | undefined;
  isLoading: boolean | null | undefined;
  isFetched: boolean | undefined;
  hasMobileDivider?: boolean;
  setSelectedTabId(value: string): void;
}

const NftCollectionItemList: React.FC<IProps> = ({
  items,
  contract,
  isLoading,
  isFetched,
  hasMobileDivider,
  setSelectedTabId,
}) => {
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = items?.some(item => item?.id === undefined);
    if (items === undefined || isLoading || isUndefinedArray) {
      return new Array(isMobile ? 4 : 8).fill(0).map(_ => <Skeleton />);
    }

    return items.map(item => {
      if (item) {
        return (
          <NFTItemCell
            key={item.id}
            item={item}
            groupId={currentGroup?.id}
            hubGroupId={currentHubGroup?.id}
            config={{
              textAlignment: "LEFT",
              showCollectionName: true,
              showName: true,
              showOwner: true,
              showPrice: true,
              showMintButton: contract?.itemType === "SELECTIVE",
              showPeriod: false,
            }}
            disableClickCollectionName={true}
          />
        );
      }
    });
  }, [
    contract?.itemType,
    currentGroup?.id,
    currentHubGroup?.id,
    isLoading,
    isMobile,
    items,
  ]);

  const handleClick = React.useCallback(() => {
    setSelectedTabId(CURRENT_TAB_ID);
  }, [setSelectedTabId]);

  if (items && items.length === 0) return null;

  return (
    <Wrapper>
      {isMobile && hasMobileDivider && <NftCollectionShowDivider />}
      {isFetched && items && items.length > 0 && (
        <>
          {isMobile && <Spacer value={8} />}
          <Title>
            <FormattedMessage
              id={
                contract?.itemType === "SELECTIVE"
                  ? "nft_collection_sale_schedule_show_selective_item_list_title"
                  : "nft_collection_sale_schedule_show_generative_item_list_title"
              }
            />
          </Title>
        </>
      )}
      <Spacer value={isMobile ? 14 : 16} />
      <InnerWrapper columnCount={isMobile ? 2 : 4}>{itemElements}</InnerWrapper>
      <Spacer value={isMobile ? 16 : 20} />
      {isMobile ? (
        <MoreButton onClick={handleClick}>
          <span>
            <FormattedMessage id={"button_see_all"} />
          </span>
          <MoreButtonIcon />
        </MoreButton>
      ) : (
        <SeeAllButton onClick={handleClick} borderTop={true}>
          <FormattedMessage id="button_see_all" />
        </SeeAllButton>
      )}
      {isMobile && <Spacer value={8} />}
    </Wrapper>
  );
};

export default NftCollectionItemList;
