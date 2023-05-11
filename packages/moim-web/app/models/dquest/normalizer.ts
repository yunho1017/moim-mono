import { normalize } from "normalizr";
import {
  DQuestHistoryEntity,
  DQuestHistoryListEntity,
  DQuestQuestEntity,
  DQuestQuestListEntity,
} from "./entity";

export const DQuestHistoryNormalizer = (payload: Moim.DQuest.IHistory) =>
  normalize<Moim.DQuest.IHistory, Moim.Entity.INormalizedData, Moim.Id>(
    payload,
    DQuestHistoryEntity,
  );

export const DQuestHistoryListNormalizer = (
  payload: Moim.IPaginatedListResponse<Moim.DQuest.IHistory>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.DQuest.IHistory>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(payload, DQuestHistoryListEntity);

export const DQuestQuestNormalizer = (payload: Moim.DQuest.IQuest) =>
  normalize<Moim.DQuest.IQuest, Moim.Entity.INormalizedData, Moim.Id>(
    payload,
    DQuestQuestEntity,
  );

export const DQuestQuestListNormalizer = (
  payload: Moim.IPaginatedListResponse<Moim.DQuest.IQuest>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.DQuest.IQuest>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(payload, DQuestQuestListEntity);
