import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { ContentsGroupHooks } from "./hooks";
// actions
import {
  getContentsGroupThreads as getContentsGroupThreadsAction,
  getContentsGroupData as getContentsGroupDataAction,
} from "app/actions/contentsGroup";
// helpers
import { selectThreadListById } from "app/selectors/forum";
// component
import BlockitListLayout from "common/components/blockitListLayout";
import InfiniteScroller from "common/components/infiniteScroller/new";
import InViewTrigger from "../inViewTrigger";
import { ViewMore } from "./components/viewMore";
import { Title } from "./components/title";
import {
  Wrapper,
  Inner,
  Header,
  TitleWrapper,
  Description,
  DividerWrapper,
  Divider,
  LoadWrapper,
  Loading,
  ItemContainer,
} from "./styled";
import { PostCellSkeleton } from "./components/postCell/skeleton";
import PostItem from "./components/postCell";
import { withPlacement } from "../../hoc/withPlacement";

interface IProps extends Omit<Moim.Blockit.IContentGroupBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DEFAULT_LIMIT = 20;

const ContentGroup: React.FC<IProps> = ({
  title,
  description,
  listElement,
  listShowConfig,
  resourceId,
}) => {
  const [
    contentsGroupData,
    setContentsGroup,
  ] = React.useState<Moim.ContentsGroup.IContentsGroupData | null>(null);
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState(false);

  const isMobile = useIsMobile();
  const { getContentsGroupThreads, getContentsGroupData } = useActions({
    getContentsGroupThreads: getContentsGroupThreadsAction,
    getContentsGroupData: getContentsGroupDataAction,
  });
  const threads = useStoreState(state =>
    selectThreadListById(
      state,
      state.contentsGroup.groupByThreads[resourceId]?.data ?? [],
    ),
  );
  const { paging } = useStoreState(state => ({
    paging: state.contentsGroup.groupByThreads[resourceId]?.paging ?? {},
  }));

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && paging.after) {
      setLoadStatus(true);
      getContentsGroupThreads(
        resourceId,
        DEFAULT_LIMIT,
        cancelTokenSource.current.token,
        {
          after: paging.after,
        },
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    cancelTokenSource,
    getContentsGroupThreads,
    isLoading,
    paging.after,
    resourceId,
  ]);

  const { column } = ContentsGroupHooks.useConfig(listElement);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = threads?.some(thread => thread?.id === undefined);
    if (threads === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web),
      )
        .fill(0)
        .map((_, idx) => (
          <ItemContainer key={`contents_group_skeleton_${idx}`}>
            <PostCellSkeleton
              showThumbnail={listShowConfig.showThumbnail}
              thumbnailConfig={listShowConfig.thumbnailConfig}
            />
          </ItemContainer>
        ));
    }

    return threads.map(thread => (
      <ItemContainer key={`contents_group_${thread.id}`}>
        <PostItem thread={thread} config={listShowConfig} />
      </ItemContainer>
    ));
  }, [
    column,
    threads,
    isLoading,
    isMobile,
    listElement.rowCount_web,
    listElement.rowCount,
    listShowConfig,
    column,
  ]);

  const handleOnView = React.useCallback(() => {
    if (!isLoading && !threads.length) {
      setLoadStatus(true);
      getContentsGroupData(resourceId).then(contentsGroupResponse => {
        if (contentsGroupResponse) {
          setContentsGroup(contentsGroupResponse);
        }
      });
      getContentsGroupThreads(
        resourceId,
        DEFAULT_LIMIT,
        cancelTokenSource.current.token,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    cancelTokenSource,
    getContentsGroupThreads,
    getContentsGroupData,
    isLoading,
    resourceId,
    threads?.length,
  ]);

  React.useLayoutEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

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
            <Title
              title={title ?? ""}
              resourceId={resourceId}
              redirectUrl={contentsGroupData?.detailUrl}
            />
            <ViewMore
              resourceId={resourceId}
              redirectUrl={contentsGroupData?.detailUrl}
              hasMoreContent={Boolean(paging.after)}
            />
          </TitleWrapper>
          {description && <Description>{description}</Description>}
        </Header>
        <InfiniteScroller
          itemLength={threads.length}
          threshold={700}
          paging={paging}
          loader={
            <LoadWrapper>
              <Loading />
            </LoadWrapper>
          }
          loadMore={handleLoadMore}
        >
          <BlockitListLayout element={listElement}>
            {itemElements}
          </BlockitListLayout>
        </InfiniteScroller>
      </Inner>
    </Wrapper>
  );
};

export default withPlacement(React.memo(ContentGroup));
