jest.mock("common/api/directMessage");
jest.mock("common/api/user");

import axios, { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { EntityTypes } from "app/actions/types";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import {
  getDirectMessages,
  createDirectMessage,
  ActionCreators,
  getDirectMessage,
} from "..";

describe("DirectMessage action", () => {
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

  describe("getDirectMessages()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(getDirectMessages({}, cancelToken));

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetDirectMessages());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededGetDirectMessages({
            data: [RAW.DIRECT_MESSAGE.id],
            paging: {},
          }),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          getDirectMessages({}, makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetDirectMessages());
        expect(failed).toEqual(ActionCreators.failedGetDirectMessages());
      });
    });
  });

  describe("getDirectMessage()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          getDirectMessage({ direct_message_id: "test" }, cancelToken),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetDirectMessage());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededGetDirectMessage({
            data: RAW.DIRECT_MESSAGE.id,
          }),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          getDirectMessage(
            { direct_message_id: "test" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetDirectMessage());
        expect(failed).toEqual(ActionCreators.failedGetDirectMessage());
      });
    });
  });

  describe("createDirectMessage()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          createDirectMessage(
            { direct_message: { invitees: [] } },
            cancelToken,
          ),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateDirectMessage());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededCreateDirectMessage({
            data: RAW.DIRECT_MESSAGE.id,
          }),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          createDirectMessage(
            { direct_message: { invitees: [] } },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateDirectMessage());
        expect(failed).toEqual(ActionCreators.failedCreateDirectMessage());
      });
    });
  });
});
