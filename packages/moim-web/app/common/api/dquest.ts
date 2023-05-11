import { CancelToken } from "axios";
import {
  DQUEST_SERVICE_ID_STAGE,
  DQUEST_SERVICE_ID_PROD,
} from "common/constants/keys";

import { MoimCommunityAPI } from "./base/community";
import * as EnvChecker from "common/helpers/envChecker";

export default class ApplicationAPI extends MoimCommunityAPI {
  public async batchHistories(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IHistory>> {
    return (await this.post(`/dquest/quests/histories/_batch`, { ids })).data;
  }

  public async batchQuests(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IQuest>> {
    return (await this.post(`/dquest/quests/_batch`, { ids })).data;
  }

  public async fetchQuests(
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IQuest>> {
    return (
      await this.get(
        `/dquest/quests`,
        {
          ...paging,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async fetchQuestHistory(
    questId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.DQuest.IHistory> {
    return (
      await this.get(`/dquest/quests/${questId}/history`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async fetchQuest(
    questId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.DQuest.IQuest> {
    return (
      await this.get(`/dquest/quests/${questId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async fetchQuestAction(
    questId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.DQuest.IQuestActionResponse> {
    return (
      await this.get(`/dquest/quests/${questId}/action`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async fetchQuestGroup(
    id: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.DQuest.IQuestGroup> {
    return (
      await this.get(`/dquest/quest_groups/${id}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async fetchQuestGroupQuests(
    id: Moim.Id,
    payload: {
      limit?: number;
    },
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IQuest>> {
    return (
      await this.get(
        `/dquest/quest_groups/${id}/quests`,
        {
          ...payload,
          ...paging,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async fetchQuestSearchForCryptoBadge(
    badgeId: Moim.Id,
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IQuest>> {
    return (
      await this.post("/dquest/quests/search", {
        outcomes: EnvChecker.isProd()
          ? [
              {
                property: `badgeId:${badgeId}`,
                serviceId: DQUEST_SERVICE_ID_PROD,
                type: "claim-badge",
              },
            ]
          : [
              {
                property: `badgeId:${badgeId}`,
                serviceId: DQUEST_SERVICE_ID_STAGE,
                type: "claim-badge",
              },
              {
                property: `badgeId:${badgeId}`,
                serviceId: DQUEST_SERVICE_ID_PROD,
                type: "claim-badge",
              },
            ],
      })
    ).data;
  }

  public async fetchUserHistories(
    payload: Moim.DQuest.IFetchHistoriesRequestPayload,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IHistory>> {
    const { userId, status, ...rest } = payload;
    return (
      await this.post(
        "/dquest/quests/history/search",
        {
          userId: [userId],
          status: [status],
          ...rest,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async postQuestView(
    questId: Moim.Id,
  ): Promise<Moim.IPaginatedListResponse<Moim.DQuest.IHistory>> {
    return (await this.post(`/dquest/quests/${questId}/view`)).data;
  }

  public async questJoin(
    questId: Moim.Id,
  ): Promise<Moim.DQuest.IQuestJoinResponse> {
    return (await this.post(`/dquest/quests/${questId}/join`)).data;
  }

  public async questMissionAction(
    questId: Moim.Id,
    missionId: Moim.Id,
    payload?: Record<string, any>,
  ): Promise<Moim.DQuest.IQuestActionResponse> {
    return (
      await this.post(
        `/dquest/quests/${questId}/missions/${missionId}/action`,
        {
          payload: {
            ...payload,
          },
        },
      )
    ).data;
  }

  public async questAchieve(
    questId: Moim.Id,
  ): Promise<Moim.DQuest.IQuestActionResponse> {
    return (await this.post(`/dquest/quests/${questId}/complete`)).data;
  }
}
