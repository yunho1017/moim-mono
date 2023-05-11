jest.unmock("../envChecker");

const EnvChecker = require("../envChecker");
EnvChecker.isBrowser = () => true;

import { isElectronApp, isHubDomain, isGroupDomain } from "../envChecker";

describe("envChecker helper", () => {
  describe("isElectronApp()", () => {
    beforeEach(() => {
      Object.defineProperty(process, "versions", {
        value: {},
        writable: true,
      });
    });

    describe("when it's electron app", () => {
      beforeEach(() => {
        (process.versions as any) = {
          electron: "electron",
        };
      });

      it("should return true", () => {
        expect(isElectronApp()).toBeTruthy();
      });
    });

    describe("when it's regular browser", () => {
      it("should return false", () => {
        expect(isElectronApp()).toBeFalsy();
      });
    });
  });

  describe("isHubDomain()", () => {
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

    describe("when given regular hostname", () => {
      beforeEach(() => {
        location.hostname = "vingle.network";
      });
      it("should return true", () => {
        expect(isHubDomain()).toBeTruthy();
      });
    });

    describe("when given www. hostname", () => {
      beforeEach(() => {
        location.hostname = "www.vingle.network";
      });
      it("should return true", () => {
        expect(isHubDomain()).toBeTruthy();
      });
    });

    describe("when given group hostname", () => {
      beforeEach(() => {
        location.hostname = "acme.vingle.network";
      });
      it("should return false", () => {
        expect(isHubDomain()).toBeFalsy();
      });
    });

    describe("when given group hostname with Caps", () => {
      beforeEach(() => {
        location.hostname = "Venom.vingle.network";
      });
      it("should return false", () => {
        expect(isHubDomain()).toBeFalsy();
      });
    });

    describe("when given group hostname with different host", () => {
      beforeEach(() => {
        location.hostname = "moim.io";
      });
      it("should return false", () => {
        expect(isHubDomain()).toBeFalsy();
      });
    });
  });

  describe("isGroupDomain()", () => {
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

    describe("when given regular hostname", () => {
      beforeEach(() => {
        location.hostname = "vingle.network";
      });
      it("should return false", () => {
        expect(isGroupDomain()).toBeFalsy();
      });
    });

    describe("when given www. hostname", () => {
      beforeEach(() => {
        location.hostname = "www.vingle.network";
      });
      it("should return false", () => {
        expect(isGroupDomain()).toBeFalsy();
      });
    });

    describe("when given group hostname", () => {
      beforeEach(() => {
        location.hostname = "acme.vingle.network";
      });
      it("should return true", () => {
        expect(isGroupDomain()).toBeTruthy();
      });
    });

    describe("when given group hostname with Caps", () => {
      beforeEach(() => {
        location.hostname = "Venom.vingle.network";
      });
      it("should return true", () => {
        expect(isGroupDomain()).toBeTruthy();
      });
    });
  });
});
