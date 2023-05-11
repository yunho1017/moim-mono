import * as React from "react";
import { FormattedMessage } from "react-intl";
import AddressCard, { AddressCardSkeleton } from "./components/addressCard";
import { DefaultLoader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller/new";
import {
  Wrapper,
  CreateButton,
  AddIcon,
  CreateButtonWrapper,
  EmptyWrapper,
  EmptyTextGuide,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  isLoading: boolean;
  addressList: Moim.Commerce.ICommerceShippingAddress[];
  onAddressModifyButtonClick(id: Moim.Id): void;
  onCreateButtonClick(): void;
  onLoadMore(): void;
}

const AddressManageComponent: React.FC<IProps> = ({
  isLoading,
  addressList,
  onAddressModifyButtonClick,
  onCreateButtonClick,
  onLoadMore,
}) => {
  const emptyElement = React.useMemo(
    () => (
      <EmptyWrapper>
        <Spacer value={8} />
        <EmptyTextGuide>
          <FormattedMessage id="my_shopping_shopping_preferences_addresses_list_empty" />
        </EmptyTextGuide>
        <Spacer value={8} />
        <CreateButtonWrapper>
          <CreateButton onClick={onCreateButtonClick}>
            <AddIcon />
            <span>
              <FormattedMessage id="button_add_address" />
            </span>
          </CreateButton>
        </CreateButtonWrapper>
      </EmptyWrapper>
    ),
    [onCreateButtonClick],
  );

  return (
    <Wrapper isEmpty={addressList.length === 0 && !isLoading}>
      {addressList.length === 0 && !isLoading ? (
        emptyElement
      ) : (
        <InfiniteScroller
          useInitialScroll={true}
          paging={{}}
          isLoading={isLoading}
          itemLength={addressList.length}
          loader={<DefaultLoader />}
          loadMore={onLoadMore}
        >
          {addressList.map((item, idx) =>
            item ? (
              <AddressCard
                key={`address_card_${item.id}`}
                isDefault={idx === 0}
                data={item}
                onModifyButtonClick={onAddressModifyButtonClick}
              />
            ) : (
              <AddressCardSkeleton key={`address_card_${idx}`} />
            ),
          )}
          <CreateButtonWrapper>
            <CreateButton onClick={onCreateButtonClick}>
              <AddIcon />
              <span>
                <FormattedMessage id="button_add_address" />
              </span>
            </CreateButton>
          </CreateButtonWrapper>
        </InfiniteScroller>
      )}
    </Wrapper>
  );
};

export default AddressManageComponent;
