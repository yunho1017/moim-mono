import { RenderHookResult } from "@testing-library/react-hooks";
import { renderHookWithStoreAndIntl } from "app/__tests__/intlEnzymeTestHelper";
import useCurrentUser from "common/hooks/useCurrentUser";
import { initialState } from "app/rootReducer";
import { NORMALIZED, RAW } from "app/__mocks__";

describe("useCurrentUser", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof useCurrentUser>>;

  describe("when current user id is empty (not logged in)", () => {
    beforeEach(() => {
      const { renderResult } = renderHookWithStoreAndIntl({
        hook: useCurrentUser,
        initialState: {
          ...initialState,
          app: {
            ...initialState.app,
            currentUserId: null,
          },
        },
      });

      hookResult = renderResult;
    });

    it("should return null", () => {
      expect(hookResult.result.current).toBeNull();
    });
  });

  describe("when current user id is not empty (logged in)", () => {
    beforeEach(() => {
      const { renderResult } = renderHookWithStoreAndIntl({
        hook: useCurrentUser,
        initialState: {
          ...initialState,
          app: {
            ...initialState.app,
            currentUserId: RAW.GROUP_WITH_USER.user.id,
          },
          entities: {
            ...initialState.entities,
            ...NORMALIZED.MOIM.entities,
          },
        },
      });

      hookResult = renderResult;
    });

    it("should equal user name", () => {
      expect(hookResult.result.current?.name).toEqual(
        RAW.GROUP_WITH_USER.user.name,
      );
    });
  });
});
