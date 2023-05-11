import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { CancelToken } from "axios";

import { FormattedMessage } from "react-intl";
import PageIndex from "common/components/pageIndex";
import { Wrapper, PageIndexContainer } from "../styled";
import EmptySection from "../../../productShow/components/emptySection";

import useIsMobile from "common/hooks/useIsMobile";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { ThunkPromiseResult, useActions, useStoreState } from "app/store";
import { loadEntities } from "app/actions/entity";
import { batchThreadData } from "common/helpers/batchService";

import ProductThreadListContext from "../../context";

interface IProps {
  threads: Moim.IIndexedPagingList<Moim.Id>;
  maxCount: number;
  emptyTextKey: string;
  wrapperStyle?: FlattenInterpolation<any>;
  getThreads(index: number, cancelToken: CancelToken): Promise<void>;
  renderThread(thread: Moim.Forum.IThread): React.ReactNode;
}

export function getHighlightedThread(
  threadId: string,
  cancelToken: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    try {
      const { entities } = getState();

      if (!entities.threads[threadId]) {
        const result = await batchThreadData([threadId], cancelToken);
        dispatch(loadEntities(result));
      }
    } catch (err) {
      throw err;
    }
  };
}

const ThreadComponent: React.FC<{
  threadId: string;
  renderThread: PickValue<IProps, "renderThread">;
}> = ({ threadId, renderThread }) => {
  const thread = useStoreState(state => state.entities.threads[threadId]);
  if (!thread) {
    return null;
  }
  return <>{renderThread(thread)}</>;
};

const ProductThreadList: React.FC<IProps> = ({
  threads,
  maxCount,
  emptyTextKey,
  wrapperStyle,
  getThreads,
  renderThread,
}) => {
  const isMobile = useIsMobile();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [loadMoreLoading, setLoadMoreLoadStatue] = React.useState(false);
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const { highlight } = React.useContext(ProductThreadListContext);

  const { dispatchGetHighlightedThread } = useActions({
    dispatchGetHighlightedThread: getHighlightedThread,
  });

  const focusToTop = React.useCallback(() => {
    requestAnimationFrame(() => {
      const targetElement = wrapperRef.current?.parentElement?.parentElement;
      if (isMobile) {
        const scrollTop = targetElement?.offsetTop;
        window.scrollTo({
          left: 0,
          top: scrollTop,
          behavior: "smooth",
        });
      } else {
        targetElement?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    });
  }, [isMobile]);

  React.useEffect(() => {
    if (highlight.threadId) {
      dispatchGetHighlightedThread(
        highlight.threadId,
        cancelTokenSource.current.token,
      );
    }
  }, [highlight.threadId]);

  const handleChangeIndex = React.useCallback(
    (index: number) => {
      if (!loadMoreLoading) {
        setLoadMoreLoadStatue(true);
        getThreads(index, cancelTokenSource.current.token).finally(() => {
          setLoadMoreLoadStatue(false);
          focusToTop();
        });
      }
    },
    [focusToTop, loadMoreLoading, highlight.threadId],
  );

  React.useEffect(
    () => () => {
      handleCancel();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const threadElements = React.useMemo(
    () => (
      <>
        {threads.currentIndex === 0 && highlight.threadId && (
          <ThreadComponent
            key={highlight.threadId}
            threadId={highlight.threadId}
            renderThread={renderThread}
          />
        )}
        {threads.items
          .filter(
            threadId =>
              !(threads.currentIndex === 0 && threadId === highlight.threadId),
          )
          .map(threadId => (
            <ThreadComponent
              key={threadId}
              threadId={threadId}
              renderThread={renderThread}
            />
          ))}
      </>
    ),
    [renderThread, threads, highlight.threadId],
  );

  return (
    <>
      <Wrapper ref={wrapperRef} overrideStyle={wrapperStyle}>
        {threads.total === 0 ? (
          <EmptySection>
            <FormattedMessage id={emptyTextKey} />
          </EmptySection>
        ) : (
          threadElements
        )}
      </Wrapper>
      {threads.total > maxCount && (
        <PageIndexContainer>
          <PageIndex
            pageSize={maxCount}
            totalItemSize={threads.total || 0}
            onChangeIndex={handleChangeIndex}
          />
        </PageIndexContainer>
      )}
    </>
  );
};

export default React.memo(ProductThreadList);
