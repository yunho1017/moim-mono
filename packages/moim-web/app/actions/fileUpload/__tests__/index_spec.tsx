jest.mock("common/api/fileUpload");

import axios, { CancelToken } from "axios";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { FileUploadTypes } from "app/actions/types";
import { pollProcess, fileUpload } from "..";
import { RAW } from "app/__mocks__";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";

jest.useFakeTimers();

describe("File upload action", () => {
  let store: IThunkMockState;
  const cancelToken: CancelToken = axios.CancelToken.source().token;
  const fileId = RAW.FILE_UPLOAD_STATUS_QUEUED.data.id;
  const mockGetFileIdListener = jest.fn();

  const MOCK_ERROR: Moim.IErrorResponse = {
    code: "MOCK_ERROR",
    message: "This is mocking error",
  };

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("fileUpload()", () => {
    describe("when it runs properly", () => {
      it("should return START, END, SET", async () => {
        await store.dispatch(
          fileUpload(
            {
              title: "image",
              name: "image.jpg",
              file: new File([], "image.jpg"),
              cancelToken,
            },
            mockGetFileIdListener,
          ),
        );
        const [startUpload, endUpload, setUpload] = store.getActions();
        expect(mockGetFileIdListener.mock.calls[0][0]).toBe(
          RAW.FILE_UPLOAD_QUEUE.data.id,
        );
        expect(startUpload.type).toBe(FileUploadTypes.START_FILE_UPLOAD);

        expect(setUpload.type).toBe(FileUploadTypes.SET_FILE_UPLOAD_STATUS);
        expect(setUpload.payload.files![fileId].status.name).toBe("AVAILABLE");

        expect(endUpload.type).toBe(FileUploadTypes.END_FILE_UPLOAD);
      });
    });

    describe("when it runs failed", () => {
      it("should return START, FAILED, END", async () => {
        await store.dispatch(
          fileUpload({
            title: "image",
            name: "image.jpg",
            file: new File([], "image.jpg"),
            cancelToken: makeCancelTokenWithResponse(500, MOCK_ERROR),
          }),
        );

        const [startUpload, failedUpload, endUpload] = store.getActions();
        expect(startUpload.type).toBe(FileUploadTypes.START_FILE_UPLOAD);
        expect(failedUpload.type).toBe(FileUploadTypes.FAILED_FILE_UPLOAD);
        expect(endUpload.type).toBe(FileUploadTypes.END_FILE_UPLOAD);
      });
    });
  });

  describe("pollProcess()", () => {
    it("should return SET_FILE_UPLOAD_STATUS", async () => {
      await store.dispatch(pollProcess("FC7EAUXLF", cancelToken));

      const [setUploadStatusAction] = store.getActions();
      expect(setUploadStatusAction.type).toBe(
        FileUploadTypes.SET_FILE_UPLOAD_STATUS,
      );
      expect(setUploadStatusAction.payload.files![fileId].status.name).toBe(
        "AVAILABLE",
      );
    });
  });
});
