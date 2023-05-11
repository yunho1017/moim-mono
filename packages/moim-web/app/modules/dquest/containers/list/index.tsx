import * as React from "react";
import { useEffectOnce } from "react-use";
import { useStoreState, useActions } from "app/store";
import { fetchQuestList } from "app/actions/dquest";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import DQuestListComponent from "../../components/list";
import { IRouteComponentProps } from "app/routes/client";

const DQuestList: React.FC<IRouteComponentProps> = ({}) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const {
    cancelTokenSource: getQuestListCancelTokenSource,
    handleCancel: handleCancelQuestListCancelToken,
  } = useCancelTokenWithCancelHandler();

  const { data: quests, paging } = useStoreState(
    state => state.dquest.questList,
  );
  const { getQuestList } = useActions({
    getQuestList: fetchQuestList,
  });

  const handleLoadMore = React.useCallback(() => {
    setLoadStatus(true);
    getQuestList(paging, getQuestListCancelTokenSource.current.token).finally(
      () => {
        setLoadStatus(false);
      },
    );
  }, [getQuestList, getQuestListCancelTokenSource, paging]);

  React.useEffect(
    () => () => {
      handleCancelQuestListCancelToken();
    },
    [],
  );

  useEffectOnce(() => {
    setLoadStatus(true);
    getQuestList(
      undefined,
      getQuestListCancelTokenSource.current.token,
    ).finally(() => {
      setLoadStatus(false);
    });
  });

  return (
    <DQuestListComponent
      isLoading={Boolean(isLoading)}
      questIds={quests}
      paging={paging}
      onLoadMore={handleLoadMore}
    />
  );
};

export default React.memo(DQuestList);
