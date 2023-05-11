import { RAW } from "app/__mocks__";
import {
  groupNormalizer,
  groupSingleItemNormalizer,
  groupListNormalizer,
} from "..";

describe("group entity", () => {
  describe("group normalizer", () => {
    describe("groupNormalizer()", () => {
      it("should normalize", () => {
        const result = groupNormalizer(RAW.NORMALIZED_GROUP);
        expect(result.entities).toHaveProperty("groups");
        expect(result.result).toBe(RAW.NORMALIZED_GROUP.id);
      });
    });

    describe("groupSingleItemNormalizer()", () => {
      it("should normalize", () => {
        const result = groupSingleItemNormalizer({
          data: RAW.NORMALIZED_GROUP,
        });
        expect(result.entities).toHaveProperty("groups");
        expect(result.result).toEqual({
          data: RAW.NORMALIZED_GROUP.id,
        });
      });
    });

    describe("groupListNormalizer()", () => {
      it("should normalize", () => {
        const result = groupListNormalizer({ data: [RAW.NORMALIZED_GROUP] });
        expect(result.entities).toHaveProperty("groups");
        expect(result.result).toEqual({
          data: [RAW.NORMALIZED_GROUP.id],
        });
      });
    });

    describe("groupListNormalizer() with paginated", () => {
      it("should normalize", () => {
        const result = groupListNormalizer({
          data: [RAW.NORMALIZED_GROUP],
          paging: {},
        });
        expect(result.entities).toHaveProperty("groups");
        expect(result.result).toEqual({
          data: [RAW.NORMALIZED_GROUP.id],
          paging: {},
        });
      });
    });
  });
});
