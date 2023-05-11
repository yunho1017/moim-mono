import { userSelector } from "../user";
import { initialState } from "app/rootReducer";
import { RAW } from "../../__mocks__";

describe("user selector", () => {
  const MOCK_USER_ID = "U1234";
  const MOCK_GROUP_ID = "G1234";

  describe("userSelector", () => {
    describe("when entity has target user data", () => {
      it("should return combined data", () => {
        const user = userSelector(
          {
            ...initialState,
            entities: {
              ...initialState.entities,
              users: {
                [MOCK_USER_ID]: {
                  ...RAW.NORMALIZED_MEMBER,
                  user_id: MOCK_USER_ID,
                  name: "tester",
                  group_id: MOCK_GROUP_ID,
                  group: MOCK_GROUP_ID,
                } as any,
              },
            },
          },
          MOCK_USER_ID,
        );

        expect(user).toHaveProperty("user_id", MOCK_USER_ID);
        expect(user).toHaveProperty("name", "tester");
      });
    });
  });
});
