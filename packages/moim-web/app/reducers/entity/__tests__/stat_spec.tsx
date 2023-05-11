import { ActionCreators } from "app/actions/entity";
import { reducer as statReducer } from "../stat";

describe("Stat Entity Reducer", () => {
  describe("when dispatch ADD_ENTITY Action", () => {
    it("should added thread entity", () => {
      const state = statReducer(
        {
          T124: {
            count: 0,
            has_new: false,
            last_read: "R123123",
            updated_at: 0,
          },
        },
        ActionCreators.addEntity({
          stats: {
            T123: {
              count: 0,
              has_new: false,
              last_read: "R123123",
              updated_at: 0,
            },
            T124: { count: 0, has_new: false, last_read: "", updated_at: 0 },
          },
        }),
      );

      expect(state!.T123).not.toBeUndefined();
      expect(state!.T124.last_read).toEqual("R123123");
    });
  });
});
