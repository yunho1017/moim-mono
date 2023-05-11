import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { searchPageSearchUsers as searchPageSearchUsersAction } from "app/actions/user";
import { useStoreState, useActions } from "app/store";
import { User } from "common/components/search";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import { SearchEmpty, SearchLoader } from "../../components/emptyAndLoader";
import { Wrapper, Inner, ItemWrapper, BottomSpacer } from "../styled";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const SearchUsers: React.FC<IProps> = ({ match }) => {
  const { isLoading, isFailed, result } = useStoreState(state => ({
    ...state.searchPageData.users,
  }));
  const { searchPageSearchUsers } = useActions({
    searchPageSearchUsers: searchPageSearchUsersAction,
  });
  const [isLoadMore, setIsLoadMore] = React.useState(false);

  const element = React.useMemo(
    () =>
      result.data.map(item => (
        <ItemWrapper target="_blank" href={item.url} key={item.id}>
          <User user={item} />
        </ItemWrapper>
      )),
    [result.data],
  );

  const handleLoadMore = React.useCallback(() => {
    const query = match.params.query;
    if (!isLoading && query) {
      setIsLoadMore(true);
      searchPageSearchUsers({
        query,
        ...result.paging,
      }).then(() => {
        setIsLoadMore(false);
      });
    }
  }, [isLoading, match.params.query, result.paging, searchPageSearchUsers]);

  if (isLoading && !isLoadMore) {
    return <SearchLoader />;
  }
  if (isFailed || !result.data.length) {
    return <SearchEmpty query={match.params.query} />;
  }
  return (
    <Wrapper>
      <Inner>
        <InfiniteScroller
          itemLength={result.data.length}
          isLoading={isLoading}
          loader={<Loader />}
          paging={result.paging}
          loadMore={handleLoadMore}
        >
          {element}
        </InfiniteScroller>
        <BottomSpacer />
      </Inner>
    </Wrapper>
  );
};

export default SearchUsers;
