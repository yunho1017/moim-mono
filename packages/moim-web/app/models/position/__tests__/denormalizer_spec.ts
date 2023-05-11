import {
  positionDenormalier,
  positionListDenormalizer,
  positionSingleItemDenormalizer,
} from "../denormalizer";
import { NORMALIZED, RAW } from "app/__mocks__";

const MOCK_USER = { ...RAW.MEMBER, user_id: "U12345", name: "Vingle" };
const MOCK_ENTITIES: Moim.Entity.INormalizedData = {
  ...{
    users: {
      U12345: MOCK_USER,
    },
  },
  ...NORMALIZED.POSITION.entities,
};

describe("Position denormalizer", () => {
  describe("positionDenormalizer()", () => {
    it("should access to creator property", () => {
      const position = positionDenormalier(
        NORMALIZED.POSITION.result,
        MOCK_ENTITIES,
      );

      expect(position.id).toEqual(NORMALIZED.POSITION.result);
      expect(position.creator).toEqual(MOCK_USER.user_id);
    });
  });

  describe("positionSignleItemDenormalizer()", () => {
    it("should access to creator property", () => {
      const position = positionSingleItemDenormalizer(
        { data: NORMALIZED.POSITION.result },
        MOCK_ENTITIES,
      );

      expect(position.data.id).toEqual(NORMALIZED.POSITION.result);
      expect(position.data.creator).toEqual(MOCK_USER.user_id);
    });
  });

  describe("positionListDenormalizer()", () => {
    it("should access to creator property", () => {
      const position = positionListDenormalizer(
        { data: [NORMALIZED.POSITION.result] },
        MOCK_ENTITIES,
      );

      expect(position.data[0].id).toEqual(NORMALIZED.POSITION.result);
      expect(position.data[0].creator).toEqual(MOCK_USER.user_id);
    });
  });
});
