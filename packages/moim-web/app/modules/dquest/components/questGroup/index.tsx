import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenDQuestShowModal from "app/modules/dquest/containers/show/hooks/useOpenDQuestShowModal";
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import DQuestPreview from "common/components/dquestPreview";
import PageUpdater from "common/components/pageUpdater";
import ScrollToTop from "common/components/scrollToTop";
import { BlockitFeedback } from "common/components/blockitEditorBase/components/blockitRenderer/components/feedback";

import {
  RootWrapper,
  InnerStyle,
  Header,
  Title,
  Description,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  QuestContainer,
  InnerWrapper,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  resourceId: Moim.Id;
  isLoading: boolean;
  questIds: Moim.Id[];
  paging: Moim.IPaging;
  questGroup?: Moim.DQuest.IQuestGroup;
  onLoadMore(): void;
}

const DQuestListComponent: React.FC<IProps> = ({
  resourceId,
  isLoading,
  questIds,
  paging,
  questGroup,
  onLoadMore,
}) => {
  const refScroll = React.useRef<PureInfiniteScroller>(null);
  const isMobile = useIsMobile();
  const openDQuestShowModal = useOpenDQuestShowModal();

  const columnCount = React.useMemo(
    () =>
      (isMobile || !questGroup?.listElement.columnCount
        ? questGroup?.listElement.columnCount
        : questGroup?.listElement.columnCount_web) ?? 1,
    [isMobile, questGroup],
  );

  const handleQuestClick = React.useCallback(
    (id: Moim.Id) => {
      openDQuestShowModal(id);
    },
    [openDQuestShowModal],
  );

  return (
    <>
      <PageUpdater title={questGroup?.title} />
      <RootWrapper>
        <ScrollPositionSaveList id={resourceId} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <Header>
              {questGroup &&
              (questGroup.listConfig.showSectionTitle ?? true) ? (
                <Title>{questGroup?.title}</Title>
              ) : null}
              {questGroup &&
              (questGroup.listConfig.showSectionDescription ?? true) ? (
                <Description>{questGroup.description}</Description>
              ) : null}
            </Header>

            <Body>
              {!isLoading && questIds.length === 0 ? (
                <BlockitFeedback.Empty textKey="content_group_show_empty" />
              ) : (
                <>
                  <InfiniteScroller
                    ref={refScroll}
                    isLoading={isLoading}
                    itemLength={questIds.length}
                    threshold={500}
                    paging={paging}
                    loader={
                      <LoadWrapper>
                        <Loading />
                      </LoadWrapper>
                    }
                    loadMore={onLoadMore}
                  >
                    <InnerWrapper minWidth={320} columnCount={columnCount}>
                      {questIds.map((id, idx) => (
                        <QuestContainer key={`quest-preview-${id}-${idx}`}>
                          <DQuestPreview
                            questId={id}
                            itemStyleConfig={{
                              isShowOutcomeRow:
                                questGroup?.listConfig.showOutcome ?? true,
                              isShowPeriodRow:
                                questGroup?.listConfig.showSchedule ?? true,
                              isShowProgressRow:
                                questGroup?.listConfig.showProgress ?? true,
                            }}
                            onClick={handleQuestClick}
                          />
                        </QuestContainer>
                      ))}
                      <Spacer value={40} />
                    </InnerWrapper>
                  </InfiniteScroller>
                  <ScrollToTop
                    useWindowScroll={isMobile}
                    scrollingTarget={refScroll.current?.getScrollingElement()}
                    disappearOffset={0}
                  />
                </>
              )}
            </Body>
          </InnerContentWrapper>
        </ScrollPositionSaveList>
      </RootWrapper>
    </>
  );
};

export default React.memo(DQuestListComponent);
