import * as React from "react";
import { useActions, useStoreState } from "app/store";
import { fetchQuest, fetchHistory, postQuestView } from "app/actions/dquest";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import DQuestShowComponent from "../../components/show";
import { getThreadShow as getThreadAction } from "app/actions/forum";

interface IProps {
  questId?: Moim.Id;
}

const DQuestShow: React.FC<IProps> = ({ questId }) => {
  const {
    cancelTokenSource: getQuestCancelTokenSource,
    handleCancel: handleGetQuestCancel,
  } = useCancelTokenWithCancelHandler();
  const {
    cancelTokenSource: getHistoryCancelTokenSource,
    handleCancel: handleGetHistoryCancel,
  } = useCancelTokenWithCancelHandler();
  const {
    cancelTokenSource: getThreadCancelTokenSource,
    handleCancel: handleGetThreadCancel,
  } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const { quest, history, content } = useStoreState(state => ({
    quest: questId ? state.entities.dquest_quests[questId] : undefined,
    history: questId ? state.entities.dquest_histories[questId] : undefined,
    content: questId ? state.entities.threads[questId]?.content : undefined,
  }));
  const { getQuest, getHistory, getThread, trackQuestView } = useActions({
    getQuest: fetchQuest,
    getHistory: fetchHistory,
    getThread: getThreadAction,
    trackQuestView: postQuestView,
  });

  React.useEffect(() => {
    if (questId && !isLoading) {
      setLoadStatus(true);
      const promises = [
        getQuest(questId, getQuestCancelTokenSource.current.token),
        getHistory(questId, getHistoryCancelTokenSource.current.token),
        getThread(questId, getThreadCancelTokenSource.current.token),
      ];

      // NOTE: is Ok to asynchronous
      trackQuestView(questId);

      Promise.all(promises).finally(() => {
        setLoadStatus(false);
      });

      return () => {
        handleGetQuestCancel();
        handleGetHistoryCancel();
        handleGetThreadCancel();
      };
    }
  }, [questId]);

  return (
    <DQuestShowComponent
      isLoading={Boolean(isLoading)}
      quest={quest}
      history={history}
      content={content}
    />
  );
};

export default React.memo(DQuestShow);
