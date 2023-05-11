jest.mock("common/api/base");
jest.mock("common/helpers/envChecker", () => ({
  env: () => ({ platform: "test", stage: "test" }),
  isStage: () => false,
  isHubDomain: () => false,
  isBrowser: () => false,
  isProd: () => false,
  isDev: () => false,
  isTest: () => true,
  isServer: () => false,
  isElectronApp: () => false,
  isSecondaryWindow: () => false,
  isGroupDomain: () => false,
}));
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import ForumAPI from "../forum";
import { RAW, MOCK_CHANNEL } from "app/__mocks__";
import { VoteStatus } from "app/enums";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Forum API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api = new ForumAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getThreadList", () => {
    it("should get paginatedThreadList", async () => {
      scope = nock(getApiDomain())
        .post("/search/threads", {
          query: {
            groupId: "testGId",
            channelId: "C123",
            sort: "createdAt",
            limit: 20,
          },
        })
        .reply(200, () => ({
          data: [RAW.THREAD, RAW.THREAD],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.getThreadList(
        {
          channelId: "C123",
          sort: "createdAt",
          limit: 20,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("postThread()", () => {
    it("should return success", async () => {
      // TODO: should change API endpoint
      scope = nock(getApiDomain())
        .post("/forums/C123/threads")
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const result = await api.postThread({
        channelId: "C123",
        title: "Title !!",
        content: [
          {
            type: "text",
            content: "hello world",
          },
        ],
        cancelToken,
      });
      expect(scope.isDone()).toBeTruthy();
      expect(result).toEqual({ data: { success: true } });
    });
  });

  describe("getThread()", () => {
    it("should return thread data", async () => {
      scope = nock(getApiDomain())
        .get("/forums/C123/threads/T1577080529252.1435")
        .reply(200, () => ({
          data: RAW.THREAD,
        }));

      const result = await api.getThread(
        {
          parentId: "C123",
          threadId: "T1577080529252.1435",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(result).toEqual({
        data: RAW.THREAD,
      });
    });
  });

  describe("getThreadVotes()", () => {
    it("should get threadVotes", async () => {
      scope = nock(getApiDomain())
        .get(
          `/forums/${MOCK_CHANNEL.FORUM_MOCK_DATA.id}/threads/${MOCK_CHANNEL.FORUM_MOCK_DATA.id}/votes?type=${VoteStatus.POSITIVE}`,
        )
        .reply(200, () => ({
          data: [RAW.THREAD_VOTE],
        }));

      const { data } = await api.getThreadVotes(
        {
          channelId: RAW.NORMALIZED_CHANNEL.id,
          type: VoteStatus.POSITIVE,
          threadId: RAW.NORMALIZED_CHANNEL.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual([RAW.THREAD_VOTE]);
    });
  });

  describe("deleteThread()", () => {
    const forumId = "A1234";
    const threadId = "test";

    it("should response success", async () => {
      scope = nock(getApiDomain())
        .delete(`/forums/${forumId}/threads/${threadId}`)
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const { data } = await api.deleteThread({
        forumId,
        threadId,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.success).toBeTruthy();
    });
  });

  describe("deleteReply()", () => {
    const forumId = "A1234";
    const threadId = "test";
    const replyId = "R1234";

    it("should response success", async () => {
      scope = nock(getApiDomain())
        .delete(`/forums/${forumId}/threads/${threadId}/replies/${replyId}`)
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const { data } = await api.deleteReply({
        forumId,
        threadId,
        replyId,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.success).toBeTruthy();
    });
  });
});
