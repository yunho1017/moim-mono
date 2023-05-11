import React from "react";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import RecentHistoriesBlock from "./recentHistories";
import SearchKeywordBlock from "./searchKeywords";
import { Spacer } from "common/components/designSystem/spacer";
import useCurrentGroup from "common/hooks/useCurrentGroup";

const SearchBlockitRenderer: React.FC<{ onClose?(): void }> = ({ onClose }) => {
  const currentGroup = useCurrentGroup();
  return (
    <>
      {currentGroup?.search_blocks_config?.map((block, index) => {
        switch (block.type) {
          case "search-keywords":
            return (
              <>
                <SearchKeywordBlock
                  key={`${block.type}_${index}`}
                  block={block}
                  onClose={onClose}
                />
                <Spacer key={`spacer_${index}`} value={12} />
              </>
            );
          case "search-histories":
            return (
              <>
                <RecentHistoriesBlock
                  key={`${block.type}_${index}`}
                  block={block}
                  onClose={onClose}
                />
                <Spacer key={`spacer_${index}`} value={12} />
              </>
            );
          default:
            return (
              <BlockitRenderer key={`${block.type}_${index}`} block={block} />
            );
        }
      })}
    </>
  );
};

export default SearchBlockitRenderer;
