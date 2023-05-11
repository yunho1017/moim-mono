import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class GroupAPI {
  public async boot(): Promise<
    Moim.ISingleItemResponse<Moim.Group.IBootstrap>
  > {
    return Promise.resolve(RAW.GROUP_BOOTSTRAP);
  }

  public async getGroupData(): Promise<
    Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>
  > {
    return {
      data: RAW.NORMALIZED_GROUP,
    };
  }

  public async validateGroup(
    _group: any,
    cancelToken: CancelToken,
  ): Promise<Moim.Group.IValidateGroupResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({ data: { success: true } });
  }

  public async createGroup(
    _group: Moim.Group.ICreateGroupRequestBody,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.ICreateGroupResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({
      data: {
        group: RAW.NORMALIZED_GROUP,
        account: RAW.NORMALIZED_MEMBER,
      },
    });
  }

  public async putGroupIcon(
    _request: Moim.Group.IUpdateGroupIconRequest,
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return { data: RAW.GROUP };
  }

  public async changeIconSize(
    _data: { id: string; top: number; left: number; size: number },
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({ data: "I1234" });
  }

  public async getCryptobadgeClient(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.IClientIdResponse>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({
      data: {
        client_id: "MOCK_CLIENT_ID",
        redirect_uri: "MOCK_REDIRECT_URI",
      },
    });
  }

  public async renameMoim(
    _data: { id: Moim.Id; name: string },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_GROUP,
    };
  }

  public async setMoimDescription(
    _data: { id: Moim.Id; description: string },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_GROUP,
    };
  }

  public async getGroupTheme(
    _request: Moim.Group.IGetGroupThemeRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IGetGroupThemeResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.GROUP_THEME,
    };
  }

  public async updateGroupTheme(
    _request: Moim.Group.IUpdateGroupThemeRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateGroupThemeResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.GROUP_THEME,
    };
  }

  public async createGroupThemeLogoUploadSession(
    _request: Moim.Group.ICreateGroupThemeLogoUploadSessionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.ICreateGroupThemeLogoUploadSessionResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.FILE_UPLOAD_QUEUE;
  }

  public async updateGroupThemeLogo(
    _request: Moim.Group.IUpdateGroupThemeLogoRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IUpdateGroupThemeLogoResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return { data: RAW.GROUP_THEME };
  }

  public async getMoimCover(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.IMoimCover>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.MOIM_COVER,
    };
  }

  public async getJoinedSubMoims(
    _paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Group.INormalizedGroup>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_GROUP],
      paging: {},
    };
  }

  public async createTagSet(
    _parameter: {
      set: string;
      value?: string;
      parentId?: Moim.Id;
      target?: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.TagSet.ITagSet | Moim.TagSet.ITagItem>
  > {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        ...RAW.TAG_SET.data[0],
        items: undefined,
      },
    };
  }

  public async deleteTagSet(
    _tagSetId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      success: true,
    };
  }

  public async putTagSet(
    _tagSetId: Moim.Id,
    _parameter: {
      set: string;
      value?: string;
      parentId?: Moim.Id;
      target?: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.TagSet.ITagSet | Moim.TagSet.ITagItem>
  > {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        ...RAW.TAG_SET.data[0],
        items: undefined,
      },
    };
  }

  public async getTagSet(
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.TagSet.ITagSet>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.TAG_SET;
  }

  public async getFamilyMoim(
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Group.INormalizedGroup[]>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_GROUP],
    };
  }

  public async batchGroup(
    _request: { groups: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.Group.IGroupBatchResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_GROUP],
      paging: {},
    };
  }

  public async getInstalledPlugins(): Promise<
    Moim.IPaginatedListResponse<Moim.Plugin.IPlugin>
  > {
    return RAW.GROUP_PLUGINS;
  }

  public async getChildMoimGroup(
    _: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<Moim.ChildMoimGroup.IChildMoimGroupData>
  > {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.CHILD_MOIM_GROUP_DATA;
  }

  public async getChildMoimGroupMoims(
    _: Moim.Id,
    _2: number = 30,
    cancelToken?: CancelToken,
    _3?: { from?: string; after?: string },
    _4?: string,
    _5?: "asc" | "desc",
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.CHILD_MOIM_GROUP_MOIMS;
  }
}
