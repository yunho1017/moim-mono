import { fileSelector } from "../file";
import { initialState } from "app/rootReducer";
import { RAW } from "../../__mocks__";

describe("fill selector", () => {
  const MOCK_USER_ID = "U1234";
  const MOCK_FILE_ID = "F1234";

  describe("fileSelector", () => {
    describe("when entity has target file data", () => {
      it("should return combined data", () => {
        const result = fileSelector(
          {
            ...initialState,
            entities: {
              ...initialState.entities,
              users: {
                [MOCK_USER_ID]: {
                  ...RAW.MEMBER,
                  user_id: MOCK_USER_ID,
                  name: "tester",
                } as any,
              },
              files: {
                [MOCK_FILE_ID]: {
                  ...RAW.FILE_IMAGE.data,
                  id: MOCK_FILE_ID,
                  user: MOCK_USER_ID,
                },
              },
            },
          },
          MOCK_FILE_ID,
        );

        expect(result.id).toBe(MOCK_FILE_ID);
        expect(result).toHaveProperty("user");
        expect(result.user).toHaveProperty("user_id", MOCK_USER_ID);
      });
    });
  });
});
