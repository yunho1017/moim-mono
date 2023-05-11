jest.mock("common/api/me");

import axios, { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { IThunkMockState, generateMockStore } from "app/__mocks__/mockStore";
import { makeCancelTokenWithResponse } from "common/helpers/mockingCancelToken";
import { updateMyProfile, getMyJoinedMoims, ActionCreators } from "..";

describe("Me action", () => {
  let store: IThunkMockState;
  const cancelToken: CancelToken = axios.CancelToken.source().token;

  const MOCK_ERROR: Moim.IErrorResponse = {
    code: "MOCK_ERROR",
    message: "This is mocking error",
  };

  const updateProfile: Moim.User.IUpdatableInfo = {
    name: "new name",
  };

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("updateMyProfile()", () => {
    describe("when function work properly", () => {
      it("should return START, SUCCEEDED", async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await store.dispatch(updateMyProfile(updateProfile, cancelToken));
        const [start, succeeded] = store.getActions();
        expect(start).toEqual(ActionCreators.startChangeMyProfile());
        expect(succeeded).toEqual(
          ActionCreators.succeededChangeMyProfile({
            ...RAW.GROUP_WITH_USER.user,
            ...updateProfile,
          } as Moim.User.IUser),
        );
      });
    });

    describe("when function didn't work properly", () => {
      it("should return START, FAILED", async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await store.dispatch(
          updateMyProfile(
            updateProfile,
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [start, failed] = store.getActions();
        expect(start).toEqual(ActionCreators.startChangeMyProfile());
        expect(failed).toEqual(ActionCreators.failedChangeMyProfile());
      });
    });
  });

  describe("getMyJoinedMoims()", () => {
    describe("when function work properly", () => {
      it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await store.dispatch(getMyJoinedMoims());
        const [start, addEntity, succeeded] = store.getActions();

        expect(start).toEqual(ActionCreators.startGetMyJoinedMoim());
        expect(addEntity.payload).toHaveProperty("groups");
        expect(Object.keys(addEntity.payload.groups)).toHaveLength(
          RAW.MY_JOINED_GROUPS.data.length,
        );
        expect(succeeded).toEqual(
          ActionCreators.succeededGetMyJoinedMoim({
            data: ["G03PCGV9S", "G0QSTKPID", "G0ZHM48ED"],
            paging: {},
          }),
        );
      });
    });
  });
});
