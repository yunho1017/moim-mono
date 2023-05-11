import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class MeAPI {
  public async updateProfile(
    data: Moim.User.IUpdatableInfo,
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        ...RAW.GROUP_WITH_USER.user,
        ...data,
      },
    };
  }
  public async getJoinedGroups(
    _authentication: Moim.IAuthentication,
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.MY_JOINED_GROUPS;
  }

  public async leave() {
    return {};
  }

  public async getBookmarks(
    _request: Moim.Bookmark.IGetBookmarksRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IGetBookmarksResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_BOOKMARK.data],
      paging: {},
    };
  }

  public async postBookmark(
    _request: Moim.Bookmark.IPostBookmarkRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IPostBookmarkResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.NORMALIZED_BOOKMARK;
  }

  public async deleteBookmark(
    _request: Moim.Bookmark.IDeleteBookmarkRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IDeleteBookmarkResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.NORMALIZED_BOOKMARK;
  }
}
