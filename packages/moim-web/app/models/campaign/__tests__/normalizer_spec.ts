import { RAW } from "app/__mocks__";
import {
  campaignNormalizer,
  campaignListNormalizer,
  campaignExecutionNormalizer,
  campaignExecutionListNormalizer,
  executionVoteNormalizer,
  executionVoteListNormalizer,
} from "../normalizer";

describe("Campaign Normalizer", () => {
  describe("campaignNormalizer", () => {
    it("should able normalize", () => {
      const result = campaignNormalizer(RAW.COMMERCE.campaigns.data[0]);
      expect(result.entities).toHaveProperty("campaign_campaign");
      expect(result.result).toEqual(RAW.COMMERCE.campaigns.data[0].id);
    });
  });

  describe("campaignListNormalizer", () => {
    it("should able normalize", () => {
      const result = campaignListNormalizer(RAW.COMMERCE.campaigns);
      expect(result.entities).toHaveProperty("campaign_campaign");
      expect(result.result).toEqual({
        data: RAW.COMMERCE.campaigns.data.map(i => i.id),
        paging: RAW.COMMERCE.campaigns.paging,
      });
    });
  });

  describe("campaignExecutionNormalizer", () => {
    it("should able normalize", () => {
      const result = campaignExecutionNormalizer(
        RAW.COMMERCE.campaignExecutions.data[0],
      );
      expect(result.entities).toHaveProperty("campaign_campaign_execution");
      expect(result.result).toEqual(RAW.COMMERCE.campaignExecutions.data[0].id);
    });
  });

  describe("campaignExecutionListNormalizer", () => {
    it("should able normalize", () => {
      const result = campaignExecutionListNormalizer(
        RAW.COMMERCE.campaignExecutions,
      );

      expect(result.entities).toHaveProperty("campaign_campaign_execution");

      expect(result.result).toEqual({
        data: RAW.COMMERCE.campaignExecutions.data.map(i => i.id),
      });
    });
  });

  describe("executionVoteNormalizer", () => {
    it("should able normalize", () => {
      const result = executionVoteNormalizer(
        RAW.COMMERCE.executionVotes.data[0],
      );

      expect(result.entities).toHaveProperty("campaign_execution_vote");
      expect(result.result).toEqual(RAW.COMMERCE.executionVotes.data[0].id);
    });
  });

  describe("executionVoteListNormalizer", () => {
    it("should able normalize", () => {
      const result = executionVoteListNormalizer(RAW.COMMERCE.executionVotes);

      expect(result.entities).toHaveProperty("campaign_execution_vote");

      expect(result.result).toEqual({
        data: RAW.COMMERCE.executionVotes.data.map(i => i.id),
        paging: RAW.COMMERCE.executionVotes.paging,
      });
    });
  });
});
