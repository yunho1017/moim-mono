import { reducer, INITIAL_STATE } from "../files";
import { ActionCreators } from "app/actions/entity";
import { ActionCreators as FileUploadActionCreators } from "app/actions/fileUpload";
import { RAW } from "app/__mocks__";

describe("Files Entity reducer", () => {
  describe("when dispatch ADD_ENTITY action", () => {
    it("should add file entity", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.addEntity({
          files: {
            file1234: {
              ...RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
              id: "file1234",
            },
          },
        }),
      );

      expect(state!.file1234).not.toBeUndefined();
    });
  });

  describe("when dispatch setFileUploadStatus action", () => {
    describe("first time added", () => {
      it("should add file entity", () => {
        const state = reducer(
          INITIAL_STATE,
          FileUploadActionCreators.setFileUploadStatus({
            files: {
              file1234: {
                ...RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
                id: "file1234",
              },
            },
          }),
        );

        expect(state!.file1234).not.toBeUndefined();
      });
    });

    describe("already added but different status & fields", () => {
      it("should add file entity", () => {
        const state = reducer(
          {
            file1234: {
              ...RAW.FILE_UPLOAD_STATUS_QUEUED.data,
              id: "file1234",
            },
          },
          FileUploadActionCreators.setFileUploadStatus({
            files: {
              file1234: {
                ...RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
                id: "file1234",
              },
            },
          }),
        );

        expect(state!.file1234).not.toBeUndefined();
        expect(state!.file1234.status.name).toBe("AVAILABLE");
        expect(state!.file1234).toHaveProperty(
          "mimetype",
          RAW.FILE_UPLOAD_STATUS_AVAILABLE.data.mimetype,
        );
      });
    });
  });

  describe("when dispatch DELETE_FILE action", () => {
    it("should delete file entity", () => {
      const state = reducer(
        {
          file1234: {
            ...RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
            id: "file1234",
          },
        },
        FileUploadActionCreators.deleteFile("file1234"),
      );

      expect(state).not.toHaveProperty("file1234");
    });
  });

  describe("when dispatch FAILED_FILE_UPLOAD action", () => {
    it("should set file status to FAILED", () => {
      const state = reducer(
        {
          file1234: {
            ...RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
            id: "file1234",
          },
        },
        FileUploadActionCreators.failedFileUpload("file1234"),
      );

      expect(state.file1234.status.name).toBe("FAILED");
    });
  });
});
