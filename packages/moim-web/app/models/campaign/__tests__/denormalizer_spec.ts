import { RAW, NORMALIZED } from "app/__mocks__";
import {
  campaignDenormalizer,
  campaignExecutionDenormalizer,
  executionVoteDenormalizer,
} from "../denormalizer";

const MOCK_ENTITIES = {
  ...NORMALIZED.COMMERCE.campaigns.entities,
  ...NORMALIZED.COMMERCE.campaignExecutions.entities,
  ...NORMALIZED.COMMERCE.executionVotes.entities,
};

describe("Campaign Denormalizer", () => {
  describe("campaignDenormalizer", () => {
    it("should get campaign with third data", () => {
      const result = campaignDenormalizer(
        RAW.COMMERCE.campaigns.data[0].id,
        MOCK_ENTITIES,
      );

      expect(result!.id).toEqual(RAW.COMMERCE.campaigns.data[0].id);
      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.campaigns.data[0]),
        "products",
        "executions",
      ];

      expect(Object.keys(result!)).toEqual(goalKeys);
    });
  });

  describe("campaignExecutionDenormalizer", () => {
    it("should get campaignExecution with third data", () => {
      const result = campaignExecutionDenormalizer(
        RAW.COMMERCE.campaignExecutions.data[0].id,
        MOCK_ENTITIES,
      );

      expect(result.id).toEqual(RAW.COMMERCE.campaignExecutions.data[0].id);
      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.campaignExecutions.data[0]),
        "creator",
        "thread",
      ];

      expect(Object.keys(result)).toEqual(goalKeys);
    });
  });

  describe("executionVoteDenormalizer", () => {
    it("should get campaignExecution with third data", () => {
      const result = executionVoteDenormalizer(
        RAW.COMMERCE.executionVotes.data[0].id,
        MOCK_ENTITIES,
      );

      expect(result.id).toEqual(RAW.COMMERCE.executionVotes.data[0].id);
      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.executionVotes.data[0]),
        "user",
        "execution",
        "thread",
      ];

      expect(Object.keys(result)).toEqual(goalKeys);
    });
  });
});
