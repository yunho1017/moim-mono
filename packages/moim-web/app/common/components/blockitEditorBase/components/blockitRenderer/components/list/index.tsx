import * as React from "react";
import shortid from "shortid";
import { FormattedMessage } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { fetchMoreListBlocks as fetchMoreListBlocksDispatch } from "app/actions/referenceBlock";
// components
import BlockitRender from "../..";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import {
  Wrapper,
  HeaderWrapper,
  ListWrapper,
  EmptyWrapper,
  EmptyEmojiWrapper,
  EmptyMessage,
} from "./styled";

interface IProps extends Omit<Moim.Blockit.IListBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
}

const ListBlock: React.FC<IProps> = ({
  wrapperStyle,
  gridWrapperStyle,
  gridItemStyle,
  botId,
  actionId,
  paging,
  blockId,
  headerBlocks,
  blocks,
  params,
  margin,
}) => {
  const {
    apiCalled,
    addedBlocks,
    isLoading,
    addedPaging,
    addedParams,
  } = useStoreState(state => {
    const entity = state.entities.referenceBlockBlocks[blockId];
    return {
      apiCalled: Boolean(entity),
      addedBlocks: entity?.blocks ?? [],
      isLoading: entity?.isLoading ?? false,
      addedPaging: entity?.paging ?? {},
      addedParams: entity?.params ?? {},
    };
  });

  const { fetchMoreListBlocks } = useActions({
    fetchMoreListBlocks: fetchMoreListBlocksDispatch,
  });

  const pagingValue: { after?: Moim.PagingValue } = React.useMemo(
    () => (apiCalled ? addedPaging : paging ?? {}),
    [addedPaging, apiCalled, paging],
  );

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && botId) {
      const newParams = {
        ...params,
        ...addedParams,
        after: pagingValue.after,
      };

      fetchMoreListBlocks({
        botId,
        data: {
          actionId,
          blockId,
          params: newParams,
        },
      });
    }
  }, [
    actionId,
    addedParams,
    blockId,
    botId,
    fetchMoreListBlocks,
    isLoading,
    pagingValue.after,
    params,
  ]);

  const headerElement = React.useMemo(
    () =>
      headerBlocks ? (
        <HeaderWrapper>
          {headerBlocks.map(block => (
            <BlockitRender
              key={`list_header_${shortid()}`}
              wrapperStyle={wrapperStyle}
              gridWrapperStyle={gridWrapperStyle}
              gridItemStyle={gridItemStyle}
              block={block}
            />
          ))}
        </HeaderWrapper>
      ) : null,
    [gridItemStyle, gridWrapperStyle, headerBlocks, wrapperStyle],
  );

  const elements = React.useMemo(
    () =>
      Boolean(blocks.length + addedBlocks.length) ? (
        <ListWrapper>
          <InfiniteScroller
            loader={<Loader />}
            paging={pagingValue}
            isLoading={isLoading}
            itemLength={blocks.length + addedBlocks.length}
            loadMore={handleLoadMore}
          >
            {blocks.concat(addedBlocks).map(block => (
              <BlockitRender
                key={`list_item_${shortid()}`}
                wrapperStyle={wrapperStyle}
                block={block}
              />
            ))}
          </InfiniteScroller>
        </ListWrapper>
      ) : (
        <EmptyWrapper>
          <EmptyEmojiWrapper>⛄️</EmptyEmojiWrapper>
          <EmptyMessage>
            <FormattedMessage id="sub_moim_list/page_empty" />
          </EmptyMessage>
        </EmptyWrapper>
      ),
    [addedBlocks, blocks, handleLoadMore, isLoading, pagingValue, wrapperStyle],
  );

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      {headerElement}
      {elements}
    </Wrapper>
  );
};

export default ListBlock;
