import * as React from "react";
import throttle from "lodash/throttle";
import ReactResizeDetector from "react-resize-detector";
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer,
  ScrollParams,
} from "react-virtualized";

export default function VirtualizedScroller(
  props: React.ComponentProps<typeof List> & {
    loadMore: (pagingKey: keyof Moim.IPaging) => any;
    loader: React.ReactNode;
    paging?: Moim.IPaging;
    isLoading?: boolean;
    threshold?: number;
  },
) {
  const {
    paging,
    threshold = 250,
    rowRenderer: rowRendererBase,
    isLoading: _isLoading,
    loader: _loader,
    loadMore,
    ...rest
  } = props;
  const cache = React.useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
      }),
    [],
  );

  const handleScroll = React.useMemo(
    () =>
      throttle(({ scrollTop, clientHeight, scrollHeight }: ScrollParams) => {
        const atTop = scrollTop <= threshold;
        const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;

        if (atBottom && paging?.after) {
          loadMore("after");
        } else if (atTop && paging?.before) {
          loadMore("before");
        }
      }, 200),
    [loadMore, paging, threshold],
  );

  const rowRenderer: ListRowRenderer = React.useCallback(
    ListRowProps => {
      const { key, index, parent, style } = ListRowProps;
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {({ measure }) => (
            <div style={style}>
              <div>
                <ReactResizeDetector handleHeight={true} onResize={measure}>
                  {rowRendererBase(ListRowProps)}
                </ReactResizeDetector>
              </div>
            </div>
          )}
        </CellMeasurer>
      );
    },
    [cache, rowRendererBase],
  );

  return (
    <div>
      <List
        {...rest}
        rowHeight={cache.rowHeight}
        deferredMeasurementCache={cache}
        rowRenderer={rowRenderer}
        onScroll={handleScroll}
      />
    </div>
  );
}
