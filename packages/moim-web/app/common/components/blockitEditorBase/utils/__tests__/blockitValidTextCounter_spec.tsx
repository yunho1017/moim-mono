import blockitValidTextCounter from "app/common/components/richEditor/utils/blockitValidTextCounter";
import { initialState } from "app/rootReducer";
import { RAW } from "app/__mocks__";

describe("blockitValidTextCounter Spec", () => {
  describe("when given empty block", () => {
    it("should return 0 length", () => {
      const count = blockitValidTextCounter(
        [],
        initialState.entities.users,
        () => {},
      );
      expect(count).toBe(0);
    });
  });

  describe("when given only text block", () => {
    describe("when is contain plain text only", () => {
      it("should same length", () => {
        const sampleText = "Hello world.\n";
        const count = blockitValidTextCounter(
          [
            {
              type: "text",
              content: sampleText,
            },
          ],
          initialState.entities.users,
          () => {},
        );
        expect(count).toBe(sampleText.length);
      });
    });

    describe("when is contain styled text", () => {
      it("should same length", () => {
        const sampleText =
          "Hello world.\n*bold* _italic_ hi! visit donghyun&#95;lee@vingle.net";
        const usedCommandCount = 8;
        const count = blockitValidTextCounter(
          [
            {
              type: "text",
              content: sampleText,
            },
          ],
          initialState.entities.users,
          () => {},
        );
        expect(count).toBe(sampleText.length - usedCommandCount);
      });
    });

    describe("when is contain styled/emoji/plain text", () => {
      it("should same length", () => {
        const sampleText =
          "Hello world.\n*bold* _italic_ hi! visit donghyun&#95;lee@vingle.net :smile: 👍";
        const usedCommandCount = 15;
        const count = blockitValidTextCounter(
          [
            {
              type: "text",
              content: sampleText,
            },
          ],
          initialState.entities.users,
          () => {},
        );
        expect(count).toBe(sampleText.length - usedCommandCount);
      });
    });

    describe("when is contain styled/emoji/plain/link/mention text", () => {
      it("should same length", () => {
        const sampleText =
          "Hello world.\n*bold* _italic_ hi! visit donghyun&#95;lee@vingle.net :smile: 👍 <https://moim.co|Visit Moim> <@U1111:fallback>";
        const usedCommandCount = 42;
        const count = blockitValidTextCounter(
          [
            {
              type: "text",
              content: sampleText,
            },
          ],
          initialState.entities.users,
          () => {},
        );
        expect(count).toBe(sampleText.length - usedCommandCount);
      });
    });
  });

  describe("when give block", () => {
    it("should be count 1", () => {
      const count = blockitValidTextCounter(
        [
          {
            type: "file",
            files: [],
          },
        ],
        initialState.entities.users,
        () => {},
      );
      expect(count).toBe(1);
    });
  });

  describe("when give complicated block", () => {
    it("should return properly count", () => {
      const sampleText =
        "Hello world.\n*bold* _italic_ hi! visit donghyun&#95;lee@vingle.net :smile: 👍 <https://moim.co|Visit Moim> <@U1111:fallback>";
      const count = blockitValidTextCounter(
        [
          {
            type: "text",
            content: sampleText, // 82
          },
          {
            type: "file",
            files: [],
          },
          {
            type: "file",
            files: [],
          },
          {
            type: "text",
            content:
              "&gt;&gt; Contact Here: <@U111:Jack>,\n&gt;&gt; Place: <https://vingle.net>", // 51
          },
          RAW.LINK_PREVIEW_BLOCKIT,
        ],
        initialState.entities.users,
        () => {},
      );
      expect(count).toBe(136);
    });
  });
});
