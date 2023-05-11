import {
  categoryDenormalizer,
  categoryListDenormalizer,
  categorySimpleListDenormalizer,
  categorySingleItemDenormalizer,
} from "../denormalizer";
import { RAW, NORMALIZED } from "app/__mocks__";

const MOCK_ENTITIES = {
  ...NORMALIZED.CATEGORY.entities,
};

describe("Category Denormalize", () => {
  describe("categoryDenoramlizer()", () => {
    it("should get Category", () => {
      const category = categoryDenormalizer(RAW.CATEGORY.id, MOCK_ENTITIES);

      expect(category.id).toEqual(RAW.CATEGORY.id);
    });
  });

  describe("categorySimpleListDenormalizer()", () => {
    it("should get Category", () => {
      const categoryList = categorySimpleListDenormalizer(
        [RAW.CATEGORY.id],
        MOCK_ENTITIES,
      );

      expect(categoryList).toHaveLength(1);
      expect(categoryList[0].id).toEqual(RAW.CATEGORY.id);
    });
  });

  describe("categorySingleItemDenormalizer()", () => {
    it("should get Category", () => {
      const categoryData = categorySingleItemDenormalizer(
        {
          data: RAW.CATEGORY.id,
        },
        MOCK_ENTITIES,
      );

      expect(categoryData.data.id).toEqual(RAW.CATEGORY.id);
    });
  });

  describe("categoryListDenormalizer()", () => {
    it("should get Category", () => {
      const categoryData = categoryListDenormalizer(
        {
          data: [RAW.CATEGORY.id],
        },
        MOCK_ENTITIES,
      );

      expect(categoryData.data[0].id).toEqual(RAW.CATEGORY.id);
    });
  });
});
