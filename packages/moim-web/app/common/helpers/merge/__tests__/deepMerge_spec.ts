import deepMerge from "common/helpers/merge/deepMerge";
import shallowMerge from "common/helpers/merge/shallowMerge";

describe("deepMerge()", () => {
  describe("when inject sources", () => {
    let result: {};
    const source1 = { a: 1 };

    beforeEach(() => {
      result = shallowMerge(source1, { b: 2 }, undefined);
    });

    it("should merge object", () => {
      expect(result).toHaveProperty("a", 1);
      expect(result).toHaveProperty("b", 2);
    });

    it("should first source is immutable", () => {
      expect(result).not.toBe(source1);
    });
  });

  describe("when sources has property that already existed", () => {
    it("should override property that shallowly", () => {
      const result = deepMerge(
        { a: 1, b: { b1: 2, b3: [1, 2, 3] } },
        { b: { b2: 3, b3: [4, 5, 6] } },
      );

      expect(result).toHaveProperty("a", 1);
      expect(result).toHaveProperty("b", {
        b1: 2,
        b2: 3,
        b3: [4, 5, 6],
      });
    });
  });
});
