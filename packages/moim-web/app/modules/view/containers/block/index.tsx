import * as React from "react";
import { css } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { ViewWrapper } from "../styled";

import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
import ScrollToTop from "common/components/scrollToTop";

export interface IProps {
  channelId: string;
  blocks: Moim.Blockit.Blocks[];
}

const BlockViewShow: React.FC<IProps> = props => {
  const { blocks } = props;
  const refThis = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [contentWidth, setWidth] = React.useState<number | undefined>(
    undefined,
  );
  const [contentHeight, setHeight] = React.useState<number | undefined>(
    undefined,
  );
  const handleResize = React.useCallback((width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  }, []);

  const getBlockProps = React.useCallback(
    (block: Moim.Blockit.Blocks) => {
      if (block.type === "calendar") {
        return {
          ...block,
          width: contentWidth,
          height: contentHeight,
        } as Moim.Blockit.ICalendarBlock;
      }

      return block;
    },
    [contentWidth, contentHeight],
  );

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (isMobile && refThis.current) {
        setHeight(
          window.innerHeight -
            (refThis.current.getBoundingClientRect().y -
              document.documentElement.getBoundingClientRect().y),
        );
      }
    });
  }, [isMobile]);

  const renders = React.useMemo(
    () =>
      blocks.map((block, index) => {
        const blockProps = getBlockProps(block);
        if (block.type === "calendar") {
          return (
            <BlockitRenderer
              key={`${props.channelId}_block_${block.type}_${index}`}
              block={blockProps}
              wrapperStyle={css`
                background-color: transparent;
                padding-left: 0;
                padding-right: 0;
                ${contentHeight &&
                  css`
                    height: ${px2rem(contentHeight)};
                  `}
              `}
            />
          );
        }
        return (
          <BlockitRenderer
            key={`${props.channelId}_block_${block.type}_${index}`}
            block={blockProps}
          />
        );
      }),
    [props.channelId, contentHeight, blocks, getBlockProps],
  );

  return (
    <ViewWrapper ref={refThis}>
      <ReactResizeDetector
        handleWidth={true}
        handleHeight={!isMobile}
        onResize={handleResize}
      >
        {renders}
      </ReactResizeDetector>
      <ScrollToTop
        useWindowScroll={isMobile}
        scrollingTarget={refThis.current}
        disappearOffset={0}
      />
    </ViewWrapper>
  );
};

export default React.memo(BlockViewShow);
