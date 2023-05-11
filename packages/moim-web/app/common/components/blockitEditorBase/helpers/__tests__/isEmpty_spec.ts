import isEmpty from "../isEmpty";

describe("RichEditor's isEmpty() helper", () => {
  describe("when pass empty content", () => {
    it("should return isEmptyText to true", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([]);
      expect(isEmptyText).toBeTruthy();
      expect(isEmptyFile).toBeTruthy();
      expect(isEmptyLinkPreview).toBeTruthy();
    });
  });

  describe("when pass empty text content", () => {
    it("should return isEmptyText to true", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "" },
      ]);
      expect(isEmptyText).toBeTruthy();
      expect(isEmptyFile).toBeTruthy();
      expect(isEmptyLinkPreview).toBeTruthy();
    });
  });

  describe("when pass text content", () => {
    it("should return isEmptyText to false", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "hello" },
      ]);
      expect(isEmptyText).toBeFalsy();
      expect(isEmptyFile).toBeTruthy();
      expect(isEmptyLinkPreview).toBeTruthy();
    });
  });

  describe("when pass empty text with file", () => {
    it("should return isEmptyText to true and isEmptyFile to false", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "" },
        { type: "file", files: [{ id: "1234", title: "image.png" }] },
        { type: "text", content: "" },
      ]);
      expect(isEmptyText).toBeTruthy();
      expect(isEmptyFile).toBeFalsy();
      expect(isEmptyLinkPreview).toBeTruthy();
    });
  });

  describe("when pass text with file", () => {
    it("should return isEmptyText to false and isEmptyFile to false", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "" },
        { type: "file", files: [{ id: "1234", title: "image.png" }] },
        { type: "text", content: "hi!" },
      ]);
      expect(isEmptyText).toBeFalsy();
      expect(isEmptyFile).toBeFalsy();
      expect(isEmptyLinkPreview).toBeTruthy();
    });
  });

  describe("when pass empty text with linkPreview", () => {
    it("should return isEmptyText to true and isEmptyLinkPreview to false", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "" },
        {
          type: "link-preview",
          url: "",
          canonical_url: "",
          fallback: "",
          title: "",
          site: {
            name: "test",
          },
        },
      ]);
      expect(isEmptyText).toBeTruthy();
      expect(isEmptyFile).toBeTruthy();
      expect(isEmptyLinkPreview).toBeFalsy();
    });
  });

  describe("when pass text with linkPreview", () => {
    it("should return isEmptyText to false and isEmptyLinkPreview to false", () => {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty([
        { type: "text", content: "hello" },
        {
          type: "link-preview",
          url: "",
          canonical_url: "",
          fallback: "",
          title: "",
          site: {
            name: "test",
          },
        },
      ]);
      expect(isEmptyText).toBeFalsy();
      expect(isEmptyFile).toBeTruthy();
      expect(isEmptyLinkPreview).toBeFalsy();
    });
  });
});
