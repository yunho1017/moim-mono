import makeShareUrl from "common/helpers/makeShareUrl";
import { MoimURL } from "app/common/helpers/url";

const ORIGIN = "https://moim.lvh.me";

delete (window as any).location;
(window as any).location = {
  origin: ORIGIN,
};

describe("makeShareUrl", () => {
  describe("when inject path", () => {
    it("should return origin concat a path string", () => {
      const forumId = "F1234";
      const forumPath = new MoimURL.Forum({ forumId }).toString();

      expect(makeShareUrl(forumPath)).toEqual(`${ORIGIN}${forumPath}`);
    });
  });
});
