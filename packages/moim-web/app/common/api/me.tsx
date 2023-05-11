import { MoimBaseAPI } from "common/api/base";
import { CancelToken } from "axios";

export default class MeAPI extends MoimBaseAPI {
  public async updateProfile(
    profile: Moim.User.IUpdatableInfo,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.User.IUser>> {
    return (await this.put("/me", { profile }, { cancelToken })).data;
  }
  public async getProfile(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.User.IOriginalUserDatum>> {
    return (await this.get("/me", undefined, { cancelToken })).data;
  }

  public async getAvatarUploadSession(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Upload.IQueueInfo>> {
    return (await this.post("/users/avatar", { cancelToken })).data;
  }

  public async updateAvatarCrop(
    data: { id: string; extract: { top: number; left: number; size: number } },
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IValidateGroupResponse> {
    const { id, extract } = data;
    return (
      await this.put(
        `/users/avatar/${id}`,
        {
          extract,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getAvatarPreview(
    id: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.IGroupImagePreview>> {
    return (
      await this.post(`/groups/icon/${id}/preview`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getJoinedGroups(
    provider?: string,
    authentication?: Moim.IAuthentication, // NOTE: temporary optional. for check submoim's joined status check.
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.INormalizedGroupWithUser>> {
    return (
      await this.get(
        "/me/groups",
        {
          provider,
          token: authentication?.token,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getNotifications(
    request: Moim.Notification.IGetNotificationsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Notification.IGetNotificationsResponseBody> {
    return (
      await this.get(`/me/notifications/all`, { ...request }, { cancelToken })
    ).data;
  }

  public async leave() {
    return (await this.delete("/me")).data;
  }

  public async getBookmarks(
    request: Moim.Bookmark.IGetBookmarksRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IGetBookmarksResponseBody> {
    const { userId, ...params } = request;
    return (
      await this.post(
        `/users/${userId}/bookmarks`,
        { bookmark: params },
        { cancelToken },
      )
    ).data;
  }

  public async postBookmark(
    request: Moim.Bookmark.IPostBookmarkRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IPostBookmarkResponseBody> {
    const { forumId, threadId } = request;
    return (
      await this.post(
        `/forums/${forumId}/threads/${threadId}/bookmarks`,
        null,
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async deleteBookmark(
    request: Moim.Bookmark.IDeleteBookmarkRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IDeleteBookmarkResponseBody> {
    const { forumId, threadId } = request;
    return (
      await this.delete(
        `/forums/${forumId}/threads/${threadId}/bookmarks`,
        null,
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async getSearchHistories(
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.User.ISearchHistory>> {
    return (await this.get("/me/search_histories", {}, { cancelToken })).data;
  }

  public async deleteSearchHistories(
    payload: { isDeleteAll?: boolean; query?: string },
    cancelToken?: CancelToken,
  ): Promise<Moim.Bookmark.IDeleteBookmarkResponseBody> {
    return (
      await this.delete("/me/search_histories", payload, {
        cancelToken,
      })
    ).data;
  }
}
