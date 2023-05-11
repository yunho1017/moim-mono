import shallowMerge from "common/helpers/merge/shallowMerge";

describe("shallowMerge()", () => {
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
      const result = shallowMerge({ a: 1, b: { b1: 2 } }, { b: { b2: 3 } });

      expect(result).toHaveProperty("a", 1);
      expect(result).toHaveProperty("b", { b2: 3 });
    });
  });
});
