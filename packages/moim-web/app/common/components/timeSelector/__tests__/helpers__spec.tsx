import moment from "moment";
import {
  formatTime,
  getTimeList,
} from "common/components/timeSelector/helpers";

describe("time selector helper", () => {
  describe("getTimeList()", () => {
    describe("when get one day time list", () => {
      let timeList: Date[] = [];

      beforeEach(() => {
        timeList = getTimeList({});
      });

      it("should list length is expect length", () => {
        expect(timeList.length).toEqual(48);
      });
    });

    describe("when setting start time", () => {
      let timeList: Date[] = [];

      beforeEach(() => {
        timeList = getTimeList({
          start: moment("22:00", "HH:mm").toDate(),
        });
      });

      it("should list length is expect length", () => {
        expect(timeList.length).toEqual(4);
      });
    });

    describe("when setting start time and end time", () => {
      let timeList: Date[] = [];

      beforeEach(() => {
        timeList = getTimeList({
          start: moment("10:00", "HH:mm").toDate(),
          end: moment("15:00", "HH:mm").toDate(),
        });
      });

      it("should list length is expect length", () => {
        expect(timeList.length).toEqual(10);
      });
    });

    describe("when setting start time and end time and intervalMinute", () => {
      let timeList: Date[] = [];

      beforeEach(() => {
        timeList = getTimeList({
          start: moment("10:00", "HH:mm").toDate(),
          end: moment("15:00", "HH:mm").toDate(),
          intervalMinute: 20,
        });
      });

      it("should list length is expect length", () => {
        expect(timeList.length).toEqual(15);
      });
    });
  });

  describe("formatTime()", () => {
    describe("when format is 12", () => {
      it("should return time string containing AM string", () => {
        expect(formatTime(new Date("Mon 03-Jul-2017, 11:00 AM"), 12)).toEqual(
          "11:00 AM",
        );
      });

      it("should return time string containing PM string", () => {
        expect(formatTime(new Date("Mon 03-Jul-2017, 13:00"), 12)).toEqual(
          "01:00 PM",
        );
      });
    });

    describe("when format is 24", () => {
      it("should return expected time string", () => {
        expect(formatTime(new Date("Mon 03-Jul-2017, 23:00"), 24)).toEqual(
          "23:00",
        );
      });

      it("should return time string on convert 24 hours", () => {
        expect(formatTime(new Date("Mon 03-Jul-2017, 03:00 PM"), 24)).toEqual(
          "15:00",
        );
      });
    });
  });
});
