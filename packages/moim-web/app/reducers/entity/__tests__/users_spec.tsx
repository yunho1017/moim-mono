import { ActionCreators } from "app/actions/entity";
import { ActionCreators as MeActionCreators } from "app/actions/me";
import { reducer as usersReducer } from "../users";
import { RAW } from "app/__mocks__";

describe("Users Entity Reducer", () => {
  describe("when dispatch ADD_ENTITY Action", () => {
    it("should added thread entity", () => {
      const state = usersReducer(
        {},
        ActionCreators.addEntity({
          users: {
            U123: { ...RAW.NORMALIZED_MEMBER, id: "U123", name: "user01" },
            U124: { ...RAW.NORMALIZED_MEMBER, id: "U124", name: "user02" },
          },
        }),
      );

      expect(state!.U123).not.toBeUndefined();
      expect(state!.U124).not.toBeUndefined();
    });
  });

  describe("when dispatch SUCCEEDED_CHANGE_MY_PROFILE", () => {
    it("should update as new", () => {
      const state = usersReducer(
        {
          U123: { ...RAW.NORMALIZED_MEMBER, id: "U123", name: "user01" },
        },
        MeActionCreators.succeededChangeMyProfile({
          ...RAW.MEMBER,
          id: "U123",
          name: "new name",
        }),
      );

      expect(state!.U123).not.toBeUndefined();
      expect(state!.U123.name).toBe("new name");
    });
  });
});
