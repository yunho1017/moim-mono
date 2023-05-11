jest.mock("common/api/base");
// vendor
import axios from "axios";
import nock from "nock";
// helper
import { MoimAPI } from "../";
import MeAPI from "../me";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Me API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: MeAPI = new MeAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getJoinedGroups()", () => {
    it("should return my joined group data", async () => {
      scope = nock(getApiDomain())
        .get("/me/groups")
        .query({
          provider: "cryptobadge",
          token: "",
        })
        .reply(200, () => RAW.MY_JOINED_GROUPS);
      const { data } = await api.getJoinedGroups(
        "cryptobadge",
        {
          group: "",
          token: "",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.MY_JOINED_GROUPS.data);
    });
  });

  describe("updateProfile()", () => {
    it("should return updated user data", async () => {
      const changeInfo = {
        name: "la",
        bio: "hello world",
        avatar_url: "",
        tz: "Asia/Seoul",
        locale: "ko-kr",
      };

      scope = nock(getApiDomain())
        .put("/me", {
          profile: changeInfo,
        })
        .reply(200, () => ({
          data: {
            ...RAW.GROUP_WITH_USER.user,
            ...changeInfo,
          },
        }));
      const result = await api.updateProfile(changeInfo, cancelToken);

      expect(scope.isDone()).toBeTruthy();
      expect(result).toEqual({
        data: {
          ...RAW.GROUP_WITH_USER.user,
          ...changeInfo,
        },
      });
    });
  });
});
