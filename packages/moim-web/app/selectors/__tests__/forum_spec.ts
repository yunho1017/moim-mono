import { initialState } from "app/rootReducer";
import { RAW } from "app/__mocks__";
import { getForumByIdSelector } from "../forum";

describe("forum selector", () => {
  describe("getForumByIdSelector", () => {
    describe("when has same id forum channel", () => {
      it("should return denormalized forum channel", () => {
        const state = {
          ...initialState,
          entities: {
            ...initialState.entities,
            forums: {
              [RAW.NORMALIZED_CHANNEL.id]: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: RAW.NORMALIZED_MEMBER.id,
                group: RAW.GROUP.id,
              },
            },
            users: {
              [RAW.NORMALIZED_MEMBER.id]: {
                ...RAW.NORMALIZED_MEMBER,
                certifications: { data: [] },
                positions: [],
              },
            },
            groups: {
              [RAW.GROUP.id]: {
                ...RAW.NORMALIZED_GROUP,
              },
            },
          },
          forumData: {
            ...initialState.forumData,
            forumIds: {
              data: [RAW.NORMALIZED_CHANNEL.id],
              paging: {},
            },
          },
        };

        expect(getForumByIdSelector(state, RAW.NORMALIZED_CHANNEL.id)).toEqual({
          ...RAW.NORMALIZED_CHANNEL,
          creator: {
            ...RAW.NORMALIZED_MEMBER,
            certifications: { data: [] },
            positions: [],
          },
          group: {
            ...RAW.NORMALIZED_GROUP,
          },
        });
      });
    });
  });
});
