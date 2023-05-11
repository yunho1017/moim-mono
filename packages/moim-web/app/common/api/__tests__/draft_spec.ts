jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import DraftAPI from "../draft";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";
import { MoimAPI } from "..";

describe("Draft API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;
  const api = new DraftAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("saveDraft", () => {
    it("should return drafted post", async () => {
      const testContent = {
        title: "hello",
        content: [{ type: "text", content: "hello" }],
      };
      scope = nock(getApiDomain())
        .post("/forums/C123/threads/draft", {
          threadDraft: testContent,
        })
        .reply(200, () => ({ data: RAW.THREAD }));

      const result = await api.saveDraft({
        channelId: "C123",
        title: testContent.title,
        content: testContent.content as Moim.Blockit.Blocks[],
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.THREAD);
    });
  });

  describe("updateDraft", () => {
    it("should return updated drafted post", async () => {
      const testContent = {
        title: "hello",
        content: [{ type: "text", content: "hello" }],
      };

      scope = nock(getApiDomain())
        .put("/forums/C123/threads/draft/X123", {
          threadDraft: testContent,
        })
        .reply(200, () => ({ data: RAW.THREAD }));

      const result = await api.updateDraft({
        channelId: "C123",
        threadId: "X123",
        title: testContent.title,
        content: testContent.content as Moim.Blockit.Blocks[],
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.THREAD);
    });
  });

  describe("deleteDraft", () => {
    it("should return success: true", async () => {
      scope = nock(getApiDomain())
        .delete("/forums/C123/threads/draft/X123")
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const result = await api.deleteDraft({
        channelId: "C123",
        threadId: "X123",
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result.data.success).toBeTruthy();
    });
  });

  describe("getDraftList", () => {
    it("should return my own draft list", async () => {
      scope = nock(getApiDomain())
        .get("/me/threads/draft")
        .reply(200, () => ({
          data: [RAW.THREAD],
          paging: {},
        }));

      const result = await api.getDraftList({
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toHaveLength(1);
    });
  });

  describe("deleteAllDraft", () => {
    it("should return success: true", async () => {
      scope = nock(getApiDomain())
        .delete("/me/threads/draft")
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const result = await api.deleteAllDraft();

      expect(scope.isDone()).toBeTruthy();
      expect(result.data.success).toBeTruthy();
    });
  });

  describe("getDraftData", () => {
    it("should return my own draft list", async () => {
      scope = nock(getApiDomain())
        .get("/forums/C123/threads/draft/X123")
        .reply(200, () => ({
          data: RAW.THREAD,
        }));

      const result = await api.getDraftData({
        channelId: "C123",
        threadId: "X123",
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.THREAD);
    });
  });

  describe("getAllDraftCount", () => {
    it("should return my own draft list", async () => {
      scope = nock(getApiDomain())
        .get("/me/threads/draft/amount")
        .reply(200, () => ({
          data: {
            draft_amount: 8,
          },
        }));

      const result = await api.getAllDraftCount();

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toHaveProperty("draft_amount", 8);
    });
  });
});
