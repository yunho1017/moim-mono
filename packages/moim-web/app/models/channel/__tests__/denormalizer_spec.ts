import {
  channelDenormalizer,
  channelSingleItemDenormalizer,
  channelListDenormalizer,
} from "../denormalizer";
import { NORMALIZED } from "app/__mocks__";

const MOCK_ENTITIES: Moim.Entity.INormalizedData = {
  ...NORMALIZED.SIMPLE_CHANNELS.entities, // for set rest of entities
};

describe("Channel denormalizer", () => {
  describe("channelDenormalizer()", () => {
    it("should access all of reference key field", () => {
      const channel = channelDenormalizer(
        NORMALIZED.SIMPLE_CHANNEL.result,
        MOCK_ENTITIES,
      );

      expect(channel).toMatchObject({
        id: "C1234",
        type: "category",
        name: "category1",
        items: [
          {
            id: "F1234",
            type: "forum",
            name: "forum 1",
            stat: { count: 0, has_new: false, last_read: "M289Q7MU0" },
          },
        ],
      });
    });
  });

  describe("channelSingleItemDenormalizer()", () => {
    it("should access all of reference key field", () => {
      const channel = channelSingleItemDenormalizer(
        { data: NORMALIZED.SIMPLE_CHANNEL.result },
        MOCK_ENTITIES,
      );
      expect(channel).toMatchObject({
        data: {
          id: "C1234",
          type: "category",
          name: "category1",
          items: [
            {
              id: "F1234",
              type: "forum",
              name: "forum 1",
              stat: { count: 0, has_new: false, last_read: "M289Q7MU0" },
            },
          ],
        },
      });
    });
  });

  describe("channelListDenormalizer()", () => {
    it("should access all of reference key field", () => {
      const channel = channelListDenormalizer(
        { data: [NORMALIZED.SIMPLE_CHANNEL.result], paging: {} },
        MOCK_ENTITIES,
      );
      expect(channel).toMatchObject({
        data: [
          {
            id: "C1234",
            type: "category",
            name: "category1",
            items: [
              {
                id: "F1234",
                type: "forum",
                name: "forum 1",
                stat: { count: 0, has_new: false, last_read: "M289Q7MU0" },
              },
            ],
          },
        ],
        paging: {},
      });
    });
  });
});
