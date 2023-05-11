import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";
import buffer from "common/helpers/buffer";
import shortid from "shortid";

export interface IReplaceAPIData {
  blockId: Moim.Id;
  replaceId: Moim.Id;
  params: { [key: string]: string };
}
export interface IReplaceAPIParams {
  botId: Moim.Id;
  data: IReplaceAPIData[];
  cancelToken?: CancelToken;
  isReplaceHome?: boolean;
}

export interface IActionAPIData {
  actionId: Moim.Id;
  blockId?: Moim.Id;
  params?: { [key: string]: any };
}

export interface IActionAPIParams {
  botId: Moim.Id;
  data: IActionAPIData;
  cancelToken?: CancelToken;
}

export interface IProxyAPIParams {
  botId: Moim.Id;
  url: string;
  params?: { [key: string]: any };
  cancelToken?: CancelToken;
}

export default class ApplicationAPI extends MoimBaseAPI {
  private bufferedGetReplaceReferenceBlock = buffer({
    ms: 300,
    subscribedFn: async (params: IReplaceAPIParams[]) => {
      const bufferId = shortid.generate();
      // botId 별로 정리
      const paramsByBotId: {
        [key: string]: IReplaceAPIParams;
      } = {};
      params.forEach(param => {
        const hash = paramsByBotId[param.botId];
        if (hash) {
          hash.data = hash.data
            .concat(param.data)
            .reduce((accArr, currParam) => {
              if (!accArr.find(item => item.blockId === currParam.blockId)) {
                accArr.push(currParam);
              }
              return accArr;
            }, [] as IReplaceAPIData[]);
        } else {
          paramsByBotId[param.botId] = param;
        }
      });

      const apiResponse = await Promise.all<
        Moim.IListResponse<Moim.Blockit.IBlockActionResponse>
      >(
        Object.keys(paramsByBotId).map(async key => {
          const param = paramsByBotId[key];
          return (
            await this.post(
              `/applications/bots/${param.botId}/replace`,
              {
                replace: {
                  data: param.data,
                },
              },
              { cancelToken: param.cancelToken },
            )
          ).data;
        }),
      );

      const result = apiResponse.reduce(
        (accResult, currResult) => accResult.concat(currResult.data),
        [] as Moim.Blockit.IBlockActionResponse[],
      );

      return {
        data: result,
        bufferId,
      };
    },
  });

  private bufferedGetReplaceHomeReferenceBlock = buffer({
    ms: 300,
    subscribedFn: async (params: IReplaceAPIParams[]) => {
      const bufferId = shortid.generate();
      // botId 별로 정리
      const paramsByBotId: {
        [key: string]: IReplaceAPIParams;
      } = {};
      params.forEach(param => {
        const hash = paramsByBotId[param.botId];
        if (hash) {
          hash.data = hash.data
            .concat(param.data)
            .reduce((accArr, currParam) => {
              if (!accArr.find(item => item.blockId === currParam.blockId)) {
                accArr.push(currParam);
              }
              return accArr;
            }, [] as IReplaceAPIData[]);
        } else {
          paramsByBotId[param.botId] = param;
        }
      });

      const apiResponse = await Promise.all<
        Moim.IListResponse<Moim.Blockit.IBlockActionResponse>
      >(
        Object.keys(paramsByBotId).map(async key => {
          const param = paramsByBotId[key];
          return (
            await this.get(
              `/applications/bots/${param.botId}/home`,
              undefined,
              { cancelToken: param.cancelToken },
            )
          ).data;
        }),
      );

      const result = apiResponse.reduce(
        (accResult, currResult) => accResult.concat(currResult.data),
        [] as Moim.Blockit.IBlockActionResponse[],
      );

      return {
        data: result,
        bufferId,
      };
    },
  });

  public async getReplaceReferenceBlock(
    params: IReplaceAPIParams,
  ): Promise<
    Moim.IListResponse<Moim.Blockit.IBlockActionResponse> & {
      bufferId: Moim.Id;
    }
  > {
    const res = await this.bufferedGetReplaceReferenceBlock(params);
    return res;
  }

  public async getReplaceHomeReferenceBlock(
    params: IReplaceAPIParams,
  ): Promise<
    Moim.IListResponse<Moim.Blockit.IBlockActionResponse> & {
      bufferId: Moim.Id;
    }
  > {
    const res = await this.bufferedGetReplaceHomeReferenceBlock(params);
    return res;
  }

  public async doActionTrigger(
    params: IActionAPIParams,
  ): Promise<Moim.IListResponse<Moim.Blockit.IBlockActionResponse>> {
    return (
      await this.post(
        `/applications/bots/${params.botId}/action`,
        {
          action: {
            data: params.data,
          },
        },
        { cancelToken: params.cancelToken },
      )
    ).data;
  }

  public async getProxyData(params: IProxyAPIParams): Promise<any> {
    return (
      await this.post(
        `/applications/bots/${params.botId}/proxy`,
        {
          proxy: {
            url: params.url,
            params: params.params,
          },
        },
        { cancelToken: params.cancelToken },
      )
    ).data;
  }
}
