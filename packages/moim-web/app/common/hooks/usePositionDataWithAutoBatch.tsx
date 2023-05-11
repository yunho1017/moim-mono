import * as React from "react";
import { useStoreState, useActions } from "app/store";
import { loadEntitiesDirect } from "app/actions/entity";
import { positionByIdSelector } from "app/selectors/position";

export default function usePositionDataWithAutoBatch(positionId: Moim.Id) {
  const [batchCalled, setBatchCalled] = React.useState<boolean>(false);
  const { position } = useStoreState(state => ({
    position: positionByIdSelector(state, positionId),
  }));

  const { batch } = useActions({
    batch: loadEntitiesDirect,
  });

  React.useEffect(() => {
    if (!batchCalled && positionId && !position) {
      setBatchCalled(true);
      batch?.({
        positions: [positionId],
      });
    }
  }, [batch, batchCalled, position, positionId]);

  return { position, batchCalled };
}
