import { schema } from "normalizr";
import { userEntity } from "../user";
import { threadEntity } from "../thread";
import { groupEntity } from "../group";
import { channelEntity } from "../channel";

export const bookmarkDefinition = {
  user: userEntity,
  resource: threadEntity,
  group: groupEntity,
  channel: channelEntity,
};

export const bookmarkEntity = new schema.Entity<
  Moim.Bookmark.INormalizedBookmark
>("bookmarks", bookmarkDefinition, {
  processStrategy(value) {
    return {
      ...value,
      id: `${value.userId}_${value.resourceId}`,
      user: value.userId,
      resource: value.resourceId,
      group: value.groupId,
      channel: value.channelId,
    };
  },
  idAttribute: value => `${value.userId}_${value.resourceId}`,
});

export const bookmarkSingleItemEntity = new schema.Object<
  Moim.Bookmark.INormalizedBookmark
>({
  data: bookmarkEntity,
});

export const bookmarkListEntity = new schema.Object<
  Moim.Bookmark.INormalizedBookmark
>({
  data: new schema.Array(bookmarkEntity),
});
