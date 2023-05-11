import { Thread } from "app/typings";
import { memoize } from "lodash";
import { css } from "styled-components";

export function getFlexAlignStyle(
  type?: Moim.Forum.ForumListConfigTextAlignment,
  reverse?: boolean,
) {
  switch (type) {
    case "LEFT":
      return css`
        justify-content: flex-start;
      `;
    case "CENTER":
      return css`
        justify-content: center;
      `;
    case "RIGHT":
      if (reverse) {
        return css`
          flex-direction: row-reverse;
        `;
      }
      return css`
        justify-content: flex-end;
      `;
  }
}

export function getTextAlignStyle(
  type?: Moim.Forum.ForumListConfigTextAlignment,
) {
  switch (type) {
    case "LEFT":
      return css`
        text-align: left;
      `;
    case "CENTER":
      return css`
        text-align: center;
      `;
    case "RIGHT":
      return css`
        text-align: right;
      `;
  }
}

export const forumConfig2ItemConfig = memoize(
  (config?: Moim.Forum.IForumListConfig): Partial<Thread.IThreadItemConfig> => {
    return config
      ? {
          showAuthor: config.show_author,
          showAuthorAvatar: config.show_author_avatar,
          showCommentCount: config.show_comment_count,
          showDate: config.show_date,
          showReaction: config.show_reaction,
          reactionType: config.reaction_type,
          showThumbnail: config.show_thumbnail,
          showTitle: config.show_title,
          showText: config.show_text,
          textAlignment: config.text_alignment,
          thumbnailConfig: config.thumbnail_config,
          tagSets: config.tag_sets,
          tagSetFilterType: config.tag_set_filter_type,
          viewType: config.view_type,
          viewType_web: config.view_type,
        }
      : {};
  },
);
