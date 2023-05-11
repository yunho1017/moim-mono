import {
  directMessageListNormalizer,
  directMessageNormalizer,
  directMessageSingleItemNormalizer,
} from "../normalizer";

const DIRECT_MESSAGE: Moim.DirectMessage.INormalizedDirectMessage = {
  id: "CVPM21VIC",
  members: ["UY7J0PKJG", "UY7J0P123"],
  creator: "UY7J0PKJG",
  created_at: 1581323822526,
  latest: "Mk6sy192m",
  stat: {
    count: 0,
    has_new: false,
    last_read: "",
    updated_at: 0,
  },
  blocked: false,
  sendable: true,
};

describe("DirectMessage Normalizer", () => {
  describe("directMessageNormalizer()", () => {
    it("should able normalize", () => {
      const result = directMessageNormalizer(DIRECT_MESSAGE);

      expect(result.entities).toHaveProperty("directMessages");
      expect(result.result).toEqual(DIRECT_MESSAGE.id);
    });
  });

  describe("directMessageSingleItemNormalizer()", () => {
    it("should able normalize", () => {
      const result = directMessageSingleItemNormalizer({
        data: DIRECT_MESSAGE,
      });

      expect(result.entities).toHaveProperty("directMessages");
      expect(result.result.data).toEqual(DIRECT_MESSAGE.id);
    });
  });

  describe("directMessageListNormalizer()", () => {
    it("should able normalize", () => {
      const result = directMessageListNormalizer({
        data: [DIRECT_MESSAGE, { ...DIRECT_MESSAGE, id: "2" }],
      });

      expect(result.entities).toHaveProperty("directMessages");
      expect(result.result.data).toHaveLength(2);
    });
  });
});
