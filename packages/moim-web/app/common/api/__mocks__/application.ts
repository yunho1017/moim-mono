import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

class ApplicationAPI {
  public async getReplaceReferenceBlock(params: {
    botId: Moim.Id;
    actionUrl: string;
    data: { blockId: Moim.Id; params: { [key: string]: string } }[];
    cancelToken?: CancelToken;
  }): Promise<Moim.IListResponse<Moim.Blockit.IBlockActionResponse>> {
    const cancelToken = params.cancelToken;
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.REPLACE_BLOCK_1;
  }

  public async doActionTrigger(params: {
    botId: Moim.Id;
    actionUrl: string;
    data: { params: { [key: string]: string } };
    cancelToken?: CancelToken;
  }): Promise<Moim.IListResponse<Moim.Blockit.IBlockActionResponse>> {
    const cancelToken = params.cancelToken;
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [
        {
          actionType: "replace",
          actionData: [
            {
              blockId: "testBlockId",
              botId: params.botId,
              blocks: [
                { type: "text", subType: "h1", content: "Text changed!" },
              ],
            },
          ],
        },
      ],
    };
  }
}

export default ApplicationAPI;
