import { INITIAL_STATE, reducer } from "../permission";

import { ActionCreators as PermissionActionCreators } from "app/actions/permission";
import { MOCK_CHANNEL, RAW } from "app/__mocks__";

const resourceId = MOCK_CHANNEL.FORUM_MOCK_DATA.id;
const accessPermission =
  RAW.PERMISSIONS.data.find(permission => permission.right === "ACCESS") ||
  RAW.PERMISSIONS.data[0];
const readListPermission =
  RAW.PERMISSIONS.data.find(
    permission => permission.right === "READ_POST_LIST",
  ) || RAW.PERMISSIONS.data[0];

describe("permission reducer", () => {
  let state: Moim.Permission.IPermissionData;

  describe("when receive START_GET_PERMISSION", () => {
    beforeEach(() => {
      state = reducer(
        INITIAL_STATE,
        PermissionActionCreators.startGetPermission({
          resourceId,
        }),
      );
    });

    it("should permissionLoading set true", () => {
      expect(state.permissionLoading[resourceId]).toBeTruthy();
    });
  });

  describe("when receive SUCCEED_GET_PERMISSION", () => {
    it("should permissionLoading set false and set permission", () => {
      state = reducer(
        INITIAL_STATE,
        PermissionActionCreators.succeedGetPermission({
          resourceId,
          permissions: RAW.PERMISSIONS.data,
        }),
      );

      expect(state.permissionLoading[resourceId]).toBeFalsy();
      expect(Object.values(state.permission[resourceId])).toEqual(
        RAW.PERMISSIONS.data,
      );
    });

    it("should update exist permission", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          permission: {
            [resourceId]: {
              [accessPermission.right]: accessPermission,
            },
          },
        } as Moim.Permission.IPermissionData,
        PermissionActionCreators.succeedGetPermission({
          resourceId,
          permissions: RAW.PERMISSIONS.data,
        }),
      );

      expect(Object.values(state.permission[resourceId]).length).toEqual(
        RAW.PERMISSIONS.data.length,
      );
    });
  });

  describe("when receive SUCCEED_UPDATE_PERMISSION", () => {
    it("should permissionLoading set false and set permission", () => {
      state = reducer(
        INITIAL_STATE,
        PermissionActionCreators.succeedUpdatePermission({
          resourceId,
          permissions: [accessPermission],
        }),
      );

      expect(state.permissionLoading[resourceId]).toBeFalsy();
      expect(Object.values(state.permission[resourceId])).toEqual([
        accessPermission,
      ]);
    });

    it("should update exist permission type replace", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          permission: {
            [resourceId]: {
              [accessPermission.right]: accessPermission,
            },
          },
        } as Moim.Permission.IPermissionData,
        PermissionActionCreators.succeedUpdatePermission({
          resourceId,
          permissions: [readListPermission],
        }),
      );

      expect(Object.values(state.permission[resourceId]).length).toEqual(2);
    });
  });

  describe("when receive FAILED_GET_PERMISSION", () => {
    beforeEach(() => {
      state = reducer(
        {
          ...INITIAL_STATE,
          permissionLoading: { [resourceId]: true },
        },
        PermissionActionCreators.failedGetPermission({
          resourceId,
        }),
      );
    });

    it("should permissionLoading set false", () => {
      expect(state.permissionLoading[resourceId]).toBeFalsy();
    });
  });

  describe("when receive CLEAR_PERMISSION", () => {
    beforeEach(() => {
      state = reducer(
        {
          permission: { [resourceId]: { ACCESS: accessPermission } },
          permissionLoading: { [resourceId]: true },
        } as Moim.Permission.IPermissionData,
        PermissionActionCreators.clearPermission(),
      );
    });

    it("should state set INITIAL_STATE", () => {
      expect(state).toEqual(INITIAL_STATE);
    });
  });
});
