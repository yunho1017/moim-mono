import { RAW } from "app/__mocks__";
import {
  channelNormalizer,
  channelSingleItemNormalizer,
  channelListNormalizer,
} from "../normalizer";

describe("Channel normalizer", () => {
  describe("channelNormalizer()", () => {
    it("should able normalize", () => {
      const result = channelNormalizer({
        ...RAW.SIMPLE_CHANNELS.data[0],
      });

      expect(result.entities).toHaveProperty("channels");
      expect(result.result).toEqual(RAW.SIMPLE_CHANNELS.data[0].id);
    });
  });

  describe("channelSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = channelSingleItemNormalizer({
        data: RAW.SIMPLE_CHANNELS.data[0],
      });

      expect(result.entities).toHaveProperty("channels");
      expect(result.result.data).toEqual(RAW.SIMPLE_CHANNELS.data[0].id);
    });
  });

  describe("channelListNormalizer()", () => {
    it("should able normalize", () => {
      const result = channelListNormalizer(RAW.SIMPLE_CHANNELS);

      expect(result.entities).toHaveProperty("channels");
      expect(result.result.data).toEqual(["C1234", "C1234666"]);
    });
  });
});
