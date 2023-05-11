jest.mock("common/api/base");
// vendor
import nock from "nock";
import axios from "axios";
// api
import AgreementAPI from "common/api/agreement";
import { MoimAPI } from "common/api";
// mock
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Category API ", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;
  const api: AgreementAPI = new AgreementAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getAgreement()", () => {
    it("should get agreement response", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/agreement/terms")
        .reply(200, () => RAW.AGREEMENT_TERM);

      const result = await api.getAgreement("terms", cancelToken);
      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.AGREEMENT_TERM.data);
    });
  });

  describe("putAgreement()", () => {
    it("should put new data & get agreement response", async () => {
      scope = nock(getApiDomain())
        .put("/groups/testGId/agreement/terms", {
          agreement: { content: [{ type: "text", content: "hi" }] },
        })
        .reply(200, () => RAW.AGREEMENT_TERM);

      const result = await api.putAgreement(
        "terms",
        [{ type: "text", content: "hi" }],
        cancelToken,
      );
      expect(scope.isDone()).toBeTruthy();
      expect(result.data).toEqual(RAW.AGREEMENT_TERM.data);
    });
  });
});
