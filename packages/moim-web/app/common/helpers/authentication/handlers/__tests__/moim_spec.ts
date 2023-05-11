import nock from "nock";
import { getAccessToken, IOptions } from "../moim/helpers";
import { getApiDomain } from "common/helpers/domainMaker";

jest.mock("common/helpers/popupWindowClass");
jest.mock("common/constants/hosts", () => ({
  WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX: {
    test() {
      return true;
    },
  },
}));

describe("moim authentication", () => {
  const MOCK_OPTIONS: IOptions = {
    groupId: "MOCK_CLIENT_ID",
    redirectUrl: "https://localhost:8080/callback.html",
    providers: {
      kakao: false,
    },
  };
  describe.skip("getAuthorizeState", () => {});

  describe("getAccessToken()", () => {
    let scope: nock.Scope;

    beforeAll(() => {
      nock.disableNetConnect();
    });

    afterAll(() => {
      nock.enableNetConnect();
    });

    afterEach(() => {
      nock.cleanAll();
    });

    describe("When success get authentication", () => {
      it("should get access_token object", async () => {
        const url = new URL(`${getApiDomain()}/v2/auth/token`);
        scope = nock(`${url.protocol}//${url.host}`)
          .post(url.pathname)
          .reply(200, () => ({
            access_token: "MOCK_ACCESS_TOKEN",
          }));
        const data = await getAccessToken({
          ...MOCK_OPTIONS,
          code: "MOCK_CODE",
          verifier: "MOCK_VERIFIER",
        });
        expect(scope.isDone()).toBeTruthy();
        expect(data.access_token).toBe("MOCK_ACCESS_TOKEN");
      });
    });
  });
});
