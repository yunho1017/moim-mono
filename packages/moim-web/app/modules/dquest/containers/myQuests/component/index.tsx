import * as React from "react";
import { useActions, useStoreState } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import useOpenDQuestShowModal from "app/modules/dquest/containers/show/hooks/useOpenDQuestShowModal";
import useGroupTexts from "common/hooks/useGroupTexts";
import { fetchHistories as fetchHistoriesAction } from "app/actions/dquest";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DQuestPreviewWithSkeleton } from "common/components/dquestPreview";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Wrapper,
  LoadWrapper,
  Loading,
  QuestContainer,
  EmptyWrapper,
  SearchIcon,
  IconWrapper,
} from "./styled";

interface IProps {
  type: Moim.DQuest.HISTORY_STATUS;
}

const MyQuestsComponent: React.FC<IProps> = ({ type }) => {
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const emptyProgressTexts = useGroupTexts("my_quest_ongoing_none");
  const emptyAchievedTexts = useGroupTexts("my_quest_finished_none");
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const currentUser = useCurrentUser();
  const openDQuestShowModal = useOpenDQuestShowModal();
  const { fetchHistories } = useActions({
    fetchHistories: fetchHistoriesAction,
  });
  const { data, paging } = useStoreState(
    state => state.dquest.myQuestList[type],
  );

  const handleClickQuestPreview = React.useCallback(
    id => {
      openDQuestShowModal(id);
    },
    [openDQuestShowModal],
  );

  const handleLoadMore = React.useCallback(async () => {
    if (currentUser && !isLoading) {
      setLoadStatus(true);
      try {
        await fetchHistories(
          {
            userId: currentUser.id,
            status: type,
            after: paging.after,
          },
          cancelTokenSource.current.token,
        );
      } finally {
        setLoadStatus(false);
      }
    }
  }, [
    cancelTokenSource,
    currentUser,
    fetchHistories,
    isLoading,
    paging.after,
    type,
  ]);

  React.useLayoutEffect(() => {
    if (currentUser && (!data.length || isLoading === undefined)) {
      setLoadStatus(true);
      fetchHistories(
        {
          userId: currentUser.id,
          status: type,
        },
        cancelTokenSource.current.token,
      ).finally(() => {
        setLoadStatus(false);
      });
    }

    return () => {
      handleCancel();
    };
  }, [currentUser?.id, data.length, type]);

  return (
    <Wrapper>
      <InfiniteScroller
        isLoading={isLoading}
        itemLength={data.length}
        threshold={400}
        paging={paging}
        loader={
          <LoadWrapper>
            <Loading />
          </LoadWrapper>
        }
        loadMore={handleLoadMore}
      >
        {data.length ? (
          data.map(id => (
            <QuestContainer key={`my_quest_preview_${id}`}>
              <DQuestPreviewWithSkeleton
                questId={id}
                disableHide={true}
                onClick={handleClickQuestPreview}
              />
            </QuestContainer>
          ))
        ) : (
          <EmptyWrapper>
            <div className="image">
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
            </div>
            <span className="message">
              {type === "IN_PROGRESS"
                ? emptyProgressTexts?.singular
                : emptyAchievedTexts?.singular}
            </span>
          </EmptyWrapper>
        )}
        <Spacer value={88} />
      </InfiniteScroller>
    </Wrapper>
  );
};

export default React.memo(MyQuestsComponent);
