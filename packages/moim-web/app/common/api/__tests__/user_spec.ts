jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import UserAPI from "../user";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("User API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: UserAPI = new UserAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("api.batchUsers()", () => {
    it("should get paginated user list data", async () => {
      scope = nock(getApiDomain())
        .post("/users/_batch")
        .reply(200, () => ({
          data: [RAW.MEMBER],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.batchUsers(
        { users: [RAW.MEMBER.id] },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("api.getUsers()", () => {
    it("should get paginated channel list data", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/users")
        .query({ limit: 10, after: "MOCK_AFTER" })
        .reply(200, () => ({
          data: [RAW.MEMBER],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.getUsers(
        { limit: 10, after: "MOCK_AFTER" },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("api.postUser()", () => {
    it("should get posted user data", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/users")
        .reply(200, () => ({
          data: RAW.MEMBER,
        }));

      const { data } = await api.postUser(
        RAW.MOCK_POST_USER_REQUEST_BODY,
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.MEMBER);
    });
  });

  describe("api.getSearchUsers()", () => {
    it("should get paginated user list data", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/search/users")
        .reply(200, () => ({
          data: [RAW.MEMBER],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.getSearchUsers(
        { limit: 10, query: "user" },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(1);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("api.checkValidateUsername()", () => {
    describe("when ok to use", () => {
      it("should get username validation", async () => {
        scope = nock(getApiDomain())
          .get("/users/validate_name")
          .query({ group_id: "testGId", name: "testname" })
          .reply(200, () => ({
            data: {
              success: true,
            },
          }));

        const result = await api.checkValidateUsername("testname", cancelToken);

        expect(scope.isDone()).toBeTruthy();
        expect(result.data.success).toBeTruthy();
      });
    });

    describe("when already taken", () => {
      it("should get username validation", async () => {
        scope = nock(getApiDomain())
          .get("/users/validate_name")
          .query({ group_id: "testGId", name: "testname" })
          .reply(422, () => ({
            error: {
              id: "6bd8a655-fcb2-4cfb-8540-2b242079f645",
              code: "DUPLICATED_USERNAME",
              message: "The provided name is already taken",
            },
          }));

        try {
          await api.checkValidateUsername("testname", cancelToken);
        } catch (error) {
          const err = error as any;
          expect(scope.isDone()).toBeTruthy();
          expect(err.response.status).toBe(422);
          expect(err.response.data).toHaveProperty("error");
          expect(err.response.data.error.code).toBe("DUPLICATED_USERNAME");
          expect(err.response.data.error).toHaveProperty("message");
          expect(err.response.data.error).toHaveProperty("id");
        }
      });
    });
  });

  describe("api.getProfileBlockit()", () => {
    it("should return profile blockit", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/users/U1234")
        .query({ viewType: "show", version: "v3" })
        .reply(200, () => ({ data: RAW.PROFILE_SHOW_BLOCKITS }));

      const blocks = await api.getProfileBlockit("U1234", "show");
      expect(scope.isDone()).toBeTruthy();
      expect(blocks.data.length).toEqual(RAW.PROFILE_SHOW_BLOCKITS.length);
    });
  });
});
