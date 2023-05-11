jest.mock("common/api/base");
import axios from "axios";
import nock from "nock";
import FileAPI from "../fileUpload";
import { MoimAPI } from "..";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("File API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api = new FileAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getFileBatch()", () => {
    it("should return array of file info", async () => {
      scope = nock(getApiDomain())
        .post("/files/_batch", { files: ["FP28TOC7K", "FFG02UP9F"] })
        .reply(200, () => RAW.FILE_BATCH);

      const result = await api.getFileBatch({
        files: ["FP28TOC7K", "FFG02UP9F"],
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result).toHaveProperty("data");
      expect(result).toHaveProperty("paging");
    });
  });

  describe("getFileUploadQueue()", () => {
    it("should return aws header with upload endpoint url", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/files", {
          file: { title: "test", name: "test.jpg" },
        })
        .reply(200, () => RAW.FILE_UPLOAD_QUEUE);

      const { data } = await api.getFileUploadQueue({
        title: "test",
        name: "test.jpg",
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.id).toBe(RAW.FILE_UPLOAD_QUEUE.data.id);
      expect(data.upload).toHaveProperty("key");
      expect(data.upload).toHaveProperty("bucket");
      expect(data.upload).toHaveProperty("X-Amz-Credential");
    });
  });

  describe("getFileUploadingStatus()", () => {
    it("should return current status", async () => {
      scope = nock(getApiDomain())
        .get("/files/FC7EAUXLF")
        .reply(200, () => RAW.FILE_UPLOAD_STATUS_QUEUED);

      const { data } = await api.getFileUploadingStatus({
        fileId: "FC7EAUXLF",
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.id).toBe("FC7EAUXLF");
      expect(data).toHaveProperty("status");
    });
  });

  describe("uploadFileAndGetId()", () => {
    it("should return current status", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/files", {
          file: { title: "test", name: "test.jpg" },
        })
        .reply(200, () => RAW.FILE_UPLOAD_QUEUE);

      const { fileId } = await api.uploadFileAndGetId({
        title: "test",
        name: "test.jpg",
        file: new File([], "test.jpg"),
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(fileId).toBe(RAW.FILE_UPLOAD_QUEUE.data.id);
    });
  });
});
