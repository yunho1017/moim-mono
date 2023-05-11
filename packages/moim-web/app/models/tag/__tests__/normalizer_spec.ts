import { RAW } from "app/__mocks__";
import {
  tagNormalizer,
  tagSingleItemNormalizer,
  tagListNormalizer,
} from "../normalizer";

describe("Tag normalizer", () => {
  describe("tagNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagNormalizer({
        ...RAW.TAGS.data[0],
      });

      expect(result.entities).toHaveProperty("tags");
      expect(result.result).toEqual(RAW.TAGS.data[0].id);
    });
  });

  describe("tagSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagSingleItemNormalizer({
        data: RAW.TAGS.data[0],
      });

      expect(result.entities).toHaveProperty("tags");
      expect(result.result.data).toEqual(RAW.TAGS.data[0].id);
    });
  });

  describe("tagListNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagListNormalizer(RAW.TAGS);

      expect(result.entities).toHaveProperty("tags");
      expect(result.result.data).toEqual([RAW.TAGS.data[0].id]);
    });
  });
});
