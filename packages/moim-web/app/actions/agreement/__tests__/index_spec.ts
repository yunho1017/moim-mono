jest.mock("common/api/agreement");

import axios, { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import { putAgreement, ActionCreators } from "..";

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

  describe("putAgreement()", () => {
    describe("when successfully upload", () => {
      it("should return START, SUCCEED", async () => {
        await store.dispatch(
          putAgreement(
            "privacy",
            [{ type: "text", content: "hi" }],
            cancelToken,
          ),
        );

        const [start, succeed] = store.getActions();
        expect(start).toEqual(ActionCreators.startPutAgreement());
        expect(succeed).toEqual(
          ActionCreators.succeedPutAgreement(RAW.AGREEMENT_TERM.data),
        );
      });
    });

    describe("when agreement not exists on server", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          putAgreement(
            "privacy",
            [{ type: "text", content: "hi" }],
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [start, failed] = store.getActions();
        expect(start).toEqual(ActionCreators.startPutAgreement());
        expect(failed).toEqual(ActionCreators.failedPutAgreement());
      });
    });
  });
});
