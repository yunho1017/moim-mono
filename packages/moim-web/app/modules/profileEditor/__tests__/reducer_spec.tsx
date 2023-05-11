import { AllActions } from "app/actions";
import { ActionCreators as MeActionCreators } from "app/actions/me";
import { INITIAL_STATE, reducer } from "../reducer";

const MEMBER = {
  ...require("app/__mocks__/member.json"),
  positions: [],
  certifications: [],
} as Moim.User.IUser;
function reduceState(action: AllActions, state = INITIAL_STATE) {
  return reducer(state, action);
}

describe("Profile Editor's page reducer", () => {
  describe("when receive OPEN_EDIT_MY_PROFILE", () => {
    it("should open state to true", () => {
      const state = reduceState(MeActionCreators.openEditMyProfile());
      expect(state.open).toBeTruthy();
    });
  });

  describe("when receive CLOSE_EDIT_MY_PROFILE", () => {
    it("should open state to false", () => {
      const state = reduceState(MeActionCreators.closeEditMyProfile(), {
        ...INITIAL_STATE,
        open: true,
      });
      expect(state.open).toBeFalsy();
    });
  });

  describe("when receive START_CHANGE_MY_PROFILE", () => {
    it("should isLoading, isFailed state to true, false", () => {
      const state = reduceState(MeActionCreators.startChangeMyProfile());
      expect(state.isUpdateLoading).toBeTruthy();
      expect(state.isUpdateFailed).toBeFalsy();
    });
  });

  describe("when receive SUCCEEDED_CHANGE_MY_PROFILE", () => {
    it("should isLoading, isFailed state to false, false", () => {
      const state = reduceState(
        MeActionCreators.succeededChangeMyProfile(MEMBER),
      );
      expect(state.isUpdateLoading).toBeFalsy();
      expect(state.isUpdateFailed).toBeFalsy();
    });
  });

  describe("when receive FAILED_CHANGE_MY_PROFILE", () => {
    it("should isLoading, isFailed state to false, true", () => {
      const state = reduceState(MeActionCreators.failedChangeMyProfile());
      expect(state.isUpdateLoading).toBeFalsy();
      expect(state.isUpdateFailed).toBeTruthy();
    });
  });

  describe("when receive START_UPDATE_AVATAR", () => {
    it("should isLoading, isFailed state to true, false", () => {
      const state = reduceState(MeActionCreators.startUpdateAvatar());
      expect(state.isAvatarUploading).toBeTruthy();
      expect(state.isAvatarUploadFailed).toBeFalsy();
    });
  });

  describe("when receive SUCCEEDED_UPDATE_AVATAR", () => {
    it("should isLoading, isFailed state to false, false", () => {
      const state = reduceState(MeActionCreators.succeededUpdateAvatar());
      expect(state.isAvatarUploading).toBeFalsy();
      expect(state.isAvatarUploadFailed).toBeFalsy();
    });
  });

  describe("when receive FAILED_UPDATE_AVATAR", () => {
    it("should isLoading, isFailed state to false, true", () => {
      const state = reduceState(MeActionCreators.failedUpdateAvatar());
      expect(state.isAvatarUploading).toBeFalsy();
      expect(state.isAvatarUploadFailed).toBeTruthy();
    });
  });
});
