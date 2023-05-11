jest.mock("common/api/position");
jest.mock("common/api/user");

import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import {
  appointPositionBase,
  createPosition,
  deletePosition,
  dismissPosition,
  getPosition,
  getPositionMembers,
  getPositions,
  getPositionsBatch,
  updatePositionInfo,
  updatePositionPriority,
} from "../position";
import { EntityTypes, PositionTypes } from "../types";

describe("Position Action", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getPositions()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_POSITIONS, ADD_ENTITY, SUCCEED_GET_POSITIONS action", async () => {
        await store.dispatch(
          getPositions({
            limit: 10,
            after: "P1234",
          }),
        );

        const [
          startGetPositions,
          addEntity,
          succeedGetPositions,
        ] = store.getActions();

        expect(startGetPositions).toMatchObject({
          type: PositionTypes.START_GET_POSITIONS,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetPositions).toMatchObject({
          type: PositionTypes.SUCCEED_GET_POSITIONS,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_POSITIONS, FAILED_GET_POSITIONS", async () => {
        await store.dispatch(
          getPositions(
            {
              limit: 10,
              after: "P1234",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startGetPositions, failedGetPositions] = store.getActions();

        expect(startGetPositions).toMatchObject({
          type: PositionTypes.START_GET_POSITIONS,
        });

        expect(failedGetPositions).toMatchObject({
          type: PositionTypes.FAILED_GET_POSITIONS,
        });
      });
    });
  });

  describe("getPosition()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_POSITION, ADD_ENTITY, SUCCEED_GET_POSITION action", async () => {
        await store.dispatch(
          getPosition({
            positionId: "P1234",
          }),
        );

        const [
          startGetPosition,
          addEntity,
          succeedGetPosition,
        ] = store.getActions();

        expect(startGetPosition).toMatchObject({
          type: PositionTypes.START_GET_POSITION,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetPosition).toMatchObject({
          type: PositionTypes.SUCCEED_GET_POSITION,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_POSITION, FAILED_GET_POSITION", async () => {
        await store.dispatch(
          getPosition(
            {
              positionId: "P1234",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startGetPosition, failedGetPosition] = store.getActions();

        expect(startGetPosition).toMatchObject({
          type: PositionTypes.START_GET_POSITION,
        });

        expect(failedGetPosition).toMatchObject({
          type: PositionTypes.FAILED_GET_POSITION,
        });
      });
    });
  });

  describe("getPositionsBatch()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_POSITIONS_BATCH, ADD_ENTITY, SUCCEED_GET_POSITIONS_BATCH action", async () => {
        await store.dispatch(
          getPositionsBatch({
            positions: ["P1234", "P5678"],
          }),
        );

        const [
          startGetPositionsBatch,
          addEntity,
          succeedGetPositionsBatch,
        ] = store.getActions();

        expect(startGetPositionsBatch).toMatchObject({
          type: PositionTypes.START_GET_POSITIONS_BATCH,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetPositionsBatch).toMatchObject({
          type: PositionTypes.SUCCEED_GET_POSITIONS_BATCH,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_POSITIONS_BATCH, FAILED_GET_POSITIONS_BATCH", async () => {
        await store.dispatch(
          getPositionsBatch(
            {
              positions: ["P1234", "P5678"],
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startGetPositionsBatch,
          failedGetPositionsBatch,
        ] = store.getActions();

        expect(startGetPositionsBatch).toMatchObject({
          type: PositionTypes.START_GET_POSITIONS_BATCH,
        });

        expect(failedGetPositionsBatch).toMatchObject({
          type: PositionTypes.FAILED_GET_POSITIONS_BATCH,
        });
      });
    });
  });

  describe("createPosition()", () => {
    describe("when succeed", () => {
      it("should dispatch START_CREATE_POSITION, ADD_ENTITY, SUCCEED_CREATE_POSITION action", async () => {
        await store.dispatch(
          createPosition({
            position: {
              name: "Position",
              color: "#FF7100",
              description: "Test Position",
            },
          }),
        );

        const [
          startCreatePosition,
          addEntity,
          succeedCreatePosition,
        ] = store.getActions();

        expect(startCreatePosition).toMatchObject({
          type: PositionTypes.START_CREATE_POSITION,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedCreatePosition).toMatchObject({
          type: PositionTypes.SUCCEED_CREATE_POSITION,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_CREATE_POSITION, FAILED_CREATE_POSITION", async () => {
        await store.dispatch(
          createPosition(
            {
              position: {
                name: "Position",
                color: "#FF7100",
                description: "Test Position",
              },
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startCreatePosition, failedCreatePosition] = store.getActions();

        expect(startCreatePosition).toMatchObject({
          type: PositionTypes.START_CREATE_POSITION,
        });

        expect(failedCreatePosition).toMatchObject({
          type: PositionTypes.FAILED_CREATE_POSITION,
        });
      });
    });
  });

  describe("appointPosition()", () => {
    describe("when succeed", () => {
      it("should dispatch START_APPOINT_POSITION, ADD_ENTITY, SUCCEED_APPOINT_POSITION action", async () => {
        await store.dispatch(
          appointPositionBase(
            {
              positionId: "P1234",
              appoint: {
                users: ["U1234"],
              },
            },
            { succeed: "", failed: "" },
          ),
        );

        const [
          startAppointPosition,
          addEntity,
          addEntity2,
          succeedAppointPosition,
        ] = store.getActions();

        expect(startAppointPosition).toMatchObject({
          type: PositionTypes.START_APPOINT_POSITION,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(addEntity2).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedAppointPosition).toMatchObject({
          type: PositionTypes.SUCCEED_APPOINT_POSITION,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_APPOINT_POSITION, FAILED_APPOINT_POSITION", async () => {
        await store.dispatch(
          appointPositionBase(
            {
              positionId: "P1234",
              appoint: {
                users: ["U1234"],
              },
            },
            { succeed: "", failed: "" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startAppointPosition,
          failedAppointPosition,
        ] = store.getActions();

        expect(startAppointPosition).toMatchObject({
          type: PositionTypes.START_APPOINT_POSITION,
        });

        expect(failedAppointPosition).toMatchObject({
          type: PositionTypes.FAILED_APPOINT_POSITION,
        });
      });
    });
  });

  describe("dismissPosition()", () => {
    describe("when succeed", () => {
      it("should dispatch START_DISMISS_POSITION, ADD_ENTITY, SUCCEED_DISMISS_POSITION action", async () => {
        await store.dispatch(
          dismissPosition(
            {
              positionId: "P1234",
              dismiss: {
                users: ["U1234"],
              },
            },
            { succeed: "", failed: "" },
          ),
        );

        const [
          startDismissPosition,
          addEntity,
          addEntity2,
          succeedDismissPosition,
        ] = store.getActions();

        expect(startDismissPosition).toMatchObject({
          type: PositionTypes.START_DISMISS_POSITION,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(addEntity2).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedDismissPosition).toMatchObject({
          type: PositionTypes.SUCCEED_DISMISS_POSITION,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_DISMISS_POSITION, FAILED_DISMISS_POSITION", async () => {
        await store.dispatch(
          dismissPosition(
            {
              positionId: "P1234",
              dismiss: {
                users: ["U1234"],
              },
            },
            { succeed: "", failed: "" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startDismissPosition,
          failedDismissPosition,
        ] = store.getActions();

        expect(startDismissPosition).toMatchObject({
          type: PositionTypes.START_DISMISS_POSITION,
        });

        expect(failedDismissPosition).toMatchObject({
          type: PositionTypes.FAILED_DISMISS_POSITION,
        });
      });
    });
  });

  describe("updatePositionInfo()", () => {
    describe("when succeed", () => {
      it("should dispatch START_UPDATE_POSITION_INFO, ADD_ENTITY, SUCCEED_UPDATE_POSITION_INFO action", async () => {
        await store.dispatch(
          updatePositionInfo({
            positionId: "P1234",
            position: {
              name: "Hello",
              description: "Good",
              color: "#FF7100",
            },
          }),
        );

        const [
          startUpdatePositionInfo,
          addEntity,
          succeedUpdatePositionInfo,
        ] = store.getActions();

        expect(startUpdatePositionInfo).toMatchObject({
          type: PositionTypes.START_UPDATE_POSITION_INFO,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedUpdatePositionInfo).toMatchObject({
          type: PositionTypes.SUCCEED_UPDATE_POSITION_INFO,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_UPDATE_POSITION_INFO, FAILED_UPDATE_POSITION_INFO", async () => {
        await store.dispatch(
          updatePositionInfo(
            {
              positionId: "P1234",
              position: {
                name: "Hello",
                description: "Good",
                color: "#FF7100",
              },
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startUpdatePositionInfo,
          failedUpdatePositionInfo,
        ] = store.getActions();

        expect(startUpdatePositionInfo).toMatchObject({
          type: PositionTypes.START_UPDATE_POSITION_INFO,
        });

        expect(failedUpdatePositionInfo).toMatchObject({
          type: PositionTypes.FAILED_UPDATE_POSITION_INFO,
        });
      });
    });
  });

  describe("updatePositionPriority()", () => {
    describe("when succeed", () => {
      it("should dispatch START_UPDATE_POSITION_PRIORITY, ADD_ENTITY, SUCCEED_UPDATE_POSITION_PRIORITY action", async () => {
        await store.dispatch(
          updatePositionPriority({
            positionId: "P1234",
            change: {
              priority: 10,
            },
          }),
        );

        const [
          startUpdatePositionPriority,
          succeedUpdatePositionPriority,
        ] = store.getActions();

        expect(startUpdatePositionPriority).toMatchObject({
          type: PositionTypes.START_UPDATE_POSITION_PRIORITY,
        });
        expect(succeedUpdatePositionPriority).toMatchObject({
          type: PositionTypes.SUCCEED_UPDATE_POSITION_PRIORITY,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_UPDATE_POSITION_PRIORITY, FAILED_UPDATE_POSITION_PRIORITY", async () => {
        await store.dispatch(
          updatePositionPriority(
            {
              positionId: "P1234",
              change: {
                priority: 10,
              },
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startUpdatePositionPriority,
          failedUpdatePositionPriority,
        ] = store.getActions();

        expect(startUpdatePositionPriority).toMatchObject({
          type: PositionTypes.START_UPDATE_POSITION_PRIORITY,
        });

        expect(failedUpdatePositionPriority).toMatchObject({
          type: PositionTypes.FAILED_UPDATE_POSITION_PRIORITY,
        });
      });
    });
  });

  describe("deletePosition()", () => {
    describe("when succeed", () => {
      it("should dispatch START_DELETE_POSITION, SUCCEED_DELETE_POSITION action", async () => {
        await store.dispatch(
          deletePosition({
            positionId: "P1234",
          }),
        );

        const [startDeletePosition, succeedDeletePosition] = store.getActions();

        expect(startDeletePosition).toMatchObject({
          type: PositionTypes.START_DELETE_POSITION,
        });
        expect(succeedDeletePosition).toMatchObject({
          type: PositionTypes.SUCCEED_DELETE_POSITION,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_DELETE_POSITION, FAILED_DELETE_POSITION", async () => {
        await store.dispatch(
          deletePosition(
            {
              positionId: "P1234",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startDeletePosition, failedDeletePosition] = store.getActions();

        expect(startDeletePosition).toMatchObject({
          type: PositionTypes.START_DELETE_POSITION,
        });

        expect(failedDeletePosition).toMatchObject({
          type: PositionTypes.FAILED_DELETE_POSITION,
        });
      });
    });
  });

  describe("getPositionMembers()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_POSITION_MEMBERS, ADD_ENTITY, SUCCEED_GET_POSITION_MEMBERS action", async () => {
        await store.dispatch(
          getPositionMembers({
            positionId: "P1234",
            limit: 10,
            after: "U1234",
          }),
        );

        const [
          startGetPositionMembers,
          addEntity,
          succeedGetPositionMembers,
        ] = store.getActions();

        expect(startGetPositionMembers).toMatchObject({
          type: PositionTypes.START_GET_POSITION_MEMBERS,
        });
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetPositionMembers).toMatchObject({
          type: PositionTypes.SUCCEED_GET_POSITION_MEMBERS,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_POSITION_MEMBERS, FAILED_GET_POSITION_MEMBERS", async () => {
        await store.dispatch(
          getPositionMembers(
            {
              positionId: "P1234",
              limit: 10,
              after: "U1234",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startGetPositionMembers,
          failedGetPositionMembers,
        ] = store.getActions();

        expect(startGetPositionMembers).toMatchObject({
          type: PositionTypes.START_GET_POSITION_MEMBERS,
        });
        expect(failedGetPositionMembers).toMatchObject({
          type: PositionTypes.FAILED_GET_POSITION_MEMBERS,
        });
      });
    });
  });
});
