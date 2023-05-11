import {
  directMessageDenormalizer,
  directMessageListDenormalizer,
  directMessageSingleItemDenormalizer,
} from "../denormalizer";
import { RAW, NORMALIZED } from "app/__mocks__";

const MOCK_ENTITIES = {
  ...NORMALIZED.DIRECT_MESSAGE.entities,
};

describe("DirectMessage Denormalize", () => {
  describe("directMessageDenormalizer()", () => {
    it("should get DirectMessage", () => {
      const directMessage = directMessageDenormalizer(
        RAW.DIRECT_MESSAGE.id,
        MOCK_ENTITIES,
      );

      expect(directMessage.id).toEqual(RAW.DIRECT_MESSAGE.id);
    });
  });

  describe("directMessageSingleItemDenormalizer()", () => {
    it("should get DirectMessage", () => {
      const directMessage = directMessageSingleItemDenormalizer(
        {
          data: RAW.DIRECT_MESSAGE.id,
        },
        MOCK_ENTITIES,
      );

      expect(directMessage.data.id).toEqual(RAW.DIRECT_MESSAGE.id);
    });
  });

  describe("directMessageListDenormalizer()", () => {
    it("should get DirectMessage", () => {
      const directMessage = directMessageListDenormalizer(
        {
          data: [RAW.DIRECT_MESSAGE.id],
          paging: {},
        },
        MOCK_ENTITIES,
      );

      expect(directMessage.data[0].id).toEqual(RAW.DIRECT_MESSAGE.id);
    });
  });
});
