import replaceLineBreakString from "common/helpers/string/replaceLineBreakString";

describe("replaceLineBreakString()", () => {
  describe("when string has line break string", () => {
    it("should return string that remove line break string", () => {
      expect(replaceLineBreakString(`모임\n서비스 입니\r다`)).toEqual(
        "모임서비스 입니다",
      );
    });
  });

  describe("when inject replaceStr", () => {
    it("should replace line break string to replaceStr", () => {
      expect(replaceLineBreakString(`모임\n서비스 입니\r다`, " ")).toEqual(
        "모임 서비스 입니 다",
      );
    });
  });
});
