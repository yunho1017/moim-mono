import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { searchThreads as searchThreadsAction } from "app/actions/forum";
import { useStoreState, useActions } from "app/store";
import { Post, Comment } from "common/components/search";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import { SearchEmpty, SearchLoader } from "../../components/emptyAndLoader";
import { Wrapper, Inner, ItemWrapper, BottomSpacer } from "../styled";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const SearchThreads: React.FC<IProps> = ({ match }) => {
  const { isLoading, isFailed, result } = useStoreState(state => ({
    ...state.searchPageData.threads,
  }));
  const { searchThreads } = useActions({
    searchThreads: searchThreadsAction,
  });
  const [isLoadMore, setIsLoadMore] = React.useState(false);

  const element = React.useMemo(
    () =>
      result.data.map(item =>
        Boolean(item.parentContent) ? (
          <ItemWrapper
            target="_blank"
            href={item.url.split("#").join("/replies/")}
            key={`${item.channelId}_${item.content.id}`}
          >
            <Comment
              comment={
                item as Moim.Forum.ISearchedThreadBody &
                  Required<
                    Pick<Moim.Forum.ISearchedThreadBody, "parentContent">
                  >
              }
            />
          </ItemWrapper>
        ) : (
          <ItemWrapper
            target="_blank"
            href={item.url}
            key={`${item.channelId}_${item.content.id}`}
          >
            <Post post={item} />
          </ItemWrapper>
        ),
      ),
    [result.data],
  );

  const handleLoadMore = React.useCallback(() => {
    const query = match.params.query;
    if (!isLoading && query) {
      setIsLoadMore(true);
      searchThreads({
        query,
        type: ["post", "reply"],
        ...result.paging,
      }).then(() => {
        setIsLoadMore(false);
      });
    }
  }, [isLoading, match.params.query, result.paging, searchThreads]);

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

export default SearchThreads;
