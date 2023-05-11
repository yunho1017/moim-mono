import getPageName from "../pageNameHelper";

describe("pageNameHelper", () => {
  describe("getPageName()", () => {
    describe("when path is signup", () => {
      it("should return pageName is signup", () => {
        expect(getPageName("/channel/C123")).toEqual("channel");
      });
    });

    describe("when path is not expected path", () => {
      it("should return pageName is else", () => {
        expect(getPageName("/aa/bb/cc/dd")).toEqual("unknown");
        expect(getPageName("/test11/aa/ff/cc/dd")).toEqual("unknown");
      });
    });
  });
});
