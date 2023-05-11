jest.mock("common/api/user");

import { RAW } from "app/__mocks__";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { EntityTypes, UserTypes } from "../types";
import { getBatchUsers, getUsers, postUser, getSearchUsers } from "../user";
import { getProfileBlocks } from "app/actions/user";
import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";

describe("user actions", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore({ app: { currentGroupId: "G123" } as any });
    store.clearActions();
  });

  describe("getUsers()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_USERS, ADD_ENTITY, SUCCEED_GET_USERS)", async () => {
        await store.dispatch(getUsers({}));
        const [
          startAction,
          addEntityAction,
          succeedAction,
        ] = store.getActions();
        expect(startAction).toMatchObject({
          type: UserTypes.START_GET_USERS,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedAction).toMatchObject({
          type: UserTypes.SUCCEED_GET_USERS,
          payload: {
            users: {
              data: [RAW.MEMBER.id],
              paging: {},
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_USERS, FAILED_GET_USERS)", async () => {
        await store.dispatch(
          getUsers({}, makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );
        const [startGetUsersAction, failedGetUsersAction] = store.getActions();
        expect(startGetUsersAction).toMatchObject({
          type: UserTypes.START_GET_USERS,
        });
        expect(failedGetUsersAction).toMatchObject({
          type: UserTypes.FAILED_GET_USERS,
        });
      });
    });
  });

  describe("postUser()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_POST_USER, ADD_ENTITY, SUCCEED_POST_USER)", async () => {
        await store.dispatch(postUser(RAW.MOCK_POST_USER_REQUEST_BODY));
        const [startAction, succeedAction] = store.getActions();
        expect(startAction).toMatchObject({
          type: UserTypes.START_POST_USER,
        });

        expect(succeedAction).toMatchObject({
          type: UserTypes.SUCCEED_POST_USER,
          payload: {
            groupId: "G123",
            user: {
              data: RAW.MEMBER.id,
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_POST_USER, FAILED_POST_USER)", async () => {
        await store.dispatch(
          postUser(
            RAW.MOCK_POST_USER_REQUEST_BODY,
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [startGetUsersAction, failedGetUsersAction] = store.getActions();
        expect(startGetUsersAction).toMatchObject({
          type: UserTypes.START_POST_USER,
        });
        expect(failedGetUsersAction).toMatchObject({
          type: UserTypes.FAILED_POST_USER,
        });
      });
    });
  });

  describe("getBatchUser()", () => {
    const users = ["U1234", "U3456"];

    describe("when succeed", () => {
      it("should dispatch START_GET_BATCH_USERS, ADD_ENTITY, SUCCEED_GET_BATCH_USERS action ", async () => {
        await store.dispatch(getBatchUsers(users));

        const [
          startGetBatchUsers,
          addEntity,
          succeedGetBatchUsers,
        ] = store.getActions();

        expect(startGetBatchUsers).toMatchObject({
          type: UserTypes.START_GET_BATCH_USERS,
        });

        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedGetBatchUsers).toMatchObject({
          type: UserTypes.SUCCEED_GET_BATCH_USERS,
          payload: users,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_BATCH_USERS, FAILED_GET_BATCH_USERS action", async () => {
        await store.dispatch(
          getBatchUsers(users, makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );

        const [startGetBatchUsers, failedGetBatchUsers] = store.getActions();

        expect(startGetBatchUsers).toMatchObject({
          type: UserTypes.START_GET_BATCH_USERS,
        });

        expect(failedGetBatchUsers).toMatchObject({
          type: UserTypes.FAILED_GET_BATCH_USERS,
        });
      });
    });
  });

  describe("getUsers()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_SEARCH_USERS, ADD_ENTITY, SUCCEED_GET_SEARCH_USERS)", async () => {
        await store.dispatch(getSearchUsers({ query: "user" }));
        const [
          startAction,
          addEntityAction,
          succeedAction,
        ] = store.getActions();
        expect(startAction).toMatchObject({
          type: UserTypes.START_GET_SEARCH_USERS,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedAction).toMatchObject({
          type: UserTypes.SUCCEED_GET_SEARCH_USERS,
          payload: {
            users: {
              data: [RAW.MEMBER.id],
              paging: {},
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_SEARCH_USERS, FAILED_GET_SEARCH_USERS)", async () => {
        await store.dispatch(
          getSearchUsers(
            { query: "user" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [startGetUsersAction, failedGetUsersAction] = store.getActions();
        expect(startGetUsersAction).toMatchObject({
          type: UserTypes.START_GET_SEARCH_USERS,
        });
        expect(failedGetUsersAction).toMatchObject({
          type: UserTypes.FAILED_GET_SEARCH_USERS,
        });
      });
    });
  });

  describe("getProfileBlocks()", () => {
    describe("when it successfully called", () => {
      it("should dispatch START,SUCCEEDED", async () => {
        await store.dispatch(getProfileBlocks("U1234", "show"));
        const [start, succeeded] = store.getActions();

        expect(start).toMatchObject({
          type: UserTypes.START_GET_PROFILE_BLOCKS,
          payload: { userId: "U1234", viewType: "show" },
        });

        expect(succeeded).toMatchObject({
          type: UserTypes.SUCCEEDED_GET_PROFILE_BLOCKS,
          payload: {
            userId: "U1234",
            viewType: "show",
            blocks: RAW.PROFILE_SHOW_BLOCKITS,
          },
        });
      });
    });

    describe("when it failed", () => {
      it("should dispatch START,FAILED", async () => {
        await store.dispatch(
          getProfileBlocks(
            "U1234",
            "show",
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [start, failed] = store.getActions();

        expect(start).toMatchObject({
          type: UserTypes.START_GET_PROFILE_BLOCKS,
          payload: { userId: "U1234", viewType: "show" },
        });

        expect(failed).toMatchObject({
          type: UserTypes.FAILED_GET_PROFILE_BLOCKS,
          payload: { userId: "U1234", viewType: "show" },
        });
      });
    });
  });
});
