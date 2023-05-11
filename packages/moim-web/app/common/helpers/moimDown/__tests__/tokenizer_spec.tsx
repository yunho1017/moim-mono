import {
  regexTokenizer,
  plainTextTokenizer,
  reorderTokens,
} from "../tokenizer";

describe("parser's util functions", () => {
  describe("regexTokenizer()", () => {
    describe("when give link", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer(
          "<https://vingle.network> <>https://vingle.net<> <https://example.com/ex/1|example.com/ex/1> <//vingle.network>",
        );
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
          offset: 0,
          length: 24,
          origin: "<https://vingle.network>",
          type: "link",
          data: {
            value: "https://vingle.network",
            href: "https://vingle.network",
            isPreview: false,
          },
        });

        expect(result[1]).toEqual({
          offset: 48,
          length: 43,
          origin: "<https://example.com/ex/1|example.com/ex/1>",
          type: "link",
          data: {
            value: "example.com/ex/1",
            href: "https://example.com/ex/1",
            isPreview: false,
          },
        });

        expect(result[2]).toEqual({
          offset: 92,
          length: 18,
          origin: "<//vingle.network>",
          type: "link",
          data: {
            value: "vingle.network",
            href: "vingle.network",
            isPreview: false,
          },
        });
      });
    });

    describe("when give render spec mention", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer(
          "<@U1111:satune> <>https://vingle.net<> <#C2999> <#C22928:st-front-end> ",
        );
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
          offset: 0,
          length: 15,
          origin: "<@U1111:satune>",
          type: "mention",
          data: {
            display: "satune",
            id: "U1111",
            type: "user",
          },
        });

        expect(result[1]).toEqual({
          origin: "<#C22928:st-front-end>",
          offset: 48,
          length: 22,
          type: "mention",
          data: {
            display: "st-front-end",
            id: "C22928",
            type: "channel",
          },
        });
      });
    });

    describe("when give bold", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer("*bold* *한글* **wrong bold** *`hi?`*");
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
          offset: 0,
          length: 6,
          origin: "*bold*",
          type: "bold",
          data: {
            value: "bold",
            innerStyles: [
              {
                data: {
                  value: "bold",
                },
                length: 4,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 7,
          length: 4,
          origin: "*한글*",
          type: "bold",
          data: {
            value: "한글",
            innerStyles: [
              {
                data: {
                  value: "한글",
                },
                length: 2,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[2]).toEqual({
          offset: 27,
          length: 7,
          origin: "*`hi?`*",
          type: "bold",
          data: {
            value: "`hi?`",
            innerStyles: [
              {
                offset: 0,
                length: 5,
                origin: "`hi?`",
                type: "inlineCode",
                data: {
                  value: "hi?",
                  innerStyles: [
                    {
                      data: {
                        value: "hi?",
                      },
                      length: 3,
                      offset: 0,
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
        });
      });
    });

    describe("when give italic", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer(
          "_italic_ _한글_ __wrong italic__ _`hi?`_",
        );
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
          offset: 0,
          length: 8,
          origin: "_italic_",
          type: "italic",
          data: {
            value: "italic",
            innerStyles: [
              {
                data: {
                  value: "italic",
                },
                length: 6,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 9,
          length: 4,
          origin: "_한글_",
          type: "italic",
          data: {
            value: "한글",
            innerStyles: [
              { data: { value: "한글" }, length: 2, offset: 0, type: "text" },
            ],
          },
        });

        expect(result[2]).toEqual({
          offset: 31,
          length: 7,
          origin: "_`hi?`_",
          type: "italic",
          data: {
            value: "`hi?`",
            innerStyles: [
              {
                offset: 0,
                length: 5,
                origin: "`hi?`",
                type: "inlineCode",
                data: {
                  value: "hi?",
                  innerStyles: [
                    {
                      data: {
                        value: "hi?",
                      },
                      length: 3,
                      offset: 0,
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
        });
      });

      it("case 2", () => {
        const result = regexTokenizer(
          "jiyoung&#95;yun@worldvision.or.kr/ _  박은_아 대리 eunah_park@worldvision.or.kr / 장문희 moonhee&#95;jang@worldvision.or.kr",
        );

        expect(result[0]).toEqual({
          offset: 35,
          length: 6,
          type: "italic",
          origin: "_  박은_",
          data: {
            value: "  박은",
            innerStyles: [
              { length: 4, offset: 0, type: "text", data: { value: "  박은" } },
            ],
          },
        });
      });
    });

    describe("when give inline code", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer("`여기에``inlinecode```hihi`");
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
          offset: 0,
          length: 5,
          origin: "`여기에`",
          type: "inlineCode",
          data: {
            value: "여기에",
            innerStyles: [
              {
                data: {
                  value: "여기에",
                },
                length: 3,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 5,
          length: 12,
          origin: "`inlinecode`",
          type: "inlineCode",
          data: {
            value: "inlinecode",
            innerStyles: [
              {
                data: {
                  value: "inlinecode",
                },
                length: 10,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[2]).toEqual({
          offset: 18,
          length: 6,
          origin: "`hihi`",
          type: "inlineCode",
          data: {
            value: "hihi",
            innerStyles: [
              {
                data: {
                  value: "hihi",
                },
                length: 4,
                offset: 0,
                type: "text",
              },
            ],
          },
        });
      });
    });

    describe("when give code block", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer(
          "```안녕하세요\n제 이름은 빙글그룹이에요!`inline code?````\n```방가 방가```",
        );

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
          offset: 0,
          length: 39,
          origin: "```안녕하세요\n제 이름은 빙글그룹이에요!`inline code?```",
          type: "codeBlock",
          data: {
            value: "안녕하세요\n제 이름은 빙글그룹이에요!`inline code?",
            innerStyles: [
              {
                data: {
                  value: "안녕하세요\n제 이름은 빙글그룹이에요!`inline code?",
                },
                length: 33,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 41,
          length: 11,
          origin: "```방가 방가```",
          type: "codeBlock",
          data: {
            value: "방가 방가",
            innerStyles: [
              {
                data: {
                  value: "방가 방가",
                },
                length: 5,
                offset: 0,
                type: "text",
              },
            ],
          },
        });
      });
    });

    describe("when give bold + italic", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer(
          "*_bold_* _*한글*_ *_*wrong bold*_* __ _*_",
        );
        expect(result).toHaveLength(5);
        expect(result[0]).toEqual({
          offset: 0,
          length: 8,
          origin: "*_bold_*",
          type: "bold",
          data: {
            value: "_bold_",
            innerStyles: [
              {
                offset: 0,
                length: 6,
                origin: "_bold_",
                type: "italic",
                data: {
                  value: "bold",
                  innerStyles: [
                    {
                      data: {
                        value: "bold",
                      },
                      length: 4,
                      offset: 0,
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 9,
          length: 6,
          origin: "_*한글*_",
          type: "italic",
          data: {
            value: "*한글*",
            innerStyles: [
              {
                offset: 0,
                length: 4,
                origin: "*한글*",
                type: "bold",
                data: {
                  value: "한글",
                  innerStyles: [
                    {
                      data: {
                        value: "한글",
                      },
                      length: 2,
                      offset: 0,
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
        });

        expect(result[2]).toEqual({
          offset: 16,
          length: 3,
          origin: "*_*",
          type: "bold",
          data: {
            value: "_",
            innerStyles: [
              {
                data: {
                  value: "_",
                },
                length: 1,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[3]).toEqual({
          offset: 29,
          length: 3,
          origin: "*_*",
          type: "bold",
          data: {
            value: "_",
            innerStyles: [
              {
                data: {
                  value: "_",
                },
                length: 1,
                offset: 0,
                type: "text",
              },
            ],
          },
        });

        expect(result[4]).toEqual({
          offset: 36,
          length: 3,
          origin: "_*_",
          type: "italic",
          data: {
            value: "*",
            innerStyles: [
              {
                data: {
                  value: "*",
                },
                length: 1,
                offset: 0,
                type: "text",
              },
            ],
          },
        });
      });
    });

    describe("when inline code contain bold or italic tag", () => {
      it("should tokenize properly ", () => {
        const result = regexTokenizer("`*_bold_*` `_한글_` `난*빙글*`");
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
          offset: 0,
          length: 10,
          origin: "`*_bold_*`",
          type: "inlineCode",
          data: {
            value: "*_bold_*",
            innerStyles: [
              {
                data: {
                  innerStyles: [
                    {
                      data: {
                        innerStyles: [
                          {
                            data: {
                              value: "bold",
                            },
                            length: 4,
                            offset: 0,
                            type: "text",
                          },
                        ],
                        value: "bold",
                      },
                      length: 6,
                      offset: 0,
                      origin: "_bold_",
                      type: "italic",
                    },
                  ],
                  value: "_bold_",
                },
                length: 8,
                offset: 0,
                origin: "*_bold_*",
                type: "bold",
              },
            ],
          },
        });

        expect(result[1]).toEqual({
          offset: 11,
          length: 6,
          origin: "`_한글_`",
          type: "inlineCode",
          data: {
            value: "_한글_",
            innerStyles: [
              {
                data: {
                  innerStyles: [
                    {
                      data: {
                        value: "한글",
                      },
                      length: 2,
                      offset: 0,
                      type: "text",
                    },
                  ],
                  value: "한글",
                },
                length: 4,
                offset: 0,
                origin: "_한글_",
                type: "italic",
              },
            ],
          },
        });

        expect(result[2]).toEqual({
          offset: 18,
          length: 7,
          origin: "`난*빙글*`",
          type: "inlineCode",
          data: {
            value: "난*빙글*",
            innerStyles: [
              {
                data: {
                  value: "난",
                },
                length: 1,
                offset: 0,
                type: "text",
              },
              {
                data: {
                  innerStyles: [
                    {
                      data: {
                        value: "빙글",
                      },
                      length: 2,
                      offset: 0,
                      type: "text",
                    },
                  ],
                  value: "빙글",
                },
                length: 4,
                offset: 1,
                origin: "*빙글*",
                type: "bold",
              },
            ],
          },
        });
      });
    });

    describe("when given <attr></attr>", () => {
      describe("as single use case", () => {
        it("should return properly", () => {
          const resultArray = regexTokenizer(
            `hello world <attr fc="red" bc="blue" c>Korea</attr>`,
          );
          const result = resultArray[0];

          expect(resultArray).toHaveLength(1);
          expect(result).toHaveProperty("type", "attr");
          expect(result?.data).toHaveProperty("properties", {
            "font-color": "red",
            "background-color": "blue",
            code: true,
          });
          expect(result?.data).toHaveProperty("value", "Korea");
        });
      });

      describe("as nested use case", () => {
        it("should return properly", () => {
          const resultArray = regexTokenizer(
            `hello world <attr fc="red" bc="blue">Korea</attr>. <attr fw="body2">description <attr fw="700">here</attr></attr>`,
          );

          const result = resultArray[0];
          const result2 = resultArray[1];
          expect(resultArray).toHaveLength(2);
          expect(result).toHaveProperty("type", "attr");
          expect(result?.data).toHaveProperty("properties", {
            "font-color": "red",
            "background-color": "blue",
          });
          expect(result?.data).toHaveProperty("value", "Korea");

          expect(result2).toHaveProperty("type", "attr");
          expect(result2?.data).toHaveProperty("properties", {
            "font-weight": "body2",
          });
          expect(
            (result2 as Moim.VGMarkDownTextView.IAttrTextToken).data
              .innerStyles,
          ).toHaveLength(2);
          expect(result2?.data).toHaveProperty(
            "value",
            'description <attr fw="700">here</attr>',
          );
        });
      });
    });
  });

  describe("plainTextTokenizer()", () => {
    it("should return text token", () => {
      const result = plainTextTokenizer("가나다 *`라마바`* 사아자차`카`.", [
        {
          origin: "",
          offset: 4,
          length: 7,
          type: "bold",
          data: {
            value: "_라마바_",
            innerStyles: [
              {
                origin: "",
                offset: 0,
                length: 5,
                type: "bold",
                data: {
                  value: "라마바",
                  innerStyles: [],
                },
              },
            ],
          },
        },
        {
          origin: "",
          offset: 16,
          length: 3,
          type: "inlineCode",
          data: {
            value: "카",
            innerStyles: [],
          },
        },
      ]);

      expect(result).toHaveLength(5);
      expect(result[2]).toEqual({
        offset: 0,
        length: 4,
        type: "text",
        data: { value: "가나다 " },
      });
      expect(result[3]).toEqual({
        offset: 11,
        length: 5,
        type: "text",
        data: { value: " 사아자차" },
      });
      expect(result[4]).toEqual({
        offset: 19,
        length: 1,
        type: "text",
        data: { value: "." },
      });
    });
  });

  describe("reorderTokens()", () => {
    it("should sort by asc", () => {
      const result = reorderTokens([
        {
          origin: "",
          offset: 4,
          length: 7,
          type: "bold",
          data: {
            value: "_라마바_",
            innerStyles: [],
          },
        },
        {
          origin: "",
          offset: 4,
          length: 3,
          type: "inlineCode",
          data: {
            value: "카",
            innerStyles: [],
          },
        },
        {
          origin: "",
          offset: 7,
          length: 13,
          type: "inlineCode",
          data: {
            value: "car",
            innerStyles: [],
          },
        },
        {
          origin: "",
          offset: 7,
          length: 1,
          type: "inlineCode",
          data: {
            value: "velocity",
            innerStyles: [],
          },
        },
        {
          origin: "",
          offset: 0,
          length: 4,
          type: "bold",
          data: {
            value: "가나다!",
            innerStyles: [],
          },
        },
      ]);

      expect(result).toHaveLength(5);
      expect(result[0].offset).toBe(0);
      expect(result[0].length).toBe(4);

      expect(result[1].offset).toBe(4);
      expect(result[1].length).toBe(3);

      expect(result[2].offset).toBe(4);
      expect(result[2].length).toBe(7);

      expect(result[3].offset).toBe(7);
      expect(result[3].length).toBe(1);

      expect(result[4].offset).toBe(7);
      expect(result[4].length).toBe(13);
    });
  });
});
