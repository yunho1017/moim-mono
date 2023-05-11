jest.mock("common/api/draft");
jest.mock("common/api/user");

import axios, { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { EntityTypes } from "app/actions/types";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import {
  ActionCreators,
  deleteAllDraft,
  deleteDraft,
  getDraftList,
  saveDraft,
  updateDraft,
} from "..";

describe("Draft action", () => {
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

  describe("saveDraft()", () => {
    it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
      await store.dispatch(
        saveDraft({
          channelId: "C123",
          title: "test",
          content: [{ type: "text", content: "hello" }],
        }),
      );

      const [start, addEntity, succeeded] = store.getActions();
      expect(start).toEqual(ActionCreators.startSaveDraft());
      expect(addEntity).toMatchObject({
        type: EntityTypes.ADD_ENTITY,
      });
      expect(succeeded).toEqual(
        ActionCreators.succeededSaveDraft(RAW.THREAD.id),
      );
    });
  });

  describe("updateDraft()", () => {
    it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
      await store.dispatch(
        updateDraft({
          threadId: "X123",
          channelId: "C123",
          title: "test",
          content: [{ type: "text", content: "hello" }],
        }),
      );

      const [start, addEntity, succeeded] = store.getActions();
      expect(start).toEqual(ActionCreators.startUpdateDraft());
      expect(addEntity).toMatchObject({
        type: EntityTypes.ADD_ENTITY,
      });
      expect(succeeded).toEqual(ActionCreators.succeededUpdateDraft());
    });
  });

  describe("deleteDraft()", () => {
    it("should return START, SUCCEEDED", async () => {
      await store.dispatch(
        deleteDraft(
          {
            threadId: "X123",
            channelId: "C123",
          },
          { success: "", failed: "" },
        ),
      );

      const [start, succeeded, snack] = store.getActions();
      expect(start).toEqual(ActionCreators.startDeleteDraft("X123"));
      expect(succeeded).toEqual(ActionCreators.succeededDeleteDraft("X123"));
      expect(snack.type).toEqual(SnackbarActionCreators.openSnackbar({}).type);
    });
  });

  describe("getDraftList()", () => {
    describe("when called successfully", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        await store.dispatch(getDraftList({ cancelToken }));

        const [start, addEntity, succeeded] = store.getActions();
        expect(start).toEqual(ActionCreators.startGetDraftList());
        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeeded).toEqual(
          ActionCreators.succeededGetDraftList({
            data: [RAW.THREAD.id],
            paging: {},
          }),
        );
      });
    });

    describe("when call failed", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          getDraftList({
            cancelToken: makeCancelTokenWithResponse(500, MOCK_ERROR),
          }),
        );

        const [start, failed] = store.getActions();
        expect(start).toEqual(ActionCreators.startGetDraftList());
        expect(failed).toEqual(ActionCreators.failedGetDraftList());
      });
    });
  });

  describe("deleteAllDraft()", () => {
    it("should return START, SUCCEEDED", async () => {
      await store.dispatch(deleteAllDraft([], { success: "", failed: "" }));

      const [start, succeeded, snack] = store.getActions();
      expect(start).toEqual(ActionCreators.startDeleteAllDraft());
      expect(succeeded).toEqual(ActionCreators.succeededDeleteAllDraft());
      expect(snack.type).toEqual(SnackbarActionCreators.openSnackbar({}).type);
    });
  });
});
