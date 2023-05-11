jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import ChannelAPI from "../channel";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Channel API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;
  const api: ChannelAPI = new ChannelAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getChannels()", () => {
    it("should return paginated response", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/channels")
        .query({ limit: 30 })
        .reply(200, () => RAW.SIMPLE_CHANNELS);

      const result = await api.getChannels({ limit: 30 }, cancelToken);
      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toHaveLength(RAW.SIMPLE_CHANNELS.data.length);
    });
  });

  describe("deleteChannel()", () => {
    it("should delete message", async () => {
      scope = nock(getApiDomain())
        .delete(`/channels/${RAW.SIMPLE_CHANNEL.id}`)
        .reply(200, () => ({
          data: { success: true },
        }));

      const result = await api.deleteChannel(
        {
          channelId: RAW.SIMPLE_CHANNEL.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(result.data.success).toBeTruthy();
    });
  });

  describe("editChannel()", () => {
    it("should edit channel", async () => {
      scope = nock(getApiDomain())
        .put(`/channels/${RAW.SIMPLE_CHANNEL.id}`)
        .reply(200, () => ({
          data: RAW.SIMPLE_CHANNEL,
        }));

      const result = await api.editChannel(
        {
          channelId: RAW.SIMPLE_CHANNEL.id,
          channel: RAW.SIMPLE_CHANNEL,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.SIMPLE_CHANNEL);
    });
  });

  describe("createChannel()", () => {
    it("should create channel", async () => {
      scope = nock(getApiDomain())
        .post(`/groups/testGId/channels`)
        .reply(200, () => ({
          data: RAW.SIMPLE_CHANNEL,
        }));

      const result = await api.createChannel(
        {
          channel: RAW.SIMPLE_CHANNEL,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.SIMPLE_CHANNEL);
    });
  });
});
