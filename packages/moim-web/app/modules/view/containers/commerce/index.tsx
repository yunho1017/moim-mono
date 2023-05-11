import * as React from "react";
import * as Base64 from "js-base64";
import useIsMobile from "common/hooks/useIsMobile";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { RootWrapper, ContentContainer } from "./styled";
import ScrollToTop from "common/components/scrollToTop";
interface IProps {
  channelId: Moim.Id;
  blocks: Moim.Blockit.Blocks[];
}

const CommerceView: React.FC<IProps> = ({ channelId, blocks }) => {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { firstCarouselBlock, restBlocks } = React.useMemo(() => {
    let fCBlock: Moim.Blockit.Blocks | null = null;
    let remainBlocks: Moim.Blockit.Blocks[] = blocks;
    if (blocks.length && blocks[0].type === "carousel") {
      fCBlock = blocks[0];
      remainBlocks = blocks.slice(1);
    }
    return {
      firstCarouselBlock: fCBlock,
      restBlocks: remainBlocks,
    };
  }, [blocks]);

  const blockElements = React.useMemo(
    () =>
      restBlocks.map(block => (
        <BlockitRenderer
          key={`commerce_view_${channelId}_${Base64.encode(
            JSON.stringify(block),
          )}`}
          block={
            block && block.type === "category"
              ? {
                  ...block,
                  margin: isMobile
                    ? { top: 16, bottom: 16 }
                    : { top: 56, bottom: 24 },
                }
              : block
          }
        />
      )),
    [channelId, isMobile, restBlocks],
  );

  return (
    <RootWrapper ref={refWrapper}>
      {firstCarouselBlock && (
        <BlockitRenderer
          key={`commerce_view_${channelId}_${Base64.encode(
            JSON.stringify(firstCarouselBlock),
          )}`}
          block={firstCarouselBlock}
        />
      )}
      <ContentContainer>{blockElements}</ContentContainer>
      <ScrollToTop
        useWindowScroll={isMobile}
        scrollingTarget={refWrapper.current}
        disappearOffset={0}
      />
    </RootWrapper>
  );
};

export default React.memo(CommerceView);
