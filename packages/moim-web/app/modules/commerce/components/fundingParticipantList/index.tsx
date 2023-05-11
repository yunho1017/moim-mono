import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useActions } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import { getPaidFund } from "app/actions/commerce";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import { Spacer } from "common/components/designSystem/spacer";
import PeopleElement from "./components/peopleItem";
import EmptySection from "../productShow/components/emptySection";
import { Wrapper, Divider } from "./styled";

interface IProps {
  participants: Moim.IPaginatedListResponse<
    Moim.Commerce.IPurchaseItemPurchase
  >;
  productId?: Moim.Id;
  sellerId?: Moim.Id;
}

const FundingParticipantList: React.FC<IProps> = ({
  participants,
  productId,
}) => {
  const [loadMoreLoading, setLoadMoreLoadStatue] = React.useState(false);
  const currentUser = useCurrentUser();
  const { dispatchGetPaidFunds } = useActions({
    dispatchGetPaidFunds: getPaidFund,
  });

  const handleLoadMore = React.useCallback(() => {
    if (productId && participants.paging.after) {
      setLoadMoreLoadStatue(true);
      dispatchGetPaidFunds(
        "loadMore",
        productId,
        participants.paging.after,
      ).finally(() => {
        setLoadMoreLoadStatue(false);
      });
    }
  }, [dispatchGetPaidFunds, participants.paging.after, productId]);

  const peopleElements = React.useMemo(
    () =>
      participants.data.map((item, index) => (
        <>
          <PeopleElement
            key={`participant_${item.userId}`}
            isMine={
              Boolean(currentUser) &&
              (item.profileId || item.userId) === currentUser?.id
            }
            userId={item.profileId || item.userId}
            price={item.totalPrice}
            currency={item.currency}
            createdAt={item.createAt}
            comment={item.comment}
            buyerName={item.buyerName}
            userName={item.username}
            userAvatar={item.userImageUrl}
            anonymous={item.anonymous}
          />
          {index < participants.data.length - 1 && (
            <>
              <Spacer value={8} />
              <Divider />
              <Spacer value={8} />
            </>
          )}
        </>
      )),
    [currentUser, participants.data],
  );

  return (
    <Wrapper>
      {participants.data.length === 0 ? (
        <EmptySection>
          <FormattedMessage id="funding_show/backers_empty" />
        </EmptySection>
      ) : (
        <InfiniteScroller
          loadMore={handleLoadMore}
          isLoading={loadMoreLoading}
          loader={<Loader />}
          paging={participants.paging}
          itemLength={participants.data.length}
        >
          {peopleElements}
        </InfiniteScroller>
      )}
    </Wrapper>
  );
};

export default FundingParticipantList;
