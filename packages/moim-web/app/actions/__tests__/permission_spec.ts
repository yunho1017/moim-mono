jest.mock("common/api/permission");

import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { getPermission, ActionCreators } from "../permission";
import { RAW } from "app/__mocks__";

describe("Permission Action", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getPermission()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_PERMISSION, ADD_ENTITY, SUCCEED_GET_PERMISSION action", async () => {
        await store.dispatch(
          getPermission({
            resource: "CM0YKYJHM",
          }),
        );

        const [startGetPermission, succeedGetPermission] = store.getActions();

        expect(startGetPermission).toMatchObject(
          ActionCreators.startGetPermission({ resourceId: "CM0YKYJHM" }),
        );

        expect(succeedGetPermission).toMatchObject(
          ActionCreators.succeedGetPermission({
            resourceId: "CM0YKYJHM",
            permissions: RAW.PERMISSIONS.data,
          }),
        );
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_POSITIONS, FAILED_GET_POSITIONS", async () => {
        await store.dispatch(
          getPermission(
            {
              resource: "CM0YKYJHM",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startGetPermission, failedGetPermission] = store.getActions();

        expect(startGetPermission).toMatchObject(
          ActionCreators.startGetPermission({ resourceId: "CM0YKYJHM" }),
        );

        expect(failedGetPermission).toMatchObject(
          ActionCreators.failedGetPermission({ resourceId: "CM0YKYJHM" }),
        );
      });
    });
  });
});
