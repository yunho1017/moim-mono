import { INITIAL_STATE, reducer } from "../subgroup";
import { ActionCreators } from "app/actions/tag";

describe("subgroupData reducer", () => {
  let state: Moim.SubGroup.ISubGroupData;

  describe("when receive SUCCEEDED_GET_TAGS", () => {
    describe("first fetched data", () => {
      it("should set tags", () => {
        state = reducer(
          INITIAL_STATE,
          ActionCreators.succeededGetTags({
            data: ["t1234"],
            paging: {
              after: "1",
            },
          }),
        );

        expect(state.tags.data).toHaveLength(1);
        expect(state.tags.paging).toHaveProperty("after", "1");
      });
    });

    describe("already fetched data", () => {
      it("should set tags", () => {
        state = reducer(
          {
            ...INITIAL_STATE,
            tags: {
              data: ["t777"],
              paging: { after: "1" },
            },
          },
          ActionCreators.succeededGetTags({
            data: ["t1234"],
            paging: {
              after: "2",
            },
          }),
        );

        expect(state.tags.data).toHaveLength(2);
        expect(state.tags.paging).toHaveProperty("after", "2");
      });
    });
  });

  describe("when receive SUCCEEDED_CREATE_TAG", () => {
    it("should append new tag", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          tags: {
            data: ["t777"],
            paging: { after: "1" },
          },
        },
        ActionCreators.succeededCreateTag("t111"),
      );

      expect(state.tags.data).toHaveLength(2);
      expect(state.tags.data[1]).toBe("t111");
    });
  });
});
