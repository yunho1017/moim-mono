/**
 * @jest-environment jsdom
 */
import LocationCreator from "../locationCreator";
jest.mock("common/helpers/envChecker", () => ({
  isBrowser() {
    return true;
  },
}));

function setLocationSearch(text: string) {
  (global as any).window = Object.create(window);
  Object.defineProperty(window, "location", {
    value: {
      ...window.location,
      search: text,
    },
    writable: true,
  });
}

describe("LocationCreator", () => {
  describe("LocationCreator.toString", () => {
    it("should use reactRouter.generatePath is generate alright", () => {
      expect(
        new LocationCreator("/path/foo/bar/:id", { id: "12345" }).toString(),
      ).toBe("/path/foo/bar/12345");
    });
  });

  describe("LocationCreator.toLocation", () => {
    it("should query option is be queryString", () => {
      expect(
        new LocationCreator("/path/foo/:id", { id: "한글" }).toLocation({
          query: {
            search: "한글",
          },
        }),
      ).toEqual({
        pathname: "/path/foo/한글",
        search: `?search=${encodeURIComponent("한글")}`,
        state: { modal: false },
        hash: "",
      });
    });

    it("should modal options is be state.modal", () => {
      expect(
        new LocationCreator("/path/foo/:id", { id: "한글" }).toLocation({
          modal: true,
        }),
      ).toEqual({
        pathname: "/path/foo/한글",
        state: { modal: true },
        search: "",
        hash: "",
      });
    });

    describe("when withBrowserSearch option pass", () => {
      const MOCK_WINDOW_LOCATION_SEARCH = "?m=1234";

      setLocationSearch(MOCK_WINDOW_LOCATION_SEARCH);

      it("should location.search options is concat to search", () => {
        expect(
          new LocationCreator("/path/foo/:id", { id: "빙글" }).toLocation({
            withBrowserSearch: true,
          }),
        ).toEqual({
          pathname: "/path/foo/빙글",
          search: "?m=1234",
          state: { modal: false },
          hash: "",
        });
      });

      it("should query option is better then location.search is concat to search", () => {
        expect(
          new LocationCreator("/path/foo/:id", { id: "빙글" }).toLocation({
            withBrowserSearch: true,
            query: { m: "5678" },
          }),
        ).toEqual({
          pathname: "/path/foo/빙글",
          search: "?m=5678",
          state: { modal: false },
          hash: "",
        });
      });
    });
  });
});
