import React from "react";
import { css } from "styled-components";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";

import { Thread } from "app/typings";

interface IProps {
  blockits: Moim.Blockit.Blocks[];
  config?: Partial<Thread.IThreadItemConfig>;
}

export const PreviewBottom: React.FC<IProps> = ({ blockits, config }) => {
  const blockWrapperStyle = React.useCallback(() => {
    if (config?.textAlignment) {
      return css`
        ${CommonBlockitWrapperStyle};

        text-align: ${config?.textAlignment.toLowerCase()};
      `;
    }
    return CommonBlockitWrapperStyle;
  }, [config?.textAlignment]);

  return (
    <>
      {blockits.map((block, idx) => (
        <BlockitRenderer
          key={`preview_bottom_${block.type}_${idx}`}
          block={blockSearch(block, config)}
          wrapperStyle={blockWrapperStyle()}
          gridWrapperStyle={GridBlockitWrapperStyle}
          gridItemStyle={blockWrapperStyle()}
        />
      ))}
    </>
  );
};

const CommonBlockitWrapperStyle = css`
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
  margin: inherit;
`;

const GridBlockitWrapperStyle = css`
  width: 100%;
  padding: 0;
`;

const blockSearch = (
  block: Moim.Blockit.Blocks,
  config?: Partial<Thread.IThreadItemConfig>,
): Moim.Blockit.Blocks => {
  const blocks = (block as Moim.Blockit.Blocks & {
    blocks: Moim.Blockit.Blocks[] | undefined;
  }).blocks;
  if (blocks) {
    return {
      ...block,
      blocks: blocks.map(item => blockSearch(item, config)),
    } as Moim.Blockit.Blocks;
  } else if (block.type === "text" && config?.textAlignment) {
    return {
      ...block,
      align: config.textAlignment.toLowerCase(),
    } as Moim.Blockit.Blocks;
  }
  return block;
};
