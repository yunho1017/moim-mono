import { currentUserSelector, currentGroupSelector } from "../app";
import { initialState } from "app/rootReducer";
import { RAW } from "../../__mocks__";

describe("app selector", () => {
  const MOCK_USER_ID = "U1234";
  const MOCK_GROUP_ID = "G1234";
  describe("currentUserSelector", () => {
    describe("when currentUserId is null", () => {
      it("should return null", () => {
        expect(
          currentUserSelector({
            ...initialState,
            app: {
              ...initialState.app,
              currentUserId: null,
            },
          }),
        ).toEqual(null);
      });
    });
    describe("when currentUserId is not null", () => {
      it("should return user data", () => {
        expect(
          currentUserSelector({
            ...initialState,
            app: {
              ...initialState.app,
              currentUserId: MOCK_USER_ID,
            },
            entities: {
              ...initialState.entities,
              users: {
                [MOCK_USER_ID]: {
                  ...RAW.MEMBER,
                  user_id: MOCK_USER_ID,
                  group_id: MOCK_GROUP_ID,
                  group: MOCK_GROUP_ID,
                } as any,
              },
              groups: {
                [MOCK_GROUP_ID]: {
                  ...RAW.NORMALIZED_GROUP,
                  id: MOCK_GROUP_ID,
                },
              },
            },
          }),
        ).toEqual({
          ...RAW.MEMBER,
          user_id: MOCK_USER_ID,
          group_id: MOCK_GROUP_ID,
          group: {
            ...RAW.NORMALIZED_GROUP,
            id: MOCK_GROUP_ID,
          },
        });
      });
    });
  });

  describe("currentGroupSelector", () => {
    describe("when currentGroupId is null", () => {
      it("should return null", () => {
        expect(
          currentGroupSelector({
            ...initialState,
            app: {
              ...initialState.app,
              currentGroupId: null,
            },
          }),
        ).toEqual(null);
      });
    });
    describe("when currentGroupId is not null", () => {
      it("should return group data", () => {
        expect(
          currentGroupSelector({
            ...initialState,
            app: {
              ...initialState.app,
              currentGroupId: MOCK_GROUP_ID,
            },
            entities: {
              ...initialState.entities,
              groups: {
                [MOCK_GROUP_ID]: {
                  ...RAW.NORMALIZED_GROUP,
                  id: MOCK_GROUP_ID,
                },
              },
            },
          }),
        ).toEqual({
          ...RAW.NORMALIZED_GROUP,
          id: MOCK_GROUP_ID,
        });
      });
    });
  });
});
