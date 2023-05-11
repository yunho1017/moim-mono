jest.mock("common/api/base");
// vendor
import nock from "nock";
import axios from "axios";
// api
import ApplicationAPI from "common/api/application";
import { MoimAPI } from "common/api";
// mock
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Category API ", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: ApplicationAPI = new ApplicationAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getReplaceReferenceBlock()", () => {
    it("should return render block", async () => {
      scope = nock(getApiDomain())
        .post("/applications/bots/testBotId/replace", {
          replace: {
            data: [
              {
                replaceId: "replace",
                blockId: "testBId",
                params: {
                  id: "testBId",
                },
              },
            ],
          },
        })
        .reply(200, () => RAW.REPLACE_BLOCK_1);

      const { data } = await api.getReplaceReferenceBlock({
        botId: "testBotId",
        data: [
          {
            replaceId: "replace",
            blockId: "testBId",
            params: {
              id: "testBId",
            },
          },
        ],
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
    });
  });

  describe("doActionTrigger()", () => {
    it("should return render block", async () => {
      scope = nock(getApiDomain())
        .post("/applications/bots/testBotId/action", {
          action: {
            data: {
              actionId: "form",
              params: {
                id: "testBId",
              },
            },
          },
        })
        .reply(200, () => RAW.REPLACE_BLOCK_1);

      const { data } = await api.doActionTrigger({
        botId: "testBotId",
        data: {
          actionId: "form",
          params: {
            id: "testBId",
          },
        },
        cancelToken,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
    });
  });
});
