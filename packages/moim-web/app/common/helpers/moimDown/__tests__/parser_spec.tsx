import {
  parseServerSpecMention,
  parseRenderSpecMention,
  parseCommonFormat,
} from "..";

const MOCK_SERVER_SPEC_MESSAGE =
  "hello this is <#C123465>.\n Welcome a board <@U592723> <@U4232:dong>";
const MOCK_RENDER_SPEC_MESSAGE =
  "hello this is <#C123465:st-front-end>.\n Welcome a board <@U592723:vingle>";
const MOCK_COMMON_SPEC_MESSAGE =
  "hello this is <text_sets|forum_channel_to_be_started|To be started>";

describe("MoimParser helpers", () => {
  describe("parseServerSpecMention()", () => {
    it("should return 2 mention object", () => {
      const result = parseServerSpecMention(MOCK_SERVER_SPEC_MESSAGE);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        origin: "<#C123465>",
        type: "#",
        id: "C123465",
      });
      expect(result[1]).toEqual({
        origin: "<@U592723>",
        type: "@",
        id: "U592723",
      });
    });
  });

  describe("parseRenderSpecMention()", () => {
    it("should return 2 mention object", () => {
      const result = parseRenderSpecMention(MOCK_RENDER_SPEC_MESSAGE);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        origin: "<#C123465:st-front-end>",
        type: "#",
        id: "C123465",
      });
      expect(result[1]).toEqual({
        origin: "<@U592723:vingle>",
        type: "@",
        id: "U592723",
      });
    });
  });

  describe("parseCommonFormat()", () => {
    it("should return 1 object", () => {
      const result = parseCommonFormat(MOCK_COMMON_SPEC_MESSAGE);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        origin: "<text_sets|forum_channel_to_be_started|To be started>",
        type: "text_sets",
        value: "forum_channel_to_be_started",
        fallback: "To be started",
      });
    });
  });
});
