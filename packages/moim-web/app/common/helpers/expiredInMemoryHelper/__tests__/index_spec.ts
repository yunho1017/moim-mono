import * as ExpiredInMemoryHelper from "..";

const TARGET_DATA = {
  token: "AAAABBBCCCDDD",
};

const DESIRED_EXPIRED_TIME_ONE_HOUR = 60 * 60 * 1000;

describe("expiredInMemoryHelper", () => {
  jest
    .spyOn(global.Date, "now")
    .mockImplementation(() => new Date("2020-04-09 12:00:00").getTime());

  beforeEach(() => {
    ExpiredInMemoryHelper.clearAll();
  });

  describe("set()", () => {
    it("should store any type of data with desired expired time", () => {
      ExpiredInMemoryHelper.set(
        "A",
        TARGET_DATA,
        DESIRED_EXPIRED_TIME_ONE_HOUR,
      );
      const resultA = ExpiredInMemoryHelper.get("A");
      const resultB = ExpiredInMemoryHelper.get("B");
      expect(resultA).not.toBeNull();
      expect(resultA).toHaveProperty("token", TARGET_DATA.token);
      expect(resultB).toBeNull();
    });
  });

  describe("get()", () => {
    describe("when target item didn't store yet", () => {
      it("should return properly data", () => {
        const resultA = ExpiredInMemoryHelper.get("A");
        expect(resultA).toBeNull();
      });
    });

    describe("when target item remain lifetime", () => {
      it("should return properly data", () => {
        ExpiredInMemoryHelper.set(
          "A",
          TARGET_DATA,
          DESIRED_EXPIRED_TIME_ONE_HOUR,
        );
        const resultA = ExpiredInMemoryHelper.get("A");
        expect(resultA).not.toBeNull();
        expect(resultA).toHaveProperty("token", TARGET_DATA.token);
      });
    });

    describe("when target item expired", () => {
      it("should return null", () => {
        ExpiredInMemoryHelper.set(
          "A",
          TARGET_DATA,
          DESIRED_EXPIRED_TIME_ONE_HOUR,
        );

        jest
          .spyOn(global.Date, "now")
          .mockImplementation(() => new Date("2020-04-09 13:00:01").getTime());
        const resultA = ExpiredInMemoryHelper.get("A");
        expect(resultA).toBeNull();
      });
    });
  });

  describe("clearAll()", () => {
    it("should clear all of hash", () => {
      ExpiredInMemoryHelper.set(
        "A",
        TARGET_DATA,
        DESIRED_EXPIRED_TIME_ONE_HOUR,
      );
      ExpiredInMemoryHelper.set(
        "B",
        TARGET_DATA,
        DESIRED_EXPIRED_TIME_ONE_HOUR,
      );
      ExpiredInMemoryHelper.set(
        "C",
        TARGET_DATA,
        DESIRED_EXPIRED_TIME_ONE_HOUR,
      );

      ExpiredInMemoryHelper.clearAll();

      const resultA = ExpiredInMemoryHelper.get("A");
      const resultB = ExpiredInMemoryHelper.get("B");
      const resultC = ExpiredInMemoryHelper.get("C");
      expect(resultA).toBeNull();
      expect(resultB).toBeNull();
      expect(resultC).toBeNull();
    });
  });
});
