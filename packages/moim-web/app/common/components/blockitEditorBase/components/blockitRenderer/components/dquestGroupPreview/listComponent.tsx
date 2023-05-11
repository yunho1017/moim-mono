import * as React from "react";
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";
import useIsMobile from "common/hooks/useIsMobile";
// component
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import BlockitListLayout from "common/components/blockitListLayout";
import { BlockitFeedback } from "../feedback";
import DQuestPreview from "common/components/dquestPreview";
import Skeleton from "common/components/dquestPreview/skeleton";

import { ListWrapper, QuestPreviewContainer } from "./styled";
import useOpenDQuestShowModal from "app/modules/dquest/containers/show/hooks/useOpenDQuestShowModal";

interface IProps {
  isLoading: boolean;
  portalSectionId?: string;
  quests: Moim.Id[] | undefined;
  listElement: Moim.Blockit.IListStyleElement & {
    maxDisplayedItemsCount: number;
  };
  itemStyleConfig?: Moim.Blockit.IDquestGroupItemStyle;
}

const DQuestGroupItemList: React.FC<IProps> = ({
  isLoading,
  portalSectionId,
  quests,
  listElement,
  itemStyleConfig,
}) => {
  const isMobile = useIsMobile();

  const {
    column,
    listElementType,
    maxVisibleCount,
  } = useParseListElementConfig(listElement);
  const openDQuestShowModal = useOpenDQuestShowModal();

  const handleQuestClick = React.useCallback(
    (id: Moim.Id) => {
      openDQuestShowModal(id);
    },
    [openDQuestShowModal],
  );

  const slicedQuests = React.useMemo(() => quests?.slice(0, maxVisibleCount), [
    quests,
    maxVisibleCount,
  ]);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = slicedQuests?.some(id => id === undefined);
    if (slicedQuests === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web) *
          (listElementType === "horizontal" ? 2 : 1),
      )
        .fill(0)
        .map((_, idx) => (
          <QuestPreviewContainer key={`dquest_group_skeleton_${idx}`}>
            <Skeleton itemStyleConfig={itemStyleConfig} />
          </QuestPreviewContainer>
        ));
    }

    return slicedQuests.map(id => (
      <QuestPreviewContainer key={`dquest_group_${id}`}>
        <DQuestPreview
          questId={id}
          itemStyleConfig={itemStyleConfig}
          onClick={handleQuestClick}
        />
      </QuestPreviewContainer>
    ));
  }, [
    column,
    slicedQuests,
    listElementType,
    handleQuestClick,
    isLoading,
    isMobile,
    itemStyleConfig,
    listElement,
  ]);

  return (
    <ListWrapper>
      {isLoading === false && quests !== undefined && !quests.length ? (
        <BlockitFeedback.Empty textKey="dquest_group_list_preview_empty" />
      ) : (
        <BlockitListLayout
          element={listElement}
          rightArrow={
            listElementType === "horizontal" ? PortalRightArrow : undefined
          }
          leftArrow={
            listElementType === "horizontal" ? PortalLeftArrow : undefined
          }
          arrowPortalTargetId={portalSectionId}
        >
          {itemElements}
        </BlockitListLayout>
      )}
    </ListWrapper>
  );
};

export default React.memo(DQuestGroupItemList);
