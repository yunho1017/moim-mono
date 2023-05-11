/* eslint-disable @typescript-eslint/unbound-method */
import { AnalyticsClass } from "../analytics";
import GoogleTracker from "../trackers/googleTracker";
import AmplitudeTracker from "../trackers/amplitudeTracker";

jest.mock("../trackers/googleTracker");
jest.mock("../trackers/amplitudeTracker");

describe("Analytics", () => {
  let analytics: AnalyticsClass;

  beforeEach(() => {
    analytics = AnalyticsClass.getInstance();
    analytics.init(
      { google: "UA-123", amplitude: "456" },
      { id: "G123", name: "test" },
    );
  });

  describe("when call event()", () => {
    it("should call tracker event Method", () => {
      analytics.event({
        category: "TEST_EVENT",
        action: "TEST",
      });

      expect(GoogleTracker.prototype.event).toHaveBeenCalled();
      expect(AmplitudeTracker.prototype.event).toHaveBeenCalled();
    });
  });

  describe("when call screenView()", () => {
    it("should call tracker screenView Method", () => {
      analytics.screenView("TEST_EVENT", "/testpath");

      expect(GoogleTracker.prototype.screenView).toHaveBeenCalled();
      expect(AmplitudeTracker.prototype.screenView).toHaveBeenCalled();
    });
  });
});
