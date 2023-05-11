import { INITIAL_STATE, reducer } from "../position";
import { ActionCreators } from "app/actions/position";
import { RAW } from "app/__mocks__";
import { MOCK_ERROR } from "common/helpers/mockingCancelToken";

describe("Position Reducer", () => {
  const positionId = "P1234";

  describe("when dispatch START_GET_POSITIONS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(INITIAL_STATE, ActionCreators.startGetPositions());

      expect(state.getPositionsLoading).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_GET_POSITIONS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedGetPositions({
          positions: { data: [positionId], paging: {} },
        }),
      );

      expect(state.positions.data).toEqual([positionId]);
      expect(state.positions.paging).toEqual({});
      expect(state.getPositionsLoading).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_POSITIONS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedGetPositions({}),
      );

      expect(state.getPositionsLoading).toBeFalsy();
    });
  });

  describe("when dispatch START_GET_POSITION Action", () => {
    it("should change getPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startGetPosition({ positionId }),
      );

      expect(state.getPositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_GET_POSITION Action", () => {
    it("should change getPositionsLoading is falsy and contain positionId", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedGetPosition({
          position: {
            data: positionId,
          },
        }),
      );

      expect(state.positions.data).toContain(positionId);
      expect(state.getPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_POSITION Action", () => {
    it("should change getPositionsLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedGetPosition({ positionId }),
      );

      expect(state.getPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_GET_POSITIONS_BATCH Action", () => {
    it("should change getPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startGetPositionsBatch({ positionIds: [positionId] }),
      );

      expect(state.getPositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_GET_POSITIONS_BATCH Action", () => {
    it("should change getPositionLoading is falsy and contain positionIds", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedGetPositionsBatch({
          positions: { data: [positionId], paging: {} },
        }),
      );

      expect(state.positions.data).toContain(positionId);
      expect(state.getPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_POSITIONS_BATCH Action", () => {
    it("should change getPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedGetPositionsBatch({ positionIds: [positionId] }),
      );

      expect(state.getPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_CREATE_POSITION Action", () => {
    it("should change createPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startCreatePosition(),
      );

      expect(state.createPositionLoading).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_CREATE_POSITION Action", () => {
    it("should change createPositionLoading is falsy and container positionId", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedCreatePosition({
          position: { data: positionId },
        }),
      );

      expect(state.positions.data).toContain(positionId);
      expect(state.createPositionLoading).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_CREATE_POSITION Action", () => {
    it("should change createPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedCreatePosition({}),
      );

      expect(state.createPositionLoading).toBeFalsy();
    });
  });

  describe("when dispatch START_APPOINT_POSITION Action", () => {
    it("should change appointPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startAppointPosition({ positionId }),
      );

      expect(state.appointPositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_APPOINT_POSITION Action", () => {
    it("should change appointPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedAppointPosition({
          position: { data: positionId },
          members: { data: ["U123"], paging: {} },
        }),
      );

      expect(state.appointPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_APPOINT_POSITION Action", () => {
    it("should change appointPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedAppointPosition({ positionId }),
      );

      expect(state.appointPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_DISMISS_POSITION Action", () => {
    it("should change dismissPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startDismissPosition({ positionId }),
      );

      expect(state.dismissPositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_DISMISS_POSITION Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedDismissPosition({
          position: { data: positionId },
          members: { data: ["U123"], paging: {} },
        }),
      );

      expect(state.dismissPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_DISMISS_POSITION Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedDismissPosition({
          positionId,
        }),
      );

      expect(state.dismissPositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_UPDATE_POSITION_INFO Action", () => {
    it("should change dismissPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startUpdatePositionInfo({ positionId }),
      );

      expect(state.updatePositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_UPDATE_POSITION_INFO Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedUpdatePositionInfo({
          position: { data: positionId },
        }),
      );

      expect(state.updatePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_UPDATE_POSITION_INFO Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedUpdatePositionInfo({
          positionId,
        }),
      );

      expect(state.updatePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_UPDATE_POSITION_PRIORITY Action", () => {
    it("should change dismissPositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startUpdatePositionPriority({ positionId }),
      );

      expect(state.updatePositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_UPDATE_POSITION_PRIORITY Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedUpdatePositionPriority({
          position: RAW.POSITION,
        }),
      );

      expect(state.updatePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_UPDATE_POSITION_PRIORITY Action", () => {
    it("should change dismissPositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedUpdatePositionPriority({
          positionId,
        }),
      );

      expect(state.updatePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_DELETE_POSITION Action", () => {
    it("should change deletePositionLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startDeletePosition({ positionId }),
      );

      expect(state.deletePositionLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_DELETE_POSITION Action", () => {
    it("should change deletePositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedDeletePosition({
          position: { data: positionId },
        }),
      );

      expect(state.deletePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_DELETE_POSITION Action", () => {
    it("should change deletePositionLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedDeletePosition({
          positionId,
          error: MOCK_ERROR,
        }),
      );

      expect(state.deletePositionLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch START_GET_POSITION_MEMBERS Action", () => {
    it("should change getPositionMembersLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startGetPositionMembers({ positionId }),
      );

      expect(state.getPositionMembersLoading[positionId]).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEED_GET_POSITION_MEMBERS Action", () => {
    it("should change getPositionMembersLoading is falsy and contain memberMap", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedGetPositionMembers({
          positionId,
          members: {
            data: ["U1234", "U5678"],
            paging: {},
          },
        }),
      );

      expect(state.positionMemberMap[positionId]).toEqual({
        data: ["U1234", "U5678"],
        paging: {},
      });
      expect(state.getPositionMembersLoading[positionId]).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_POSITION_MEMBERS Action", () => {
    it("should change getPositionMembersLoading is falsy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedGetPositionMembers({
          positionId,
        }),
      );

      expect(state.getPositionMembersLoading[positionId]).toBeFalsy();
    });
  });
});
