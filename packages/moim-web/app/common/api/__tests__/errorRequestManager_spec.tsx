jest.mock("common/api/base");
import ErrorRequestManager from "common/api/errorRequestManager";

const TEMP_URL = "https://moim.notwork/moim/1";
const TEMP_METHOD = "GET";

describe("ErrorRequestManger", () => {
  let errorRequestManager: ErrorRequestManager;

  beforeAll(() => {
    errorRequestManager = new ErrorRequestManager();
  });

  describe("when add error request", () => {
    describe("when request is first added", () => {
      it("should count is 1", () => {
        errorRequestManager.add(TEMP_URL, TEMP_METHOD);

        expect(
          errorRequestManager.getErrorCount(TEMP_URL, TEMP_METHOD),
        ).toEqual(1);
      });
    });

    describe("when already request once", () => {
      it("should count is 2", () => {
        errorRequestManager.add(TEMP_URL, TEMP_METHOD);

        expect(
          errorRequestManager.getErrorCount(TEMP_URL, TEMP_METHOD),
        ).toEqual(2);
      });
    });
  });

  describe("when remove error request", () => {
    it("should count is zero", () => {
      errorRequestManager.remove(TEMP_URL, TEMP_METHOD);

      expect(errorRequestManager.getErrorCount(TEMP_URL, TEMP_METHOD)).toEqual(
        0,
      );
    });
  });
});
