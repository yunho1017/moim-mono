import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class DraftAPI extends MoimBaseAPI {
  public async saveDraft(params: {
    channelId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    title?: string;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    if (params.channelId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: RAW.THREAD,
    };
  }

  public async updateDraft(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    title?: string;
    cancelToken: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    return {
      data: RAW.THREAD,
    };
  }

  public async deleteDraft(_: {
    channelId: Moim.Id;
    threadId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    return {
      data: {
        success: true,
      },
    };
  }

  public async getDraftList(params: {
    cancelToken: CancelToken;
  }): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }
    return {
      data: [RAW.THREAD],
      paging: {},
    };
  }

  public async deleteAllDraft(): Promise<
    Moim.ISingleItemResponse<Moim.ISuccessResponse>
  > {
    return {
      data: {
        success: true,
      },
    };
  }

  public async getDraftData(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }
    return {
      data: RAW.THREAD,
    };
  }

  public async getAllDraftCount(): Promise<
    Moim.ISingleItemResponse<{ draft_amount: number }>
  > {
    return {
      data: {
        draft_amount: 8,
      },
    };
  }
}
