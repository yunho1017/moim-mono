import { serverSpecMentionReplace, renderSpecMentionReplace } from "../replace";

const MOCK_SERVER_SPEC_MESSAGE = "hello <#C123465> a<@U592723>b";
const MOCK_RENDER_SPEC_MESSAGE =
  "hello <#C123465:st-front-end> a<@U592723:satune>b";

describe("MoimParser helpers", () => {
  describe("serverSpecMentionReplace()", () => {
    it("case 1, should return replaced text", () => {
      const result = serverSpecMentionReplace(MOCK_SERVER_SPEC_MESSAGE, [
        {
          origin: "<#C123465>",
          type: "#C",
          id: "123465",
          display: "st-front-end",
        },
        {
          origin: "<@U592723>",
          type: "@U",
          id: "592723",
          display: "satune",
        },
      ]);

      expect(result).toBe("hello <#C123465:st-front-end> a<@U592723:satune>b");
    });

    it("case 2", () => {
      const result = serverSpecMentionReplace("<@U123|Temp> hi", [
        {
          origin: "<@U123|Temp>",
          type: "@U",
          id: "123",
          display: "Lee",
          fallback: "Temp",
        },
      ]);

      expect(result).toBe("<@U123|Temp:Lee> hi");
    });
    it("case 3", () => {
      const result = serverSpecMentionReplace("<@|Temp> hi", [
        {
          origin: "<@|Temp>",
          type: "@",
          id: "",
          display: "",
          fallback: "Temp",
        },
      ]);

      expect(result).toBe("<@|Temp:Temp> hi");
    });
  });
  describe("renderSpecMentionReplace()", () => {
    it("should return replaced text", () => {
      const result = renderSpecMentionReplace(MOCK_RENDER_SPEC_MESSAGE, [
        {
          origin: "<#C123465:st-front-end>",
          type: "#C",
          id: "123465",
        },
        {
          origin: "<@U592723:satune>",
          type: "@U",
          id: "592723",
        },
      ]);

      expect(result).toBe(MOCK_SERVER_SPEC_MESSAGE);
    });
  });
});
