import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { fetchReferenceBlock as fetchReferenceBlockAction } from "app/actions/referenceBlock";
import BlockitRenderer from "../../";

type IProps = Omit<Moim.Blockit.IReferenceBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
};

const EMPTY_ARRAY: any[] = [];

const ReferenceBlockContainer: React.FC<IProps> = ({
  botId,
  replaceId,
  blockId,
  params,
  isReplaceHome,
  wrapperStyle,
  gridWrapperStyle,
  gridItemStyle,
}) => {
  const { blocks, isLoading } = useStoreState(state => {
    const refBlock = state.entities.referenceBlockBlocks[blockId];
    return {
      blocks: refBlock?.blocks ?? EMPTY_ARRAY,
      isLoading: refBlock?.isLoading,
    };
  });
  const { fetchReferenceBlock } = useActions({
    fetchReferenceBlock: fetchReferenceBlockAction,
  });

  const elements = React.useMemo(
    () =>
      blocks.map((block, idx) => (
        <BlockitRenderer
          key={`${blockId}_${block.type}_${idx}`}
          block={block}
          wrapperStyle={wrapperStyle}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
        />
      )),
    [blockId, blocks, gridItemStyle, gridWrapperStyle, wrapperStyle],
  );

  React.useEffect(() => {
    if (botId && isLoading === undefined && (!blocks || blocks.length === 0)) {
      fetchReferenceBlock({
        botId,
        data: [{ blockId, replaceId, params }],
        isReplaceHome,
      });
    }
  }, [
    blockId,
    blocks,
    botId,
    fetchReferenceBlock,
    isLoading,
    isReplaceHome,
    params,
    replaceId,
  ]);

  return <>{isLoading || !elements.length ? null : elements}</>;
};

export default ReferenceBlockContainer;
