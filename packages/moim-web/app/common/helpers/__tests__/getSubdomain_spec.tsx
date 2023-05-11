jest.mock("common/helpers/envChecker", () => ({
  isBrowser: () => true,
}));

import { getSubdomain } from "../getSubdomain";

describe("getSubdomain helpers", () => {
  beforeAll(() => {
    (global as any).window = Object.create(window);
    const url = "dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        hostname: url,
      },
      writable: true,
    });
  });

  describe("getSubdomain()", () => {
    describe("when given regular hostname", () => {
      beforeEach(() => {
        location.hostname = "vingle.network";
      });
      it("should return hub", () => {
        expect(getSubdomain()).toBe("");
      });
    });

    describe("when given www. hostname", () => {
      beforeEach(() => {
        location.hostname = "www.vingle.network";
      });
      it("should return hub", () => {
        expect(getSubdomain()).toBe("www");
      });
    });

    describe("when given group hostname", () => {
      beforeEach(() => {
        location.hostname = "acme.vingle.network";
      });
      it("should return groupname", () => {
        expect(getSubdomain()).toBe("acme");
      });
    });

    describe("when given group hostname with Caps", () => {
      beforeEach(() => {
        location.hostname = "Venom.vingle.network";
      });
      it("should return groupname", () => {
        expect(getSubdomain()).toBe("Venom");
      });
    });
  });
});
