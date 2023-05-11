import {
  categoryListNormalizer,
  categoryNormalizer,
  categorySimpleListNormalizer,
  categorySingleItemNormalizer,
} from "../normalizer";
import { RAW } from "app/__mocks__";

describe("Category Normalizer", () => {
  describe("categoryNormalizer()", () => {
    it("should able normalize", () => {
      const result = categoryNormalizer(RAW.CATEGORY);

      expect(result.entities).toHaveProperty("categories");
      expect(result.result).toEqual(RAW.CATEGORY.id);
    });
  });

  describe("categorySimpleListNormalizer()", () => {
    it("should able normalize", () => {
      const result = categorySimpleListNormalizer([
        RAW.CATEGORY,
        { ...RAW.CATEGORY, id: "2" },
      ]);

      expect(result.entities).toHaveProperty("categories");
      expect(result.result).toHaveLength(2);
    });
  });

  describe("categorySingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = categorySingleItemNormalizer({
        data: RAW.CATEGORY,
      });

      expect(result.entities).toHaveProperty("categories");
      expect(result.result.data).toEqual(RAW.CATEGORY.id);
    });
  });

  describe("categoryListNormalizer()", () => {
    it("should able normalize", () => {
      const result = categoryListNormalizer({
        data: [RAW.CATEGORY, { ...RAW.CATEGORY, id: "2" }],
      });

      expect(result.entities).toHaveProperty("categories");
      expect(result.result.data).toHaveLength(2);
    });
  });
});
