import { INITIAL_STATE, reducer } from "../group";
import { ActionCreators as UserActionCreators } from "app/actions/user";
import { ActionCreators as MeActionCreators } from "app/actions/me";
import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { RAW } from "app/__mocks__";
import { MOCK_ERROR } from "common/helpers/mockingCancelToken";

describe("forumData reducer", () => {
  let state: Moim.Group.IGroupData;

  describe("getUsers", () => {
    describe("when receive START_GET_CONVERSATIONS", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, UserActionCreators.startGetUsers());
      });

      it("should getMembersLoading set true", () => {
        expect(state.getMembersLoading).toBe(true);
      });
    });

    describe("when receive SUCCEED_GET_USERS", () => {
      describe("when users data is empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getMembersLoading: true,
            },
            UserActionCreators.succeedGetUsers({
              users: { paging: {}, data: [RAW.MEMBER.id] },
            }),
          );
        });

        it("should getMembersLoading set false", () => {
          expect(state.getMembersLoading).toBe(false);
        });

        it("should conversations is payload.conversations", () => {
          expect(state.members).toEqual({
            data: [RAW.MEMBER.id],
            paging: {},
          });
        });
      });

      describe("when users is not empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getMembersLoading: true,
              members: {
                data: ["U1234"],
                paging: {},
              },
            },
            UserActionCreators.succeedGetUsers({
              users: { paging: {}, data: [RAW.MEMBER.id] },
            }),
          );
        });

        it("should data added from payload", () => {
          expect(state.members).toEqual({
            data: ["U1234", RAW.MEMBER.id],
            paging: {},
          });
        });
      });
    });

    describe("when receive FAILED_GET_USERS", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            getMembersLoading: true,
          },
          UserActionCreators.failedGetUsers(),
        );
      });
      it("should getMembersLoading set false", () => {
        expect(state.getMembersLoading).toBe(false);
      });
    });
  });

  describe("when receive START_GET_MY_JOINED_MOIMS", () => {
    beforeEach(() => {
      state = reducer(INITIAL_STATE, MeActionCreators.startGetMyJoinedMoim());
    });

    it("should isGetMyJoinedMoimsLoading set true", () => {
      expect(state.isGetMyJoinedMoimsLoading).toBeTruthy();
    });
  });

  describe("when receive SUCCEEDED_GET_MY_JOINED_MOIMS", () => {
    beforeEach(() => {
      state = reducer(
        INITIAL_STATE,
        MeActionCreators.succeededGetMyJoinedMoim({
          data: ["TEST"],
          paging: {},
        }),
      );
    });

    it("should isGetMyJoinedMoimsLoading set false and set joined moim data", () => {
      expect(state.myJoinedMoims.data).toHaveLength(1);
      expect(state.isGetMyJoinedMoimsLoading).toBeFalsy();
    });
  });

  describe("when receive FAILED_GET_MY_JOINED_MOIMS", () => {
    beforeEach(() => {
      state = reducer(
        {
          ...INITIAL_STATE,
          isGetMyJoinedMoimsLoading: true,
        },
        MeActionCreators.failedGetMyJoinedMoim(),
      );
    });

    it("should isGetMyJoinedMoimsLoading set true", () => {
      expect(state.isGetMyJoinedMoimsLoading).toBeFalsy();
    });
  });

  describe("when receive START_RENAME_MOIM", () => {
    const id = "G1234";

    it("should change moimRename id and loading state", () => {
      state = reducer(
        INITIAL_STATE,
        GroupActionCreators.startRenameMoim({
          id,
        }),
      );

      expect(state.moimRename.id).toEqual(id);
      expect(state.moimRename.loading).toBeTruthy();
    });

    describe("when already has error state", () => {
      it("should change error state to undefined", () => {
        state = reducer(
          {
            ...INITIAL_STATE,
            moimRename: {
              ...INITIAL_STATE.moimRename,
              id: "G4567",
              error: MOCK_ERROR,
            },
          },
          GroupActionCreators.startRenameMoim({
            id,
          }),
        );

        expect(state.moimRename.error).toBeUndefined();
      });
    });
  });

  describe("when receive SUCCEED_RENAME_MOIM", () => {
    const id = "G1234";

    it("should change moimRename loading state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimRename: {
            id,
            loading: true,
          },
        },
        GroupActionCreators.succeedRenameMoim({ id }),
      );

      expect(state.moimRename.id).toEqual(id);
      expect(state.moimRename.loading).toBeFalsy();
    });
  });

  describe("when receive FAILED_RENAME_MOIM", () => {
    const id = "G1234";

    it("should change loading state and error state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimRename: {
            id,
            loading: true,
          },
        },
        GroupActionCreators.failedRenameMoim({
          id,
          error: MOCK_ERROR,
        }),
      );

      expect(state.moimRename.id).toEqual(id);
      expect(state.moimRename.loading).toBeFalsy();
      expect(state.moimRename.error).toEqual(MOCK_ERROR);
    });
  });

  describe("when receive START_SET_DESCRIPTION_MOIM", () => {
    const id = "G1234";

    it("should change moimSetDescription id and loading state", () => {
      state = reducer(
        INITIAL_STATE,
        GroupActionCreators.startSetDescriptionMoim({
          id,
        }),
      );

      expect(state.moimSetDescription.id).toEqual(id);
      expect(state.moimSetDescription.loading).toBeTruthy();
    });

    describe("when already has error state", () => {
      it("should change error state to undefined", () => {
        state = reducer(
          {
            ...INITIAL_STATE,
            moimSetDescription: {
              ...INITIAL_STATE.moimSetDescription,
              id: "G4567",
              error: MOCK_ERROR,
            },
          },
          GroupActionCreators.startSetDescriptionMoim({
            id,
          }),
        );

        expect(state.moimRename.error).toBeUndefined();
      });
    });
  });

  describe("when receive SUCCEED_SET_DESCRIPTION_MOIM", () => {
    const id = "G1234";

    it("should change moimSetDescription loading state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimSetDescription: {
            id,
            loading: true,
          },
        },
        GroupActionCreators.succeedSetDescriptionMoim({ id }),
      );

      expect(state.moimSetDescription.id).toEqual(id);
      expect(state.moimSetDescription.loading).toBeFalsy();
    });
  });

  describe("when receive FAILED_SET_DESCRIPTION_MOIM", () => {
    const id = "G1234";

    it("should change loading state and error state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimSetDescription: {
            id,
            loading: true,
          },
        },
        GroupActionCreators.failedSetDescriptionMoim({
          id,
          error: MOCK_ERROR,
        }),
      );

      expect(state.moimSetDescription.id).toEqual(id);
      expect(state.moimSetDescription.loading).toBeFalsy();
      expect(state.moimSetDescription.error).toEqual(MOCK_ERROR);
    });
  });

  describe("when receive START_UPDATE_GROUP_ICON", () => {
    const id = "G1234";

    it("should change moimSetIcon state id and loading state", () => {
      state = reducer(
        INITIAL_STATE,
        GroupActionCreators.startUpdateGroupIcon({
          id,
        }),
      );

      expect(state.moimUpdateIcon.id).toEqual(id);
      expect(state.moimUpdateIcon.loading).toBeTruthy();
    });
  });

  describe("when receive SUCCEED_UPDATE_GROUP_ICON", () => {
    const id = "G1234";

    it("should change moimSetIcon state id and loading state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimUpdateIcon: {
            ...INITIAL_STATE.moimUpdateIcon,
            id,
            loading: true,
          },
        },
        GroupActionCreators.succeedUpdateGroupIcon(),
      );

      expect(state.moimUpdateIcon.id).toEqual(id);
      expect(state.moimUpdateIcon.loading).toBeFalsy();
    });
  });

  describe("when receive FAILED_UPDATE_GROUP_ICON", () => {
    const id = "G1234";

    it("should change moimSetIcon state id and loading state", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          moimUpdateIcon: {
            ...INITIAL_STATE.moimUpdateIcon,
            id,
            loading: true,
          },
        },
        GroupActionCreators.failedUpdateGroupIcon({
          error: MOCK_ERROR,
        }),
      );

      expect(state.moimUpdateIcon.id).toEqual(id);
      expect(state.moimUpdateIcon.loading).toBeFalsy();
      expect(state.moimUpdateIcon.error).toEqual(MOCK_ERROR);
    });
  });

  describe("when receive SUCCEED_GET_MOIM_THEME", () => {
    it("should change theme data", () => {
      state = reducer(
        INITIAL_STATE,
        GroupActionCreators.succeedGetMoimTheme({ data: RAW.GROUP_THEME }),
      );

      expect(state.theme).toEqual(RAW.GROUP_THEME);
    });
  });

  describe("when receive START_GET_MOIM_COVER", () => {
    it("should getMoimCoverLoading to be true", () => {
      state = reducer(INITIAL_STATE, GroupActionCreators.startGetMoimCover());

      expect(state.getMoimCoverLoading).toBeTruthy();
    });
  });
  describe("when receive SUCCEED_GET_MOIM_THEME", () => {
    it("should change cover data", () => {
      state = reducer(
        INITIAL_STATE,
        GroupActionCreators.succeedGetMoimCover({ data: RAW.MOIM_COVER }),
      );

      expect(state.cover).toEqual(RAW.MOIM_COVER);
    });
  });

  describe("when receive FAILED_GET_MOIM_COVER", () => {
    it("should getMoimCoverLoading to be false", () => {
      state = reducer(
        { ...INITIAL_STATE, getMoimCoverLoading: true },
        GroupActionCreators.failedGetMoimCover({}),
      );

      expect(state.getMoimCoverLoading).toBeFalsy();
    });
  });
});
