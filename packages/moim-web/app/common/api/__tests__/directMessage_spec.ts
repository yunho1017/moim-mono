jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import DirectMessageAPI from "../directMessage";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("DirectMessage API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: DirectMessageAPI = new DirectMessageAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("api.getDirectMessages()", () => {
    it("should get paginated dm list data", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/direct_messages")
        .query({
          limit: 30,
        })
        .reply(200, () => ({
          data: [RAW.DIRECT_MESSAGE],
          paging: {},
        }));

      const { paging, data } = await api.getDirectMessages(
        {
          limit: 30,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
      expect(paging.before).toBeUndefined();
      expect(paging.after).toBeUndefined();
    });
  });

  describe("api.getDirectMessages()", () => {
    it("should get paginated dm list data", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/direct_messages/test")
        .reply(200, () => ({
          data: RAW.DIRECT_MESSAGE,
        }));

      const { data } = await api.getDirectMessage(
        {
          direct_message_id: "test",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.DIRECT_MESSAGE);
    });
  });

  describe("api.createConversation()", () => {
    it("should get dm data", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/direct_messages")
        .reply(200, () => ({
          data: RAW.DIRECT_MESSAGE,
        }));

      const { data } = await api.createDirectMessage(
        {
          direct_message: { invitees: ["U1234"] },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.DIRECT_MESSAGE);
    });
  });
});
