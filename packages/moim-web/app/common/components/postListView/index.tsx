import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Wrapper } from "./styled";

import { useIsPostShowModalView } from "app/modules/forum/hooks/useHooks";

interface IProps {
  column: number;
}

const DEFAULT_SUGGESTION_COLUMN = 5;

export default function PostList({
  children,
  column: defaultColumn,
}: React.PropsWithChildren<IProps>) {
  const postShowModalView = useIsPostShowModalView();
  const [suggestionColumn, setSuggestionColumn] = React.useState(
    DEFAULT_SUGGESTION_COLUMN,
  );

  const column = React.useMemo(() => {
    if (postShowModalView) {
      return suggestionColumn > defaultColumn
        ? defaultColumn
        : suggestionColumn;
    }

    return defaultColumn;
  }, [defaultColumn, postShowModalView, suggestionColumn]);

  const handleResize = React.useCallback(
    (width: number) => {
      if (postShowModalView) {
        if (width <= 500) {
          setSuggestionColumn(1);
        } else if (width <= 800) {
          setSuggestionColumn(2);
        } else if (width <= 1000) {
          setSuggestionColumn(3);
        } else if (width <= 1200) {
          setSuggestionColumn(4);
        } else if (width <= 1400) {
          setSuggestionColumn(5);
        }
      }
    },
    [postShowModalView],
  );

  return (
    <ReactResizeDetector
      handleWidth={true}
      refreshMode="debounce"
      onResize={handleResize}
    >
      <Wrapper column={column}>{children}</Wrapper>
    </ReactResizeDetector>
  );
}
