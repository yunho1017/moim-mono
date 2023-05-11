import { RAW } from "app/__mocks__";
import {
  positionListNormalizer,
  positionNormalizer,
  positionSingleItemNormalizer,
} from "../normalizer";

describe("Position normalizer", () => {
  describe("positionNormalizer()", () => {
    it("should able normalize", () => {
      const result = positionNormalizer(RAW.NORMALIZED_POSITION);

      expect(result.entities).toHaveProperty("positions");
      expect(result.result).toEqual(RAW.NORMALIZED_POSITION.id);
    });
  });

  describe("positionSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = positionSingleItemNormalizer({
        data: RAW.NORMALIZED_POSITION,
      });

      expect(result.entities).toHaveProperty("positions");
      expect(result.result.data).toEqual(RAW.NORMALIZED_POSITION.id);
    });
  });

  describe("positionListNormalizer()", () => {
    it("should able normalize", () => {
      const result = positionListNormalizer({
        data: [RAW.NORMALIZED_POSITION],
      });

      expect(result.entities).toHaveProperty("positions");
      expect(result.result.data).toEqual([RAW.NORMALIZED_POSITION.id]);
    });
  });
});
