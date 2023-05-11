import { searchMission } from "../utils";

const TARGET_NODE = {
  id: "DM-3D3ZY1ED",
  type: "EVENT",
  schemeId: "COMMUNITYSERVICE|input-answer",
  title: "정답 입력",
  imageUrl: "https://s0.vingle.net/icon/24_quest_default.png",
  verification: {
    type: "FILTER",
    filter: {
      fieldName: "answer",
      operation: {
        operator: "EQ",
        value: "jay",
      },
    },
  },
  frequency: {
    value: 1,
    sampling: "EACH",
  },
  action: {
    title: "입니다!",
    payloads: [],
    form: {
      type: "text-input",
      description: "혜인씌의 영어이름은 뭘까요",
    },
    errorMessage: "오답입니다. 다시 도전해보세요!",
    disabled: false,
  },
};

const GROUP_NODE_MOCK = {
  type: "OR",
  children: [
    {
      id: "DM-3D3ZY4NJ",
      type: "EVENT",
      schemeId: "COMMUNITYSERVICE|attendance",
      title: "퀘스트 버튼 클릭",
      imageUrl: "https://s0.vingle.net/icon/24_quest_default.png",
      frequency: {
        value: 3,
        sampling: "EACH",
      },
      action: {
        disabled: false,
      },
    },
    TARGET_NODE,
    {
      id: "DM-3D3ZY615",
      type: "EVENT",
      schemeId: "m2jS9FqfWIurjHreEbdt4XoWPl88DVRQ|write-reply",
      title: "댓글 작성",
      imageUrl: "https://s0.vingle.net/icon/24_quest_default.png",
      frequency: {
        value: 1,
        sampling: "EACH",
      },
      action: {
        disabled: false,
      },
    },
  ],
};

describe("DQuest Missionary utils", () => {
  describe("searchMission()", () => {
    describe("case 0-depth(direct), not exists MissionID", () => {
      it("should return Event node", () => {
        const result = searchMission(TARGET_NODE as any, "weirdo-mission");
        expect(result).toBeUndefined();
      });
    });

    describe("case 2-depth(grouping), not exists MissionID", () => {
      it("should return Event node", () => {
        const result = searchMission(
          {
            type: "AND",
            children: [GROUP_NODE_MOCK],
          } as any,
          "weirdo-mission",
        );
        expect(result).toBeUndefined();
      });
    });

    describe("case 0-depth(direct) Node given", () => {
      it("should return Event node", () => {
        const result = searchMission(TARGET_NODE as any, TARGET_NODE.id);
        expect(result).toEqual(TARGET_NODE);
      });
    });

    describe("case 1-depth(grouping) Node given", () => {
      it("should return Event node", () => {
        const result = searchMission(GROUP_NODE_MOCK as any, TARGET_NODE.id);
        expect(result).toEqual(TARGET_NODE);
      });
    });

    describe("case 2-depth(grouping) Node given", () => {
      it("should return Event node", () => {
        const result = searchMission(
          {
            type: "AND",
            children: [GROUP_NODE_MOCK],
          } as any,
          TARGET_NODE.id,
        );
        expect(result).toEqual(TARGET_NODE);
      });
    });

    describe("case 3-depth(grouping) Node given", () => {
      it("should return Event node", () => {
        const result = searchMission(
          {
            type: "AND",
            children: [
              {
                type: "OR",
                children: [
                  {
                    id: "DM-3D3ZY4NJ",
                    type: "EVENT",
                    schemeId: "COMMUNITYSERVICE|attendance",
                    title: "퀘스트 버튼 클릭",
                    imageUrl: "https://s0.vingle.net/icon/24_quest_default.png",
                    frequency: {
                      value: 3,
                      sampling: "EACH",
                    },
                    action: {
                      disabled: false,
                    },
                  },
                ],
              },
              { type: "OR", children: [GROUP_NODE_MOCK] },
            ],
          } as any,
          TARGET_NODE.id,
        );
        expect(result).toEqual(TARGET_NODE);
      });
    });
  });
});
