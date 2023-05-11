jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import TagAPI from "../tag";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Me API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: TagAPI = new TagAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getTags()", () => {
    it("should return paginated response", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/tags")
        .query({ limit: 30 })
        .reply(200, () => RAW.TAGS);

      const result = await api.getTags({ cancelToken });
      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toHaveLength(RAW.TAGS.data.length);
    });
  });

  describe("createTag()", () => {
    it("should return response", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/tags", {
          tag: { name: "test", isMenu: true, isAll: false },
        })
        .reply(200, () => ({
          data: RAW.TAGS.data[0],
        }));

      const result = await api.createTag(
        { name: "test", isMenu: true, isAll: false },
        cancelToken,
      );
      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.TAGS.data[0]);
    });
  });

  describe("updateTagData()", () => {
    it("should return response", async () => {
      scope = nock(getApiDomain())
        .put("/tags/t1234", {
          tag: { name: "test" },
        })
        .reply(200, () => ({
          data: {
            ...RAW.TAGS.data[0],
            name: "test",
          },
        }));

      const result = await api.updateTagData(
        { tagId: "t1234", name: "test" },
        cancelToken,
      );
      expect(scope.isDone()).toBeTruthy();
      expect(result.data.name).toEqual("test");
    });
  });

  describe("registerSubGroupsToTag()", () => {
    it("should return response", async () => {
      scope = nock(getApiDomain())
        .post("/tags/t1111/subgroups/_batch", {
          subgroups: ["g1234"],
        })
        .reply(200, () => ({
          success: true,
        }));

      const result = await api.registerSubGroupsToTag(
        {
          tagId: "t1111",
          subgroupIds: ["g1234"],
        },
        cancelToken,
      );
      expect(scope.isDone()).toBeTruthy();
      expect(result.success).toBeTruthy();
    });
  });

  describe("unregisterSubGroupsToTag()", () => {
    it("should return response", async () => {
      scope = nock(getApiDomain())
        .delete("/tags/t1111/subgroups/_batch", {
          subgroups: ["g1234"],
        })
        .reply(200, () => ({
          success: true,
        }));

      const result = await api.unregisterSubGroupsToTag(
        {
          tagId: "t1111",
          subgroupIds: ["g1234"],
        },
        cancelToken,
      );
      expect(scope.isDone()).toBeTruthy();
      expect(result.success).toBeTruthy();
    });
  });
});
