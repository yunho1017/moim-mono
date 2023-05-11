import { schema } from "normalizr";

export const DQuestHistoryDefinition = {};

export const DQuestHistoryEntity = new schema.Entity(
  "dquest_histories",
  DQuestHistoryDefinition,
  {
    idAttribute: "questId",
  },
);

export const DQuestHistoryListEntity = new schema.Object<Moim.DQuest.IHistory>({
  data: new schema.Array(DQuestHistoryEntity),
});

export const DQuestQuestDefinition = {
  history: DQuestHistoryEntity,
};

export const DQuestQuestEntity = new schema.Entity<
  Moim.DQuest.INormalizedQuest
>("dquest_quests", DQuestQuestDefinition);

export const DQuestQuestListEntity = new schema.Object<
  Moim.IPaginatedListResponse<Moim.DQuest.INormalizedQuest>
>({
  data: new schema.Array(DQuestQuestEntity),
});
