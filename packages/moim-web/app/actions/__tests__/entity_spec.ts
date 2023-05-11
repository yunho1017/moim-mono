import { advanceTo, clear } from "jest-date-mock";
import { RAW } from "app/__mocks__";
import { initialState as appInitialState } from "app/rootReducer";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { makeLoadEntityRecord, loadEntitiesDirectCore } from "../entity";

// Mocking for userEntity lastModified expired test
jest.mock("common/helpers/batchService", () => ({
  getNormalizedBatchDataFromEntities: () => {
    return {
      users: {
        U222: {
          group_id: "G123456",
          id: "U222",
          name: "Farid Amini",
          bio: "Kinshasa",
          tz: "Asia/Seoul",
          is_deactivated: false,
          is_bot: false,
          avatar_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlclqXTyecUXvEkIog0MbNWn2DIgwtad491j2Wx8BinUuorzQ&s",
          encrypted_email: "1234565",
          positions: [],
        },
      },
    };
  },
}));

const makeFakeMessageWithFileBlock = (userId: Moim.Id, fileId: Moim.Id) =>
  ({
    ...RAW.NORMALIZED_MESSAGE_WITH_FILE_BLOCK,
    user: userId,
    blocks: [
      {
        type: "file",
        files: [
          {
            id: fileId,
            title: "",
          },
        ],
      },
    ],
    blockit: [
      {
        type: "file",
        files: [fileId],
      },
    ],
  } as any);

describe("entity actions", () => {
  describe("makeLoadEntityRecord()", () => {
    describe("when channel data", () => {
      it("should resolve user & group data", () => {
        expect(
          makeLoadEntityRecord({
            conversations: {
              C1234: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: "U1234",
                group: "G1234",
              },
              C1235: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: "U1235",
                group: "G1234",
              },
            },
          }),
        ).toEqual({
          users: ["U1234", "U1235"],
          groups: ["G1234"],
        });
      });
    });

    describe("when message data", () => {
      it("should resolve user data", () => {
        expect(
          makeLoadEntityRecord({
            messages: {
              M1234: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1234",
              },
              M1235: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1235",
              },
              M1236: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1234",
              },
            },
          }),
        ).toEqual({
          users: ["U1234", "U1235"],
        });
      });
    });

    describe("when message data has file block", () => {
      it("should resolve user & file data", () => {
        const result = makeLoadEntityRecord({
          messages: {
            M1234: makeFakeMessageWithFileBlock("U1234", "F1232"),

            M1235: makeFakeMessageWithFileBlock("U1235", "F1238"),

            M1236: makeFakeMessageWithFileBlock("U1234", "F1236"),
          },
          blockits: {
            F1232: {
              id: "F1232",
              title: "",
            },
            F1238: {
              id: "F1238",
              title: "",
            },
            F1236: {
              id: "F1236",
              title: "",
            },
          },
        });

        expect(result).toEqual({
          files: ["F1232", "F1238", "F1236"],
          users: ["U1234", "U1235"],
        });
      });
    });

    describe("when thread data", () => {
      it("should resolve user data", () => {
        expect(
          makeLoadEntityRecord({
            threads: {
              T1234: {
                ...RAW.THREAD,
                user: "U1234",
              } as any,
            },
          }),
        ).toEqual({
          users: ["U1234"],
        });
      });
    });

    describe("when thread + message + channel data", () => {
      it("should resolve user + group data uniq", () => {
        expect(
          makeLoadEntityRecord({
            threads: {
              T1234: {
                ...RAW.THREAD,
                user: "U1234",
              } as any,
            },
            messages: {
              M1234: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1234",
              },
              M1235: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1235",
              },
              M1236: {
                ...RAW.NORMALIZED_MESSAGE,
                user: "U1234",
              },
            },
            conversations: {
              C1234: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: "U1234",
                group: "G1234",
              },
              C1235: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: "U1235",
                group: "G1234",
              },
            },
          }),
        ).toEqual({
          users: ["U1234", "U1235"],
          groups: ["G1234"],
        });
      });
    });
  });

  describe("when user data", () => {
    it("should resolve user + position data uniq", () => {
      const result = makeLoadEntityRecord({
        users: {
          U1234: {
            ...RAW.MEMBER,
            id: "U1234",
            positions: ["P1", "P2"],
          },
        },
      });
      expect(result).toEqual({
        positions: ["P1", "P2"],
      });
    });

    describe("when some data has expired", () => {
      let store: IThunkMockState;

      beforeEach(() => {
        store = generateMockStore({
          ...appInitialState,
          entities: {
            ...appInitialState.entities,
            users: {
              U1234: {
                ...RAW.MEMBER,
                id: "U1234",
                positions: ["P1", "P2"],
                cachedAt: 1597528943356,
              },

              U222: {
                ...RAW.MEMBER,
                id: "U222",
                positions: [],
                cachedAt: 1597521743356, // 2hours before
              },
            },
          },
        });
        store.clearActions();
      });

      afterAll(() => {
        clear();
      });

      it("should return expired id", async () => {
        advanceTo(new Date(1597528943356));
        await store.dispatch(
          loadEntitiesDirectCore({ users: ["U1234", "U222"] }),
        );
        const actions = store.getActions();

        expect(actions[0].payload.users).toHaveProperty("U222");
      });
    });
  });
});
