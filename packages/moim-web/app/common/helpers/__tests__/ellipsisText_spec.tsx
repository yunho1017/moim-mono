import ellipsisText from "../ellipsisText";

describe("ellipsisText", () => {
  const text = "Hello Vingle";

  describe("when text size is small then maxLength", () => {
    it("should return text as equal injected text", () => {
      expect(ellipsisText(text, 30)).toEqual(text);
    });
  });

  describe("when text size is large then maxLength", () => {
    it("should return text with ellipsis", () => {
      expect(ellipsisText(text, 7)).toEqual("Hello V...");
    });

    it("should return text with injected ellipsis text", () => {
      expect(ellipsisText(text, 7, "@@@@@")).toEqual("Hello V@@@@@");
    });
  });
});
