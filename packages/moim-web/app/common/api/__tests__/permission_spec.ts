jest.mock("common/api/base");
import nock from "nock";
import axios from "axios";
import PermissionAPI from "common/api/permission";
import { MoimAPI } from "common/api";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Permission API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: PermissionAPI = new PermissionAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getPermission()", () => {
    it("should get permission list data", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/permission")
        .query({
          resource: "CM0YKYJHM",
          version: "v2",
        })
        .reply(200, () => RAW.PERMISSIONS);

      const { data } = await api.getPermission(
        {
          resource: "CM0YKYJHM",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(6);
      expect(data).toEqual(RAW.PERMISSIONS.data);
    });
  });
});
