import { RAW } from "app/__mocks__";
import {
  DQuestQuestNormalizer,
  DQuestQuestListNormalizer,
} from "../normalizer";

const quest = RAW.QUEST_LIST.data[0];

describe("DQuest normalizer", () => {
  describe("DQuestQuestNormalizer()", () => {
    it("should able normalize", () => {
      const result = DQuestQuestNormalizer(quest);

      expect(result.entities).toHaveProperty("dquest_quests");
      expect(result.result).toEqual(quest.id);
    });
  });

  describe("DQuestQuestListNormalizer()", () => {
    it("should able normalize", () => {
      const result = DQuestQuestListNormalizer(RAW.QUEST_LIST);
      expect(result.entities).toHaveProperty("dquest_quests");
      expect(result.result.data[0]).toEqual(quest.id);
    });
  });
});
