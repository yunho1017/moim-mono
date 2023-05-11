import * as History from "history";
import findIndexByLocation from "common/helpers/findIndexByLocation";

describe("findIndexByLocation()", () => {
  let locations: History.Location<Moim.IHistoryState>[] = [];

  beforeEach(() => {
    locations = [
      {
        pathname: "/app",
        search: "",
        state: {},
        hash: "",
        key: "1",
      },

      {
        pathname: "/forums/C123",
        search: "",
        state: {},
        hash: "",
        key: "2",
      },

      {
        pathname: "/forums/C123/threads/T123",
        search: "",
        state: {},
        hash: "",
        key: "3",
      },
    ];
  });

  describe("when include same location key in locations", () => {
    it("should return location", () => {
      expect(findIndexByLocation(locations, "1")).toEqual(0);
    });
  });

  describe("when not include same location key in locations", () => {
    it("should return -1", () => {
      expect(findIndexByLocation(locations, "10")).toEqual(-1);
    });
  });
});
