import { NORMALIZED, RAW } from "app/__mocks__";
import {
  threadNormalizer,
  threadSingleItemNormalizer,
  threadListNormalizer,
  threadDenormalizer,
  threadSingleItemDenormalizer,
  threadListDenormalizer,
} from "..";

const MOCK_USER_ENTITY = {
  U12345: { ...RAW.MEMBER, user_id: "U12345", name: "Vingle" },
  U12346: { ...RAW.MEMBER, user_id: "U12346", name: "Jedi" },
};

describe("Thread entity", () => {
  describe("Thread normalizer", () => {
    describe("threadNormalizer()", () => {
      it("should normalize", () => {
        const result = threadNormalizer(RAW.THREAD);
        expect(result.entities).toHaveProperty("threads");
        expect(result.result).toBe(RAW.THREAD.id);
      });
    });

    describe("threadSingleItemNormalizer()", () => {
      it("should normalize", () => {
        const result = threadSingleItemNormalizer({ data: RAW.THREAD });
        expect(result.entities).toHaveProperty("threads");
        expect(result.result).toEqual({
          data: RAW.THREAD.id,
        });
      });
    });

    describe("threadListNormalizer()", () => {
      it("should normalize", () => {
        const result = threadListNormalizer({ data: [RAW.THREAD] });
        expect(result.entities).toHaveProperty("threads");
        expect(result.result).toEqual({
          data: [RAW.THREAD.id],
        });
      });
    });

    describe("threadListNormalizer() with paginated data", () => {
      it("should normalize", () => {
        const result = threadListNormalizer({
          data: [RAW.THREAD],
          paging: {},
        });
        expect(result.entities).toHaveProperty("threads");
        expect(result.result).toEqual({
          data: [RAW.THREAD.id],
          paging: {},
        });
      });
    });
  });

  describe("Thread denormalizer", () => {
    describe("threadDenormalizer()", () => {
      it("should access to user property", () => {
        const result = threadDenormalizer(NORMALIZED.THREAD.result, {
          ...{ threads: {} },
          ...{ users: MOCK_USER_ENTITY },
          ...{ moims: {} },
          ...NORMALIZED.THREAD.entities,
        });
        expect(result.user).not.toBeUndefined();
      });
    });

    describe("threadSingleItemDenormalizer()", () => {
      it("should access to user property", () => {
        const result = threadSingleItemDenormalizer(
          { data: NORMALIZED.THREAD.result },
          {
            ...{ threads: {} },
            ...{ users: MOCK_USER_ENTITY },
            ...{ moims: {} },
            ...NORMALIZED.THREAD.entities,
          },
        );

        expect(result.data.user).not.toBeUndefined();
      });
    });

    describe("threadListDenormalizer()", () => {
      it("should access to user property", () => {
        const result = threadListDenormalizer(
          { data: [NORMALIZED.THREAD.result] },
          {
            ...{ threads: {} },
            ...{ users: MOCK_USER_ENTITY },
            ...{ moims: {} },
            ...NORMALIZED.THREAD.entities,
          },
        );
        expect(result.data).toHaveLength(1);
        expect(result.data[0].user).not.toBeUndefined();
      });
    });

    describe("threadListDenormalizer() with paginated data", () => {
      it("should access to user property", () => {
        const result = threadListDenormalizer(
          { data: [NORMALIZED.THREAD.result], paging: {} },
          {
            ...{ threads: {} },
            ...{ users: MOCK_USER_ENTITY },
            ...{ moims: {} },
            ...NORMALIZED.THREAD.entities,
          },
        );
        expect(result.data).toHaveLength(1);
        expect(result.data[0].user).not.toBeUndefined();
      });
    });
  });
});
