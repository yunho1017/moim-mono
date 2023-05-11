import {
  tagDenormalizer,
  tagSingleItemDenormalizer,
  tagListDenormalizer,
} from "../denormalizer";
import { RAW, NORMALIZED } from "app/__mocks__";

const MOCK_USER = { ...RAW.MEMBER, user_id: "U12345" };
const MOCK_NORMALIZED_TAG_WITH_CATEGORY = {
  ...RAW.TAGS.data[0],
  creator: "U12345",
  group: "G1234",
  category_id: "C1234",
  category: "C1234",
};

const MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY = {
  ...RAW.TAGS.data[0],
  id: "t1234",
  creator: "U12345",
  group: "G1234",
};
delete MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY.category_id;
const MOCK_ENTITIES: Moim.Entity.INormalizedData = {
  ...NORMALIZED.POSITION.entities, // for set rest of entities
  users: {
    U12345: {
      ...MOCK_USER,
      positions: [],
    },
  },
  groups: {
    G1234: RAW.NORMALIZED_GROUP,
  },
  categories: {
    C1234: RAW.CATEGORY,
  },
  tags: {
    [MOCK_NORMALIZED_TAG_WITH_CATEGORY.id]: MOCK_NORMALIZED_TAG_WITH_CATEGORY,
    [MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY.id]: MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY,
  },
};

describe("Tag denormalizer", () => {
  describe("tagDenormalizer()", () => {
    describe("when have category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagDenormalizer(
          MOCK_NORMALIZED_TAG_WITH_CATEGORY.id,
          MOCK_ENTITIES,
        );
        expect(tag).toHaveProperty("category");
        expect(tag.group).toEqual("G1234");
      });
    });

    describe("when haven't category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagDenormalizer(
          MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY.id,
          MOCK_ENTITIES,
        );
        expect(tag).not.toHaveProperty("category");
        expect(tag.group).toEqual("G1234");
      });
    });
  });

  describe("tagSingleItemDenormalizer()", () => {
    describe("when have category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagSingleItemDenormalizer(
          { data: MOCK_NORMALIZED_TAG_WITH_CATEGORY.id },
          MOCK_ENTITIES,
        );
        expect(tag.data).toHaveProperty("category");
        expect(tag.data.group).toEqual("G1234");
      });
    });

    describe("when haven't category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagSingleItemDenormalizer(
          { data: MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY.id },
          MOCK_ENTITIES,
        );
        expect(tag.data).not.toHaveProperty("category");
        expect(tag.data.group).toEqual("G1234");
      });
    });
  });

  describe("tagListDenormalizer()", () => {
    describe("when have category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagListDenormalizer(
          { data: [MOCK_NORMALIZED_TAG_WITH_CATEGORY.id], paging: {} },
          MOCK_ENTITIES,
        );
        expect(tag.data[0]).toHaveProperty("category");
        expect(tag.data[0].group).toEqual("G1234");
      });
    });

    describe("when haven't category_id", () => {
      it("should access all of reference key field", () => {
        const tag = tagListDenormalizer(
          { data: [MOCK_NORMALIZED_TAG_WITHOUT_CATEGORY.id], paging: {} },
          MOCK_ENTITIES,
        );
        expect(tag.data[0]).not.toHaveProperty("category");
        expect(tag.data[0].group).toEqual("G1234");
      });
    });
  });
});
