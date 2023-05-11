jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import ConversationAPI from "../conversation";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Conversation API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;
  const api: ConversationAPI = new ConversationAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("api.getConversation()", () => {
    it("should get channel data", async () => {
      scope = nock(getApiDomain())
        .get(`/conversations/${RAW.NORMALIZED_CHANNEL.id}`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_CHANNEL,
        }));

      const { data } = await api.getConversation(
        {
          channel_id: RAW.NORMALIZED_CHANNEL.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_CHANNEL);
    });
  });

  describe("api.getConversationMembers()", () => {
    it("should get members data", async () => {
      scope = nock(getApiDomain())
        .get(`/conversations/${RAW.NORMALIZED_CHANNEL.id}/members`)
        .query({
          limit: 20,
          after: "A1234",
        })
        .reply(200, () => ({
          data: [RAW.MEMBER, RAW.MEMBER],
          paging: {
            before: null,
            after: null,
          },
        }));

      const { data, paging } = await api.getConversationMembers(
        {
          limit: 20,
          after: "A1234",
          channel_id: RAW.NORMALIZED_CHANNEL.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("api.joinConversation()", () => {
    it("should get channel data", async () => {
      scope = nock(getApiDomain())
        .post(`/conversations/${RAW.NORMALIZED_CHANNEL.id}/relation`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_CHANNEL,
        }));

      const { data } = await api.joinConversation(
        {
          channel_id: RAW.NORMALIZED_CHANNEL.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_CHANNEL);
    });

    describe("api.getConversationMessages()", () => {
      it("should get message paginated data", async () => {
        scope = nock(getApiDomain())
          .get(`/conversations/${RAW.NORMALIZED_CHANNEL.id}/messages`)
          .query({
            limit: 20,
            before: "B1234",
            after: "A1234",
          })
          .reply(200, () => ({
            data: [RAW.NORMALIZED_MESSAGE, RAW.NORMALIZED_MESSAGE],
            paging: {
              before: null,
              after: null,
            },
          }));

        const { data, paging } = await api.getConversationMessages(
          {
            limit: 20,
            channel_id: RAW.NORMALIZED_CHANNEL.id,
            after: "A1234",
            before: "B1234",
          },
          cancelToken,
        );

        expect(scope.isDone()).toBeTruthy();
        expect(scope.isDone()).toBeTruthy();
        expect(data.length).toEqual(2);
        expect(paging.before).toBeNull();
        expect(paging.after).toBeNull();
      });
    });

    describe("api.createConversationMessage()", () => {
      it("should get message data", async () => {
        scope = nock(getApiDomain())
          .post(`/conversations/${RAW.NORMALIZED_CHANNEL.id}/messages`)
          .reply(200, () => ({
            data: RAW.NORMALIZED_MESSAGE,
          }));

        const { data } = await api.createConversationMessage(
          {
            channel_id: RAW.NORMALIZED_CHANNEL.id,
            message: {
              content: "Hello World",
              files: [],
            },
          },
          cancelToken,
        );

        expect(scope.isDone()).toBeTruthy();
        expect(data).toEqual(RAW.NORMALIZED_MESSAGE);
      });
    });
  });

  describe("api.deleteConversationMessage()", () => {
    it("should delete message", async () => {
      scope = nock(getApiDomain())
        .delete(`/conversations/${RAW.NORMALIZED_CHANNEL.id}/messages/M1234`)
        .reply(200, () => ({
          success: true,
        }));

      const result = await api.deleteConversationMessage(
        {
          channelId: RAW.NORMALIZED_CHANNEL.id,
          messageId: "M1234",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(result.success).toBeTruthy();
    });
  });
});
