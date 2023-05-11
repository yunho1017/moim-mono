import mergeWithArrayConcatUniq from "common/helpers/mergeWithArrayConcatUniq";

describe("mergeWithArrayConcatUniq", () => {
  describe("merge two object", () => {
    it("should be merge options", () => {
      expect(mergeWithArrayConcatUniq({ a: 1 }, { b: 2 })).toEqual({
        a: 1,
        b: 2,
      });
    });

    it("should be merge deep options", () => {
      expect(
        mergeWithArrayConcatUniq(
          { a: { data: { name: "Minwoo" } } },
          { a: { data: { age: 25 } } },
        ),
      ).toEqual({
        a: {
          data: {
            name: "Minwoo",
            age: 25,
          },
        },
      });
    });
  });

  describe("merge two object with array", () => {
    it("should be merge array concat", () => {
      expect(
        mergeWithArrayConcatUniq({ a: [1, 2, 3] }, { a: [4, 5, 6] }),
      ).toEqual({
        a: [1, 2, 3, 4, 5, 6],
      });
    });

    it("should be merge & uniq array concat", () => {
      expect(
        mergeWithArrayConcatUniq({ a: [1, 2, 3] }, { a: [1, 2, 6] }),
      ).toEqual({
        a: [1, 2, 3, 6],
      });
    });
  });
});
