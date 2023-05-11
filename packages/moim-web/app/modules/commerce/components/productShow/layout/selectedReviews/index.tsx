import * as React from "react";

import ContentGroupPreview from "common/components/blockitEditorBase/components/blockitRenderer/components/contentsGroup/preview";

interface IProps {
  title: string;
  description?: string;
  queries: Moim.ContentsGroup.IQuery;
  block: Moim.Component.ProductShow.ISelectedReview;
}

const LIST_ELEMENT: Moim.Blockit.IListStyleElement & {
  maxDisplayedItemsCount: number;
} = {
  columnCount: 2,
  columnCount_web: 5,
  rowCount: 1,
  rowCount_web: 1,
  maxDisplayedItemsCount: 40,
  maxDisplayedItemsCount_web: 40,
  scrollDirection: "horizontal",
  scrollDirection_web: "horizontal",
  itemStackDirection: "vertical",
  itemStackDirection_web: "horizontal",
};

const SHOW_CONFIG: Moim.Blockit.IPostListShowConfig = {
  thumbnailConfig: {
    position: "top",
    type: "ratio",
    value: "4:3",
  },
  reactionType: "up",
  showAuthorAvatar: false,
  showTitle: false,
  textAlignment: "LEFT",
  showThumbnail: true,
  showText: true,
  showDate: true,
  showReaction: true,
  showAuthor: true,
  showCommentCount: true,
  viewType: "post",
  viewType_web: "post",
};

const SelectedReviews: React.FC<IProps> = ({ title, description, queries }) => {
  return (
    <ContentGroupPreview
      header={{
        title,
        description,
        showTitle: true,
        showDescription: true,
        showMoreButton: false,
        titleElement: { subType: "h3", content: title },
      }}
      listElement={LIST_ELEMENT}
      listShowConfig={SHOW_CONFIG}
      query={queries}
    />
  );
};

export default React.memo(SelectedReviews);
