jest.mock("common/api/tag");
jest.mock("common/api/user");

import axios, { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { EntityTypes } from "app/actions/types";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import { getTags, createTag, updateTag, ActionCreators } from "..";

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

  describe("getTags()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          getTags({
            cancelToken,
          }),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetTags());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededGetTags({
            data: [RAW.TAGS.data[0].id],
            paging: {},
          }),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          getTags({
            cancelToken: makeCancelTokenWithResponse(500, MOCK_ERROR),
          }),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetTags());
        expect(failed).toEqual(ActionCreators.failedGetTags());
      });
    });
  });

  describe("createTag()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          createTag(
            { name: "test-tag", isMenu: true, isAll: false },
            cancelToken,
          ),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateTag());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededCreateTag(RAW.TAGS.data[0].id),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          createTag(
            { name: "test-tag", isMenu: true, isAll: false },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startCreateTag());
        expect(failed).toEqual(ActionCreators.failedCreateTag());
      });
    });
  });

  describe("updateTag()", () => {
    describe("when action work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(
          updateTag({ tagId: "t1234", purpose: "test" }, cancelToken),
        );

        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startUpdateTag());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededUpdateTag(RAW.TAGS.data[0].id),
        );
      });
    });

    describe("when action has error", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          updateTag(
            { tagId: "t1234", purpose: "test" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();

        expect(start).toEqual(ActionCreators.startUpdateTag());
        expect(failed).toEqual(ActionCreators.failedUpdateTag());
      });
    });
  });
});
