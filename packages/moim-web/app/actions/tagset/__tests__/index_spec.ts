jest.mock("common/api/group");
jest.mock("common/api/user");

import axios, { CancelToken } from "axios";
import { RAW, NORMALIZED } from "app/__mocks__";
import { EntityTypes } from "app/actions/types";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import {
  getTagSets,
  createTagSet,
  updateTagSet,
  deleteTagSets,
  ActionCreators,
} from "..";

describe("Tag action", () => {
  let store: IThunkMockState;
  const cancelToken: CancelToken = axios.CancelToken.source().token;

  const MOCK_ERROR: Moim.IErrorResponse = {
    code: "MOCK_ERROR",
    message: "This is mocking error",
  };

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getTagSets()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(getTagSets(cancelToken));

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetTagSets());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededGetTagSets(NORMALIZED.TAG_SET.result),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          getTagSets(makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetTagSets());
        expect(failed).toEqual(ActionCreators.failedGetTagSets());
      });
    });
  });

  describe("createTagSet()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          createTagSet("set", { set: "New Set" }, cancelToken),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateTagSet());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededCreateTagSet("set", RAW.TAG_SET.data[0].id),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          createTagSet(
            "set",
            { set: "New Set" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateTagSet());
        expect(failed).toEqual(ActionCreators.failedCreateTagSet());
      });
    });
  });

  describe("updateTagSet()", () => {
    const targetTagSetId = "1234";
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          updateTagSet(targetTagSetId, { set: "Update Setname" }, cancelToken),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startUpdateTagSet());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(ActionCreators.succeededUpdateTagSet());
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          updateTagSet(
            targetTagSetId,
            { set: "Update Setname" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startUpdateTagSet());
        expect(failed).toEqual(ActionCreators.failedUpdateTagSet());
      });
    });
  });

  describe("deleteTagSets()", () => {
    const targetTagSetId = "1234";
    describe("when action work properly", () => {
      it("should return START, SUCCEEDED", async () => {
        await store.dispatch(deleteTagSets(targetTagSetId, cancelToken));

        const [start, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startDeleteTagSet());
        expect(succeeded).toEqual(
          ActionCreators.succeededDeleteTagSet(targetTagSetId),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          deleteTagSets(
            targetTagSetId,
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startDeleteTagSet());
        expect(failed).toEqual(ActionCreators.failedDeleteTagSet());
      });
    });
  });
});
