import * as React from "react";
import { Wrapper } from "./styled";
import BlockitRender from "common/components/blockitEditorBase/components/blockitRenderer";

interface IProps {
  selectedPluginId?: Moim.Id;
}

const HomePlate: React.FC<IProps> = ({ selectedPluginId }) => {
  const block: Moim.Blockit.IReferenceBlock = React.useMemo(
    () => ({
      type: "reference",
      botId: selectedPluginId,
      blockId: `home-placeholder-${selectedPluginId}`,
      replaceId: `home-placeholder-${selectedPluginId}`,
      isReplaceHome: true,
      params: {},
    }),
    [selectedPluginId],
  );

  if (!selectedPluginId) {
    return null;
  }

  return (
    <Wrapper>
      <BlockitRender key={`block_${selectedPluginId}`} block={block} />
    </Wrapper>
  );
};

export default HomePlate;
