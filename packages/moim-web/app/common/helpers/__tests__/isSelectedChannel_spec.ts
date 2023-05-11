import isSelectedChannel from "common/helpers/isSelectedChannel";
import { MatchRouting } from "app/enums";

describe("isSelectedChannel()", () => {
  describe("when matchRoute is Conversation", () => {
    describe("when channel type is chat and same id", () => {
      it("should return truthy", () => {
        const conversationId = "C1234";
        const matchRoute = {
          type: MatchRouting.CONVERSATION,
          value: {
            conversationId,
          },
        };

        expect(
          isSelectedChannel(matchRoute, "conversation", conversationId),
        ).toBeTruthy();
      });
    });
  });

  describe("when matchRoute is Forum", () => {
    describe("when channel type is forum and same id", () => {
      it("should return truthy", () => {
        const forumId = "F1234";
        const matchRoute = {
          type: MatchRouting.FORUM,
          value: {
            forumId,
          },
        };

        expect(isSelectedChannel(matchRoute, "forum", forumId)).toBeTruthy();
      });
    });
  });

  describe("when matchRoute is ForumShow", () => {
    describe("when channel type is forum and same forumId and ThreadId", () => {
      it("should return truthy", () => {
        const forumId = "F1234";
        const threadId = "T1234";
        const matchRoute = {
          type: MatchRouting.FORUM_SHOW,
          value: {
            forumId,
            threadId,
          },
        };

        expect(isSelectedChannel(matchRoute, "forum", forumId)).toBeTruthy();
      });
    });
  });

  describe("when matchRoute is NotMatched", () => {
    it("should return falsy", () => {
      const matchRoute = {
        type: MatchRouting.NOT_MATCHED,
      };

      expect(isSelectedChannel(matchRoute, "forum", "F123")).toBeFalsy();
    });
  });
});
