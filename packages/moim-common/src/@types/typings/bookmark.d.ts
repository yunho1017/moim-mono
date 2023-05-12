declare namespace Moim {
  declare namespace Bookmark {
    interface INormalizedBookmark {
      userId: Id;
      resourceId: Id;
      groupId: Id;
      channelId: Id;
      parentGroupId: Id;
      createdAt: number;
      updatedAt: number;
      sortKey: string;
    }

    interface IBookmark extends INormalizedBookmark {
      id: Id;
      user: User.IUser;
      resource: Forum.IDenormalizedThread;
      group: Group.IGroup;
      channel: Channel.IForumSimpleChannel;
    }

    type INormalizedData = INormalizedEntities<INormalizedBookmark>;

    // Get: /api/me/bookmarks
    interface IGetBookmarksRequestPath {
      userId: Moim.Id;
    }

    interface IGetBookmarksRequestParams extends IPaging {
      limit?: number;
      filter?: {
        groupId?: Id;
        channelId?: Id;
      };
    }
    type IGetBookmarksRequest = IGetBookmarksRequestPath &
      IGetBookmarksRequestParams;

    type IGetBookmarksResponseBody = IPaginatedListResponse<
      INormalizedBookmark
    >;

    // Post: /api/forums/:forum_id/threads/:thread_id/bookmarks
    interface IPostBookmarkRequestPath {
      forumId: Id;
      threadId: Id;
    }

    type IPostBookmarkRequest = IPostBookmarkRequestPath;

    type IPostBookmarkResponseBody = ISingleItemResponse<INormalizedBookmark>;

    // Delete: /api/forums/:forum_id/threads/:thread_id/bookmarks
    interface IDeleteBookmarkRequestPath {
      forumId: Id;
      threadId: Id;
    }

    type IDeleteBookmarkRequest = IDeleteBookmarkRequestPath;

    type IDeleteBookmarkResponseBody = ISingleItemResponse<INormalizedBookmark>;
  }
}
