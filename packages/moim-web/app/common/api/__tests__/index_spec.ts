jest.mock("common/api/base");
import { MoimAPI } from "../index";
import { AxiosRequestConfig } from "axios";
import { getApiDomain } from "common/helpers/domainMaker";

describe("MoimAPI", () => {
  let api: MoimAPI;
  let config: AxiosRequestConfig;
  describe("Setting base host url", () => {
    beforeEach(() => {
      api = new MoimAPI();
      config = api.group.getConfig();
    });
    it("should set config baseUrl is the arguments host", () => {
      expect(config.baseURL).toBe(getApiDomain());
    });
  });

  describe("getConfig()", () => {
    describe("get overwriting param data config spec", () => {
      beforeEach(() => {
        api = new MoimAPI();
        config = api.group.getConfig(
          {},
          {
            foo: "bar",
          },
        );
      });
      it("should set config.param.foo is 'bar'", () => {
        expect(config.params.foo).toBe("bar");
      });
    });
  });
});
