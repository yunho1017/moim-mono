import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class CampaignAPI {
  public async batchHistories(_: Moim.Id[]) {
    return { data: [], paging: {} };
  }

  public async fetchQuests(cancelToken?: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.QUEST_LIST;
  }

  public async fetchQuestHistory(_: Moim.Id, cancelToken?: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return;
  }

  public async fetchQuest(_: Moim.Id, cancelToken?: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return;
  }

  public async fetchQuestAction(_: Moim.Id, cancelToken?: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return;
  }
}
