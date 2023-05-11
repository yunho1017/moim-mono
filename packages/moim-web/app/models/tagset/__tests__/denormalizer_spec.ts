import {
  tagItemDenormalizer,
  tagItemSingleItemDenormalizer,
  tagItemListDenormalizer,
  tagSetDenormalizer,
  tagSetSingleItemDenormalizer,
  tagSetListDenormalizer,
} from "../denormalizer";
import { RAW, NORMALIZED } from "app/__mocks__";

const TAG_ITEMS =
  ((RAW.TAG_SET.data[0].items as unknown) as Moim.TagSet.ITagItem[]) ?? [];
const MOCK_ENTITIES = {
  ...NORMALIZED.TAG_SET.entities,
};

describe("TagSet denormalizer", () => {
  describe("tagItemDenormalizer()", () => {
    it("should denormalize", () => {
      const tagItem = tagItemDenormalizer(TAG_ITEMS[0].id, MOCK_ENTITIES);

      expect(tagItem).not.toHaveProperty("items");
      expect(tagItem).toHaveProperty("id", TAG_ITEMS[0].id);
    });
  });

  describe("tagItemSingleItemDenormalizer()", () => {
    it("should denormalize", () => {
      const tagset = tagItemSingleItemDenormalizer(
        { data: TAG_ITEMS[0].id },
        MOCK_ENTITIES,
      );

      expect(tagset.data).not.toHaveProperty("items");
      expect(tagset.data).toHaveProperty("id", TAG_ITEMS[0].id);
    });
  });

  describe("tagItemListDenormalizer()", () => {
    it("should denormalize", () => {
      const tagItem = tagItemListDenormalizer([TAG_ITEMS[0].id], MOCK_ENTITIES);

      expect(tagItem[0]).not.toHaveProperty("items");
      expect(tagItem[0]).toHaveProperty("id", TAG_ITEMS[0].id);
    });
  });

  describe("tagSetDenormalizer()", () => {
    it("should denormalize", () => {
      const tagset = tagSetDenormalizer(RAW.TAG_SET.data[0].id, MOCK_ENTITIES);

      expect(tagset).toHaveProperty("items");
      expect(tagset.items).toHaveLength(TAG_ITEMS.length);
      expect(
        ((tagset.items as unknown) as Moim.TagSet.ITagItem[])[0],
      ).toHaveProperty("id", TAG_ITEMS[0].id);
      expect(tagset).toHaveProperty("id", RAW.TAG_SET.data[0].id);
    });
  });

  describe("tagSetSingleItemDenormalizer()", () => {
    it("should denormalize", () => {
      const tagset = tagSetSingleItemDenormalizer(
        { data: RAW.TAG_SET.data[0].id },
        MOCK_ENTITIES,
      );

      expect(tagset.data).toHaveProperty("items");
      expect(tagset.data.items).toHaveLength(TAG_ITEMS.length);
      expect(
        ((tagset.data.items as unknown) as Moim.TagSet.ITagItem[])[0],
      ).toHaveProperty("id", TAG_ITEMS[0].id);
      expect(tagset.data).toHaveProperty("id", RAW.TAG_SET.data[0].id);
    });
  });

  describe("tagSetListDenormalizer()", () => {
    it("should denormalize", () => {
      const tagset = tagSetListDenormalizer(
        { data: [RAW.TAG_SET.data[0].id], paging: {} },
        MOCK_ENTITIES,
      );

      expect(tagset.data[0]).toHaveProperty("items");
      expect(tagset.data[0].items).toHaveLength(TAG_ITEMS.length);
      expect(
        ((tagset.data[0].items as unknown) as Moim.TagSet.ITagItem[])[0],
      ).toHaveProperty("id", TAG_ITEMS[0].id);
      expect(tagset.data[0]).toHaveProperty("id", RAW.TAG_SET.data[0].id);
    });
  });
});
