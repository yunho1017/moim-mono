import makeOgMetaData from "common/helpers/makeOgMetaData";

describe("makeOgMetaData()", () => {
  const RAW_DATA = {
    type: "website",
    siteName: `siteName`,
    title: "title",
    description: "description",
    imageUrl: "imageUrl",
    url: "url",
  };

  let metaData: Moim.MetaTag[];

  beforeEach(() => {
    metaData = makeOgMetaData(RAW_DATA);
  });

  describe("when make OG Meta Data", () => {
    it("should has og:type", () => {
      const meta = metaData.find(data => data.property === "og:type");

      if (!meta) {
        fail("og:type is not exist");
      }

      expect(meta.content).toEqual(RAW_DATA.type);
    });

    it("should has og:url", () => {
      const meta = metaData.find(data => data.property === "og:url");

      if (!meta) {
        fail("og:url is not exist");
      }

      expect(meta.content).toEqual(RAW_DATA.url);
    });

    it("should has og:title", () => {
      const meta = metaData.find(data => data.property === "og:title");

      if (!meta) {
        fail("og:title is not exist");
      }

      expect(meta.content).toEqual(RAW_DATA.title);
    });

    it("should has og:description", () => {
      const meta = metaData.find(data => data.property === "og:description");

      if (!meta) {
        fail("og:description is not exist");
      }

      expect(meta.content).toEqual(RAW_DATA.description);
    });

    it("should has og:image", () => {
      const meta = metaData.find(data => data.property === "og:image");

      if (!meta) {
        fail("og:image is not exist");
      }

      expect(meta.content).toEqual(RAW_DATA.imageUrl);
    });
  });
});
