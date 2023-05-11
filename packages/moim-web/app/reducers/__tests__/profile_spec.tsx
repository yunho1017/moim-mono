import { INITIAL_STATE, reducer } from "../profile";
import { ProfileTypes, UserTypes } from "app/actions/types";
import { RAW } from "app/__mocks__";

describe("Profile state reducer", () => {
  describe("when dispatch SUCCEED_FETCHING_PROFILE action", () => {
    it("should change targetUserId", () => {
      const state = reducer(INITIAL_STATE, {
        type: ProfileTypes.SUCCEED_FETCHING_PROFILE,
        payload: {
          userId: "U1234",
        },
      });

      expect(state.targetUserId).toBe("U1234");
    });
  });

  describe("when dispatch START_GET_PROFILE_BLOCKS", () => {
    describe("already have same user", () => {
      it("should set loading blocks", () => {
        const state = reducer(
          {
            ...INITIAL_STATE,
            showBlocks: {
              U1234: [],
            },
          },
          {
            type: UserTypes.START_GET_PROFILE_BLOCKS,
            payload: {
              userId: "U1234",
              viewType: "show",
            },
          },
        );

        expect(state.previewBlocks.U1234).toBeUndefined();
        expect(state.showBlocks.U1234).not.toBeUndefined();
        expect(state.showBlocks.U1234).toHaveLength(0);
      });
    });
    describe("first time save user", () => {
      it("should set loading blocks", () => {
        const state = reducer(INITIAL_STATE, {
          type: UserTypes.START_GET_PROFILE_BLOCKS,
          payload: {
            userId: "U1234",
            viewType: "show",
          },
        });

        expect(state.previewBlocks.U1234).toBeUndefined();
        expect(state.showBlocks.U1234).not.toBeUndefined();
        expect(state.showBlocks.U1234).toHaveLength(1);
        expect(state.showBlocks.U1234[0]).toMatchObject({ type: "loading" });
      });
    });
  });

  describe("when dispatch SUCCEEDED_GET_PROFILE_BLOCKS", () => {
    it("should set blocks", () => {
      const state = reducer(
        {
          ...INITIAL_STATE,
          showBlocks: {
            U1234: [{ type: "loading" }],
          },
        },
        {
          type: UserTypes.SUCCEEDED_GET_PROFILE_BLOCKS,
          payload: {
            userId: "U1234",
            viewType: "show",
            blocks: RAW.PROFILE_SHOW_BLOCKITS,
          },
        },
      );

      expect(state.previewBlocks.U1234).toBeUndefined();
      expect(state.showBlocks.U1234).not.toBeUndefined();
      expect(state.showBlocks.U1234).toHaveLength(
        RAW.PROFILE_SHOW_BLOCKITS.length,
      );
      expect(state.showBlocks.U1234).toEqual(RAW.PROFILE_SHOW_BLOCKITS);
    });
  });

  describe("when dispatch FAILED_GET_PROFILE_BLOCKS", () => {
    it("should filter loading block", () => {
      const state = reducer(
        {
          ...INITIAL_STATE,
          showBlocks: {
            U1234: [{ type: "loading" }],
          },
        },
        {
          type: UserTypes.FAILED_GET_PROFILE_BLOCKS,
          payload: {
            userId: "U1234",
            viewType: "show",
          },
        },
      );

      expect(state.previewBlocks.U1234).toBeUndefined();
      expect(state.showBlocks.U1234).not.toBeUndefined();
      expect(state.showBlocks.U1234).toHaveLength(0);
    });
  });
});
