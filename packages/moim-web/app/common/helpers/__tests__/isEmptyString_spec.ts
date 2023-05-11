import isEmptyString from "common/helpers/isEmptyString";

describe("isEmptyString()", () => {
  describe("when string is empty", () => {
    it("should return true", () => {
      expect(isEmptyString("")).toBeTruthy();
    });
  });

  describe("when string is not empty", () => {
    it("should return falsy", () => {
      expect(isEmptyString("Vingle")).toBeFalsy();
    });
  });
});
