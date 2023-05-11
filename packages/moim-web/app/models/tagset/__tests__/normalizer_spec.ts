import { RAW } from "app/__mocks__";
import {
  tagItemNormalizer,
  tagItemSingleItemNormalizer,
  tagItemListNormalizer,
  tagSetNormalizer,
  tagSetSingleItemNormalizer,
  tagSetListNormalizer,
} from "../normalizer";

const TAG_ITEMS = (RAW.TAG_SET.data[0]
  .items as unknown) as Moim.TagSet.ITagItem[];

describe("TagSet normalizer", () => {
  describe("tagItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagItemNormalizer(TAG_ITEMS[0]);

      expect(result.entities).toHaveProperty("tagset");
      expect(result.result).toEqual(TAG_ITEMS[0].id);
    });
  });

  describe("tagItemSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagItemSingleItemNormalizer({
        data: TAG_ITEMS[0],
      });

      expect(result.entities).toHaveProperty("tagset");
      expect(result.result.data).toEqual(TAG_ITEMS[0].id);
    });
  });

  describe("tagItemListNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagItemListNormalizer(TAG_ITEMS);

      expect(result.entities).toHaveProperty("tagset");
      expect(Object.keys(result.entities.tagset).length).toBe(TAG_ITEMS.length);
      expect(result.result).toHaveLength(TAG_ITEMS.length);
    });
  });

  describe("tagSetNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagSetNormalizer(RAW.TAG_SET.data[0]);

      expect(result.entities).toHaveProperty("tagset");
      expect(result.result).toEqual(RAW.TAG_SET.data[0].id);
    });
  });

  describe("tagSetSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagSetSingleItemNormalizer({
        data: RAW.TAG_SET.data[0],
      });

      expect(result.entities).toHaveProperty("tagset");
      expect(result.result.data).toEqual(RAW.TAG_SET.data[0].id);
    });
  });

  describe("tagSetListNormalizer()", () => {
    it("should able normalize", () => {
      const result = tagSetListNormalizer(RAW.TAG_SET);

      expect(result.entities).toHaveProperty("tagset");
      expect(result.result.data).toEqual([
        RAW.TAG_SET.data[0].id,
        RAW.TAG_SET.data[1].id,
      ]);
    });
  });
});
