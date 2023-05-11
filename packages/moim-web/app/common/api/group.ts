import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class GroupAPI extends MoimBaseAPI {
  // NOTE: Call this function as standalone. not inside of apiSelector
  public async getGroupId(): Promise<
    Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>
  > {
    return (await this.get("/groups/_self", undefined, { withoutToken: true }))
      .data;
  }

  public async boot(): Promise<
    Moim.ISingleItemResponse<Moim.Group.IBootstrap>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(`/groups/${groupId}/boot`, undefined, {
        passthrough: true,
      })
    ).data;
  }

  public async getGroupData(
    groupId: Moim.Id,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    return (await this.get(`/groups/${groupId}`)).data;
  }

  public async getCurrentGroup(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    return (await this.get("/groups", null, { cancelToken })).data;
  }

  public async validateGroup(
    group: {
      domain: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IValidateGroupResponse> {
    return (
      await this.post(
        "/groups/validate",
        {
          group,
        },
        { cancelToken },
      )
    ).data;
  }

  public async createGroup(
    group: Moim.Group.ICreateGroupRequestBody,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.ICreateGroupResponseBody> {
    return (
      await this.post("/groups", { group }, { cancelToken, withoutToken: true })
    ).data;
  }

  public async getGroupIconUploadQueue(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Upload.IQueueInfo>> {
    return (await this.post("/groups/icon", null, { cancelToken })).data;
  }

  public async putGroupIcon(
    request: Moim.Group.IUpdateGroupIconRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    const { groupId, group } = request;

    return (
      await this.put(
        `/groups/${groupId}/icon`,
        {
          group,
        },
        { cancelToken },
      )
    ).data;
  }

  public async putGroupBanner(
    request: Moim.Group.IUpdateGroupBannerRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateGroupBannerResponse> {
    const { groupId, group } = request;

    return (
      await this.put(
        `/groups/${groupId}/banner`,
        {
          group,
        },
        { cancelToken },
      )
    ).data;
  }

  public async changeIconSize(
    data: { id: string; extract: { top: number; left: number; size: number } },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Id>> {
    const { id, extract } = data;
    return (
      await this.put(
        `/groups/icon/${id}`,
        {
          extract,
        },
        { cancelToken },
      )
    ).data;
  }

  // TODO icon size api와 통합
  public async changeBannerSize(
    data: {
      id: string;
      extract: { top: number; left: number; width: number; height: number };
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Id>> {
    const { id, extract } = data;
    return (
      await this.put(
        `/groups/banner/${id}`,
        {
          extract,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getGroupIconPreview(
    id: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.IGroupImagePreview>> {
    return (
      await this.post(`/groups/icon/${id}/preview`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getCryptobadgeClient(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.IClientIdResponse>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/cryptobadge_client`, null, {
        cancelToken,
        passthrough: true,
      })
    ).data;
  }

  public async getSubMoims(
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.INormalizedGroup>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/subgroups`,
        { ...paging },
        { cancelToken },
      )
    ).data;
  }

  public async getJoinedSubMoims(
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
    authentication?: Moim.IAuthentication,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.INormalizedGroup>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/joined`,
        { ...paging, authentication },
        { cancelToken },
      )
    ).data;
  }

  public async getJoinedSubMoimsWithCanToken(
    authentication: Moim.IAuthentication,
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.INormalizedGroup>> {
    return (
      await this.post(
        `/auth/joined`,
        { ...paging, authentication },
        { cancelToken },
      )
    ).data;
  }

  public async renameMoim(
    data: { id: Moim.Id; name: string },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    const { id, name } = data;

    return (
      await this.put(`/groups/${id}/name`, { group: { name } }, { cancelToken })
    ).data;
  }

  public async setMoimDescription(
    data: { id: Moim.Id; description: string | null },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    const { id, description } = data;

    return (
      await this.put(
        `/groups/${id}/description`,
        { group: { description } },
        { cancelToken },
      )
    ).data;
  }

  public async getGroupTheme(
    request: Moim.Group.IGetGroupThemeRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IGetGroupThemeResponse> {
    const { groupId } = request;

    return (
      await this.get(`/v2/groups/${groupId}/theme`, undefined, {
        cancelToken,
        passthrough: true,
      })
    ).data;
  }

  public async updateGroupTheme(
    request: Moim.Group.IUpdateGroupThemeRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateGroupThemeResponse> {
    const { groupId, theme } = request;

    return (
      await this.put(`/groups/${groupId}/theme`, { theme }, { cancelToken })
    ).data;
  }

  public async createGroupThemeLogoUploadSession(
    request: Moim.Group.ICreateGroupThemeLogoUploadSessionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.ICreateGroupThemeLogoUploadSessionResponse> {
    const { groupId } = request;

    return (
      await this.post(`/groups/${groupId}/theme/logo`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async updateGroupThemeLogo(
    request: Moim.Group.IUpdateGroupThemeLogoRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateGroupThemeLogoResponse> {
    const { groupId, theme } = request;

    return (
      await this.put(
        `/groups/${groupId}/theme/logo`,
        { theme },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async createSubGroup(
    request: Moim.Group.ICreateSubGroupRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.ICreateSubGroupResponse> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(`/groups/${groupId}/subgroups`, request, {
        cancelToken,
      })
    ).data;
  }

  public async getMoimCover(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.IMoimCover>> {
    const groupId = this.getCurrentGroupId();
    return (await this.get(`/groups/${groupId}/cover`, {}, { cancelToken }))
      .data;
  }

  public async createTagSet(
    parameter: {
      set: string;
      value?: string;
      parentId?: Moim.Id;
      target?: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.TagSet.ITagSet | Moim.TagSet.ITagItem>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/tag_sets`,
        {
          tagSet: parameter,
        },
        { cancelToken },
      )
    ).data;
  }

  public async deleteTagSet(
    tagSetId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.delete(
        `/groups/${groupId}/tag_sets/${tagSetId}`,
        {},
        { cancelToken },
      )
    ).data;
  }

  public async putTagSet(
    tagSetId: Moim.Id,
    parameter: {
      set: string;
      value?: string;
      parentId?: Moim.Id;
      target?: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.TagSet.ITagSet | Moim.TagSet.ITagItem>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.put(
        `/groups/${groupId}/tag_sets/${tagSetId}`,
        {
          tagSet: parameter,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getTagSet(
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.TagSet.ITagSet>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/tag_sets`, undefined, {
        cancelToken,
        passthrough: true,
      })
    ).data;
  }

  public async updateHomeChannel(
    request: Moim.Group.IUpdateHomeChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateHomeChannelResponse> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.put(`/groups/${groupId}/default_channel`, request, {
        cancelToken,
      })
    ).data;
  }

  public async getSearchMoims(
    params: Moim.Group.IGetSearchMoimsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPlainPagingListResponse<Moim.Group.ISearchedMoimBody>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        "/search/groups",
        {
          query: {
            groupId,
            limit: 30,
            ...params,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getRecommendMoims(
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.IRecommendGroupSection>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/recommended_groups`,
        { ...paging },
        { cancelToken },
      )
    ).data;
  }

  public async getFamilyMoim(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup[]>> {
    const groupId = this.getCurrentGroupId();
    return (await this.get(`/groups/${groupId}/family`, {}, { cancelToken }))
      .data;
  }

  public async batchGroup(
    request: { groups: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IGroupBatchResponseBody> {
    return (
      await this.post(
        "/groups/_batch",
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getInstalledPlugins(
    paging?: Moim.IPaging,
  ): Promise<Moim.IPaginatedListResponse<Moim.Plugin.IPlugin>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/bots`, undefined, {
        params: {
          ...paging,
        },
      })
    ).data;
  }

  public async getChildMoimGroup(
    id: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.ChildMoimGroup.IChildMoimGroupData>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/child_moim_groups/${id}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async getChildMoimGroupMoims(
    id: Moim.Id,
    limit: number = 30,
    cancelToken?: CancelToken,
    paging?: { from?: string; after?: string },
    sort?: string,
    desc?: "asc" | "desc",
  ): Promise<
    Moim.IPaginatedListResponse<Moim.ChildMoimGroup.IChildMoimGroupMoimRawDatum>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/child_moim_groups/${id}/groups`,
        {
          query: {
            limit,
            ...paging,
            sort,
            desc,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async clickPopupBanner(
    bannerId: string,
    contentId: string,
    cancelToken?: CancelToken,
  ) {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/popup_banners/${bannerId}/click`,
        {
          contentId,
        },
        { cancelToken },
      )
    ).data;
  }
}
