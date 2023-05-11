// vendor
import { CancelToken } from "axios";
// api
import { MoimBaseAPI } from "common/api/base";
// helper
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

class CategoryAPI extends MoimBaseAPI {
  public async getCategories(
    _request: Moim.Category.IGetCategoriesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Category.IGetPositionsResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.CATEGORY],
      paging: {},
    };
  }
}

export default CategoryAPI;
