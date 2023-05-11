import { getTitle } from "../helpers";

const defaultTitle = "Title";
const mobileTitle = "MobileTitle";

describe("getTitle()", () => {
  describe("when is mobile environment", () => {
    const isMobile = true;

    describe("when current page is setting page", () => {
      it("should return value is null", () => {
        const title = getTitle({
          mobileTitle,
          isMobile,
          title: defaultTitle,
          isSettingListPage: true,
        });

        expect(title).toBeNull();
      });
    });

    describe("when current page is not a setting page", () => {
      it.skip("should return mobile title", () => {
        const title = getTitle({
          mobileTitle,
          isMobile,
          title: defaultTitle,
          isSettingListPage: false,
        });

        expect(title).toEqual(mobileTitle);
      });
    });
  });

  describe("when is not a mobile environment", () => {
    it("should return title", () => {
      const title = getTitle({
        mobileTitle,
        title: defaultTitle,
        isSettingListPage: true,
        isMobile: false,
      });

      expect(title).toEqual(defaultTitle);
    });
  });
});
