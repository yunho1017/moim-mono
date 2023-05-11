import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";

import useRedirect from "common/hooks/useRedirect";
// actions
import {
  getContentsGroupThreads as getContentsGroupThreadsAction,
  getContentsGroupData as getContentsGroupDataAction,
} from "app/actions/contentsGroup";
// helpers
import { selectThreadListById } from "app/selectors/forum";
import { MoimURL } from "common/helpers/url";
// component
import BlockitListLayout from "common/components/blockitListLayout";
import InfiniteScroller from "common/components/infiniteScroller/new";
import InViewTrigger from "../inViewTrigger";
import { PostCellSkeleton } from "./components/postCell/skeleton";
import PostItem from "./components/postCell";
import BlockitHeader from "../header";
import { withPlacement } from "../../hoc/withPlacement";

import { Wrapper, Inner, LoadWrapper, Loading, ItemContainer } from "./styled";

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

  const { column } = useParseListElementConfig(listElement);

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
    isLoading,
    threads.length,
    getContentsGroupData,
    resourceId,
    getContentsGroupThreads,
    cancelTokenSource,
  ]);

  React.useLayoutEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

  const redirect = useRedirect();

  const handleClickViewMore = React.useCallback(() => {
    const defaultRedirectUrl = new MoimURL.ContentsGroupThreads({
      id: resourceId,
    }).toString();
    const redirectUrl = contentsGroupData?.detailUrl;

    if (!redirectUrl) {
      redirect(defaultRedirectUrl);
    } else {
      const nl = new URL(redirectUrl);

      if (nl.hostname === location.hostname) {
        redirect(defaultRedirectUrl);
      } else {
        window.open(redirectUrl, "_blank");
      }
    }
  }, [contentsGroupData, redirect, resourceId]);

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleOnView} />
      <Inner>
        <BlockitHeader
          title={title}
          description={description}
          onClickViewMore={handleClickViewMore}
        />
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
