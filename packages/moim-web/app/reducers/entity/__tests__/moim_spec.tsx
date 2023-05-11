import { ActionCreators } from "app/actions/entity";
import { reducer as moimReducer } from "../moim";
import { NORMALIZED, RAW } from "app/__mocks__";

describe("Moim Entity Reducer", () => {
  describe("when dispatch ADD_ENTITY Action", () => {
    it("should added moim entity", () => {
      const state = moimReducer(
        {},
        ActionCreators.addEntity(NORMALIZED.MOIM.entities),
      );
      expect(state![NORMALIZED.MOIM.result]).not.toBeUndefined();
      expect(state![NORMALIZED.MOIM.result]).toEqual({
        user: RAW.GROUP_WITH_USER.user.id,
        group: RAW.GROUP_WITH_USER.group.id,
      });
    });
  });
});
