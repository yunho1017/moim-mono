// TBD : 아직 안씀
import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { ChipShape } from "common/components/chips";
import { Wrapper, Tag } from "./styled";

import { isBrowser } from "common/helpers/envChecker";

export interface IProps {
  tags: string[];
  shape?: ChipShape;
  onClick?: () => void;
}
const LABEL_GAP = 4;
const REMAINING_TAG_COUNT_WIDTH = 20;

function Tags({ tags, shape = "round", onClick }: IProps) {
  const refThis = React.useRef<HTMLDivElement>(null);
  const [maxTagVisibleCount, setMaxTagVisibleCount] = React.useState(10);

  const calculateVisibleCount = React.useCallback(
    (width: number) => {
      const wrapper = refThis.current;
      if (isBrowser() && wrapper) {
        requestAnimationFrame(() => {
          let index = 0;
          let accumulateChildWidth = 0;
          for (const node of Array.from(wrapper.children)) {
            const childrenNodeWidth = node.getBoundingClientRect().width;
            if (
              accumulateChildWidth + childrenNodeWidth <
              width - REMAINING_TAG_COUNT_WIDTH
            ) {
              index++;
              accumulateChildWidth += childrenNodeWidth + LABEL_GAP;
            } else {
              setMaxTagVisibleCount(index);
              break;
            }
          }
        });
      }
    },
    [setMaxTagVisibleCount, refThis],
  );
  const visibleTags = React.useMemo(
    () => (tags ? tags.slice(0, maxTagVisibleCount) : []),
    [maxTagVisibleCount, tags],
  );
  const remainTagCount = tags ? tags.length - maxTagVisibleCount : 0;
  return (
    <ReactResizeDetector
      handleWidth={true}
      refreshMode="throttle"
      onResize={calculateVisibleCount}
    >
      <Wrapper ref={refThis}>
        {visibleTags.map(tag => (
          <Tag shape={shape} onClick={onClick}>
            {tag}
          </Tag>
        ))}
        {remainTagCount > 0 && <Tag shape={shape}>...</Tag>}
      </Wrapper>
    </ReactResizeDetector>
  );
}

export default Tags;
