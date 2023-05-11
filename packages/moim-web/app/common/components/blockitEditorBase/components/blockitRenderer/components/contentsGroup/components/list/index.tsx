import * as React from "react";

// component
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import BlockitListLayout from "common/components/blockitListLayout";
import { ListWrapper, ItemContainer } from "../../styled";
import PostItem from "../postCell";
import { PostCellSkeleton } from "../postCell/skeleton";
import { BlockitFeedback } from "../../../feedback";

import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  isLoading: boolean;
  portalSectionId?: string;
  threads: Moim.Forum.IThread[] | undefined;
  listElement: Moim.Blockit.IListStyleElement & {
    maxDisplayedItemsCount: number;
  };
  listShowConfig: Moim.Blockit.IPostListShowConfig;
}

const ContentsGroupItemList: React.FC<IProps> = ({
  isLoading,
  portalSectionId,
  threads,
  listElement,
  listShowConfig,
}) => {
  const isMobile = useIsMobile();

  const {
    column,
    listElementType,
    maxVisibleCount,
  } = useParseListElementConfig(listElement);

  const slicedThreads = React.useMemo(
    () => threads?.slice(0, maxVisibleCount),
    [threads, maxVisibleCount],
  );
  const itemElements = React.useMemo(() => {
    const isUndefinedArray = slicedThreads?.some(
      thread => thread?.id === undefined,
    );
    if (slicedThreads === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web) *
          (listElementType === "horizontal" ? 2 : 1),
      )
        .fill(0)
        .map((_, idx) => (
          <ItemContainer key={`contents_group_skeleton_${idx}`}>
            <PostCellSkeleton
              showThumbnail={listShowConfig.showThumbnail}
              thumbnailConfig={listShowConfig.thumbnailConfig}
            />
          </ItemContainer>
        ));
    }

    return slicedThreads.map(thread => {
      return (
        <ItemContainer key={`contents_group_${thread.id}`}>
          <PostItem thread={thread} config={listShowConfig} />
        </ItemContainer>
      );
    });
  }, [
    column,
    slicedThreads,
    listElementType,
    isLoading,
    isMobile,
    listElement.rowCount_web,
    listElement.rowCount,
    listShowConfig,
  ]);

  return (
    <ListWrapper>
      {isLoading === false && threads !== undefined && !threads.length ? (
        <BlockitFeedback.Empty textKey="content_group_list_preview_empty" />
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

export default React.memo(ContentsGroupItemList);
